import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function getEmailCredentials() {
  let user = process.env.GMAIL_USER || process.env.EMAIL_USER || process.env.SMTP_USER;
  let pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASS;

  // Fallback: Read directly from .env.local file if Next.js runtime hasn't loaded it yet
  if (!user || !pass) {
    try {
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
          const idx = trimmed.indexOf('=');
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');

          if (key === 'GMAIL_USER' && !user) user = val;
          if (key === 'GMAIL_APP_PASSWORD' && !pass) pass = val;
        }
      }
    } catch (e) {
      console.warn('[ContactAPI] Could not read env fallback file:', e.message);
    }
  }

  return {
    user: user ? user.trim() : null,
    pass: pass ? pass.trim().replace(/\s+/g, '') : null,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    // Validate inputs
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide a valid name (at least 2 characters).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Please enter a message of at least 10 characters.' }, { status: 400 });
    }

    const submissionDate = new Date().toISOString();
    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 120);
    const cleanSubject = (subject || 'general').slice(0, 100);
    const cleanMessage = message.trim().slice(0, 5000);
    const submissionId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    let savedToFirestore = false;
    let emailSent = false;

    // 1. Save to Firestore if available
    try {
      const { adminDb } = await import('@/lib/firebaseAdmin');
      if (adminDb) {
        await adminDb.collection('contact_messages').doc(submissionId).set({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          status: 'unread',
          createdAt: submissionDate,
          userAgent: request.headers.get('user-agent') || 'unknown',
          ip: request.headers.get('x-forwarded-for') || 'unknown',
        });
        savedToFirestore = true;
      }
    } catch (dbErr) {
      console.warn('[ContactAPI] Firestore persist failed or skipped:', dbErr.message);
    }

    // 2. Send notification email via Nodemailer if SMTP configured
    const { user: gmailUser, pass: gmailPass } = getEmailCredentials();
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const mailOptions = {
          from: `"LostStreet Contact Desk" <${gmailUser}>`,
          to: gmailUser,
          replyTo: cleanEmail,
          subject: `[LostStreet Support: ${cleanSubject.toUpperCase()}] From ${cleanName}`,
          text: `New Contact Submission on LostStreet\n\nReference ID: ${submissionId}\nDate: ${submissionDate}\nFrom: ${cleanName} <${cleanEmail}>\nTopic: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
              <h2 style="color: #059669; margin-top: 0;">New LostStreet Contact Message</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; font-weight: bold; width: 120px;">From:</td><td>${cleanName} (&lt;${cleanEmail}&gt;)</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Topic:</td><td>${cleanSubject}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Date:</td><td>${submissionDate}</td></tr>
                <tr><td style="padding: 6px 0; font-weight: bold;">Reference:</td><td><code>${submissionId}</code></td></tr>
              </table>
              <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; white-space: pre-wrap;">${cleanMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">You can reply directly to this email to reach ${cleanName}.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (mailErr) {
        console.warn('[ContactAPI] Email delivery warning:', mailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received! Our support and editorial desk will review your inquiry.',
      referenceId: submissionId,
      persisted: savedToFirestore || emailSent,
    });
  } catch (err) {
    console.error('[ContactAPI] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing your message. Please contact us directly at support@loststreet.online.' },
      { status: 500 }
    );
  }
}
