import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getWelcomeEmailHtml, getWelcomeEmailText } from '@/lib/emails/welcomeEmailTemplate';

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
      console.warn('[WelcomeEmail] Could not read env fallback file:', e.message);
    }
  }

  return {
    user: user ? user.trim() : null,
    pass: pass ? pass.trim().replace(/\s+/g, '') : null, // Remove all spaces from app password
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, displayName } = body || {};

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Valid recipient email is required.' }, { status: 400 });
    }

    const { user: gmailUser, pass: gmailPass } = getEmailCredentials();

    if (!gmailUser || !gmailPass) {
      console.warn('[WelcomeEmail] Credentials missing. Checked env & .env.local. GMAIL_USER found:', !!gmailUser, 'GMAIL_APP_PASSWORD found:', !!gmailPass);
      return NextResponse.json({ 
        success: false, 
        message: 'Gmail credentials not configured on server. Please verify GMAIL_USER and GMAIL_APP_PASSWORD.' 
      }, { status: 500 });
    }

    // Initialize Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const cleanName = displayName && displayName !== 'Explorer' ? displayName : 'Explorer';
    const textContent = getWelcomeEmailText({ displayName: cleanName, email });
    const htmlContent = getWelcomeEmailHtml({ displayName: cleanName, email });

    const mailOptions = {
      from: `"LostStreet" <${gmailUser}>`,
      to: email.trim(),
      replyTo: `"LostStreet Support" <${gmailUser}>`,
      subject: `Welcome to LostStreet, ${cleanName}`,
      text: textContent, // Critical: MIME plain text alternative prevents spam filtering
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<mailto:${gmailUser}?subject=Unsubscribe>`,
        'X-Entity-Ref-ID': `welcome-${Date.now()}`,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[WelcomeEmail] Successfully sent welcome email to: ${email} (MessageId: ${info.messageId})`);

    return NextResponse.json({ 
      success: true, 
      message: 'Welcome email sent successfully!',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('[WelcomeEmail] Error sending welcome email:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Failed to send welcome email.' 
    }, { status: 500 });
  }
}
