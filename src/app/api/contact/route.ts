import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, enquiryType, message, honeypot } = body;

    // Spam prevention
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message filtered' });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const staticFormsKey =
      process.env.STATICFORMS_API_KEY ||
      process.env.STATICFORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_STATICFORMS_KEY ||
      'sf_8d51b443f01ef2e140ba86a0';

    // 1. Send via StaticForms (https://api.staticforms.dev/submit)
    if (staticFormsKey) {
      try {
        const sfMessage = [
          phone ? `Phone / WhatsApp: ${phone}` : null,
          enquiryType ? `Type of Enquiry: ${enquiryType}` : null,
          '',
          'Message:',
          message,
        ]
          .filter((line) => line !== null)
          .join('\n');

        const sfRes = await fetch('https://api.staticforms.dev/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey: staticFormsKey,
            subject: `Smartflow group submission - [${(enquiryType || 'General').toUpperCase()}] from ${name}`,
            name,
            email,
            message: sfMessage,
          }),
        });

        const sfData = await sfRes.json();
        if (sfData.success) {
          return NextResponse.json({ success: true, provider: 'staticforms' });
        }
        console.warn('StaticForms error response, attempting Resend fallback:', sfData);
      } catch (sfErr) {
        console.warn('StaticForms fetch failed, falling back to Resend:', sfErr);
      }
    }

    // 2. Fallback / Primary Resend email integration
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const fromAddress = process.env.EMAIL_FROM || 'SMARTFLOW HUB <noreply@smartflowgroupltd.com>';
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@smartflowgroupltd.com';

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Enquiry - SMARTFLOW HUB</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #060d17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background: #0c1c2e; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; overflow: hidden;">
    <tr>
      <td style="background: linear-gradient(135deg, #091829 0%, #0f2444 100%); padding: 28px 24px; text-align: center; border-bottom: 3px solid #f5a623;">
        <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800;">
          SMARTFLOW <span style="color: #f5a623;">HUB</span>
        </h2>
        <p style="margin: 6px 0 0; color: rgba(255, 255, 255, 0.65); font-size: 13px;">
          New Website Contact Form Enquiry
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px 24px;">
        <h3 style="margin: 0 0 18px; color: #f5a623; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">
          Enquiry Details
        </h3>
        <table role="presentation" width="100%" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 6px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px; width: 130px;">Sender Name:</td>
            <td style="padding: 6px 0; color: #ffffff; font-weight: 700; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Email Address:</td>
            <td style="padding: 6px 0; color: #00e6c6; font-size: 14px;">
              <a href="mailto:${email}" style="color: #00e6c6; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Phone / WhatsApp:</td>
            <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Type of Enquiry:</td>
            <td style="padding: 6px 0; color: #f5a623; font-weight: 600; font-size: 14px; text-transform: capitalize;">${enquiryType || 'General'}</td>
          </tr>
        </table>

        <h3 style="margin: 0 0 10px; color: #ffffff; font-size: 15px;">Message:</h3>
        <div style="background: rgba(0, 0, 0, 0.35); border-left: 3px solid #00bfa5; padding: 16px; border-radius: 6px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re:%20Your%20SMARTFLOW%20HUB%20Enquiry" style="display: inline-block; background: #f5a623; color: #091829; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13px;">
            Reply to ${name} &rarr;
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background: #081320; padding: 16px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: rgba(255, 255, 255, 0.4);">
        &copy; ${new Date().getFullYear()} SMARTFLOW HUB &bull; NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    await resend.emails.send({
      from: fromAddress,
      to: [adminEmail],
      replyTo: email,
      subject: `[Contact Form] ${enquiryType ? `[${enquiryType.toUpperCase()}]` : ''} Message from ${name}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, provider: 'resend' });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
