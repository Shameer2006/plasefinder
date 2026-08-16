/**
 * Branded Responsive HTML & Plain Text Welcome Email Template for LostStreet
 * Optimized for high inbox deliverability (avoiding spam filters)
 */

export function getWelcomeEmailText({ displayName = 'Explorer', email = '' }) {
  const name = displayName && displayName !== 'Explorer' ? displayName : 'Explorer';
  const siteUrl = 'https://www.loststreet.online';

  return `
Welcome to LostStreet, ${name}!

Thank you for creating an account on LostStreet — the 100% free geography guessing game with over 780,000+ Google Street View locations worldwide.

What you can do in LostStreet:
- Explore Singleplayer: Guess locations from Easy multiple choice to Hard pin-point drop.
- 1v1 Multiplayer Duels: Compete in real-time ranked matches and climb global ELO ranks.
- Private Party Rooms: Create private lobbies with 6-digit room codes to challenge friends.
- Daily Challenge & Flag Guesser: Test your geography skills every day and build streaks.

Pro Tips for Beginners:
1. Sun Position: Sun in the South = Northern Hemisphere. Sun in the North = Southern Hemisphere.
2. Driving Side: Notice which side cars drive on (Left vs Right).
3. Bollards & Signs: Unique road markers and languages are key country clues.

Play now: ${siteUrl}

---
© ${new Date().getFullYear()} LostStreet. All rights reserved.
Guides: ${siteUrl}/guides | Leaderboard: ${siteUrl}/leaderboard
You received this transactional email because you registered or signed in to LostStreet at loststreet.online.
  `.trim();
}

export function getWelcomeEmailHtml({ displayName = 'Explorer', email = '' }) {
  const name = displayName && displayName !== 'Explorer' ? displayName : 'Explorer';
  const siteUrl = 'https://www.loststreet.online';

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to LostStreet</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; color: #e5e7eb;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0f19; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background: #0f172a; padding: 32px 24px; border-bottom: 1px solid #1e293b;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-size: 28px; line-height: 1;">🌍</td>
                </tr>
                <tr>
                  <td align="center" style="color: #ffffff; font-size: 24px; font-weight: 800; padding-top: 10px; letter-spacing: -0.5px;">
                    LostStreet
                  </td>
                </tr>
                <tr>
                  <td align="center" style="color: #38bdf8; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding-top: 4px;">
                    Free Street View Guesser
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 24px; font-size: 15px; line-height: 1.6; color: #d1d5db;">
              <div style="font-size: 19px; font-weight: 800; color: #ffffff; margin-bottom: 12px;">
                Welcome to the adventure, ${name}!
              </div>
              <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 14px;">
                Thank you for joining <strong style="color: #ffffff;">LostStreet</strong> — the 100% free geography guessing game with over <strong style="color: #ffffff;">780,000+</strong> Google Street View panoramas across the globe.
              </p>

              <!-- Feature Highlights Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0d1424; border: 1px solid #1e293b; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 16px;">
                    <div style="font-weight: 800; color: #fef08a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                      What you can play right now:
                    </div>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="width: 28px; vertical-align: top; padding-bottom: 8px; font-size: 16px;">📍</td>
                        <td style="padding-bottom: 8px; font-size: 13px;">
                          <strong style="color: #ffffff;">Singleplayer:</strong> Guess places from Easy choices to Hard pin-point drop.
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 28px; vertical-align: top; padding-bottom: 8px; font-size: 16px;">⚔️</td>
                        <td style="padding-bottom: 8px; font-size: 13px;">
                          <strong style="color: #ffffff;">1v1 Duels:</strong> Compete in real-time ranked multiplayer matches.
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 28px; vertical-align: top; padding-bottom: 8px; font-size: 16px;">👥</td>
                        <td style="padding-bottom: 8px; font-size: 13px;">
                          <strong style="color: #ffffff;">Party Rooms:</strong> Create private lobbies with room codes for friends.
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 28px; vertical-align: top; font-size: 16px;">📅</td>
                        <td style="font-size: 13px;">
                          <strong style="color: #ffffff;">Daily Challenge:</strong> Test daily knowledge and build streaks.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pro Tips -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b1c33; border: 1px solid #1d4ed8; border-radius: 10px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 16px;">
                    <div style="font-weight: 800; font-size: 12px; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                      Pro Clues for Beginners:
                    </div>
                    <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                      • <strong>Sun Position:</strong> Sun in South = Northern Hemisphere. Sun in North = Southern Hemisphere.<br />
                      • <strong>Driving Side:</strong> Notice if traffic drives on Left or Right.<br />
                      • <strong>Road Bollards:</strong> Distinct post markings reveal specific countries instantly.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 10px 0 20px 0;">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}" target="_blank" style="background-color: #10b981; color: #ffffff; display: inline-block; font-size: 15px; font-weight: 800; padding: 14px 32px; text-decoration: none; border-radius: 10px; letter-spacing: 0.3px;">
                      Play LostStreet Now →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0e17; padding: 20px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937;">
              <p style="margin: 0 0 6px 0;">
                © ${new Date().getFullYear()} LostStreet. All rights reserved.
              </p>
              <p style="margin: 0 0 10px 0;">
                <a href="${siteUrl}/guides" style="color: #9ca3af; text-decoration: underline; margin: 0 6px;">How to Play</a> |
                <a href="${siteUrl}/leaderboard" style="color: #9ca3af; text-decoration: underline; margin: 0 6px;">Leaderboard</a> |
                <a href="${siteUrl}/community" style="color: #9ca3af; text-decoration: underline; margin: 0 6px;">Community</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #4b5563;">
                You received this transactional email because you signed in to LostStreet (loststreet.online). If you did not sign in, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
