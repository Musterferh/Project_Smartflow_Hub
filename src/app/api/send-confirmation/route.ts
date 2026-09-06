import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      studentName,
      studentEmail,
      studentPhone,
      courseTitle,
      courseDuration,
      amountPaid,
      registrationId,
      paymentReference,
    } = body;

    if (!studentEmail || !studentName || !courseTitle) {
      return NextResponse.json(
        { error: 'Missing required student or course details.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ RESEND_API_KEY is not configured in environment. Skipping email dispatch.');
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Payment recorded. Resend API key is pending configuration.',
      });
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.EMAIL_FROM || 'SMARTFLOW HUB <noreply@smartflowgroupltd.com>';
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@smartflowgroupltd.com';
    const supportEmail = 'info@smartflowgroupltd.com';
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // 1. Redesigned Premium Confirmation Email to Student
    const studentEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful &amp; Admission Confirmed — SMARTFLOW HUB</title>
</head>
<body style="margin: 0; padding: 0; background-color: #06111e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #06111e; padding: 40px 12px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background: #0c1c2e; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.12); overflow: hidden; box-shadow: 0 18px 40px rgba(0,0,0,0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #091829 0%, #0f2444 60%, #15325b 100%); padding: 36px 32px 30px; text-align: center; border-bottom: 3px solid #f5a623;">
              <div style="margin-bottom: 16px;">
                <img src="https://raw.githubusercontent.com/Musterferh/Project_Smartflow_Hub/main/public/logo.png" alt="SMARTFLOW HUB Logo" width="54" height="54" style="display: inline-block; background-color: #ffffff; padding: 6px; border-radius: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.3); vertical-align: middle;">
              </div>
              <div style="display: inline-block; padding: 6px 16px; border-radius: 100px; background: rgba(0, 191, 165, 0.15); border: 1px solid rgba(0, 191, 165, 0.4); color: #00e6c6; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">
                &#10003; PAYMENT CONFIRMED &bull; ADMISSION SUCCESSFUL
              </div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px;">
                <span style="color: #ffffff;">SMARTFLOW</span> <span style="color: #f5a623;">HUB</span>
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.65); letter-spacing: 0.5px;">
                Official Course Registration &amp; Payment Receipt
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 10px; font-size: 21px; font-weight: 800; color: #ffffff;">
                Congratulations, <span style="color: #f5a623;">${studentName}</span>! 🎉
              </h2>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.65; color: rgba(255, 255, 255, 0.8);">
                We have received your payment. You are officially registered in <strong style="color: #ffffff;">${courseTitle}</strong>. Welcome to our tech learning community!
              </p>

              <!-- Registration ID Hero Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(245, 166, 35, 0.12) 0%, rgba(15, 36, 68, 0.8) 100%); border: 1px solid rgba(245, 166, 35, 0.35); border-radius: 14px; margin-bottom: 26px;">
                <tr>
                  <td style="padding: 18px; text-align: center;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #f5a623; font-weight: 800; margin-bottom: 6px;">
                      Official Student Registration ID
                    </div>
                    <div style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 2px; font-family: monospace;">
                      ${registrationId}
                    </div>
                    <div style="font-size: 12px; color: rgba(255, 255, 255, 0.5); margin-top: 4px;">
                      Keep this ID safe for student orientation and portal sign-in
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Student Profile Card -->
              <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #f5a623; font-weight: 800;">
                Student Information
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 26px;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6); width: 35%;">Full Name</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 700; color: #ffffff;">${studentName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6);">Phone Number</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 600; color: #00e6c6;">${studentPhone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: rgba(255, 255, 255, 0.6);">Email Address</td>
                  <td align="right" style="padding: 12px 18px; font-size: 14px; font-weight: 600; color: #ffffff;">${studentEmail}</td>
                </tr>
              </table>

              <!-- Payment Summary Table -->
              <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #f5a623; font-weight: 800;">
                Payment Summary
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 26px;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6);">Enrolled Course</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 700; color: #ffffff;">${courseTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6);">Program Duration</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; font-weight: 600; color: #ffffff;">${courseDuration || 'Full Track'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6);">Amount Paid</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 16px; font-weight: 900; color: #f5a623;">${amountPaid}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: rgba(255, 255, 255, 0.6);">Date Paid</td>
                  <td align="right" style="padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 13px; color: rgba(255, 255, 255, 0.85);">${currentDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 14px; color: rgba(255, 255, 255, 0.6);">Paystack Reference</td>
                  <td align="right" style="padding: 12px 18px; font-size: 13px; font-family: monospace; color: #00e6c6;">${paymentReference || 'N/A'}</td>
                </tr>
              </table>

              <!-- VISIT OUR OFFICE HIGHLIGHT CARD -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, rgba(0, 191, 165, 0.10) 0%, rgba(9, 24, 41, 0.95) 100%); border: 1.5px solid rgba(0, 191, 165, 0.4); border-radius: 16px; margin-bottom: 28px; box-shadow: 0 8px 24px rgba(0, 191, 165, 0.15);">
                <tr>
                  <td style="padding: 24px 22px;">
                    <div style="font-size: 16px; font-weight: 800; color: #00e6c6; margin-bottom: 12px;">
                      📍 Visit Our Physical Office &amp; Tech Hub
                    </div>
                    <p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
                      You are warmly welcome to visit our tech hub for in-person orientation, course setup, or to use our dedicated study spaces!
                    </p>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: rgba(255, 255, 255, 0.9); line-height: 1.7;">
                      <tr>
                        <td style="padding: 4px 0; font-weight: 700; color: #f5a623; width: 28px;">🏢</td>
                        <td style="padding: 4px 0;"><strong>Office Address:</strong><br>NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi, Bauchi State, Nigeria</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-weight: 700; color: #f5a623;">🕒</td>
                        <td style="padding: 4px 0;"><strong>Working Hours:</strong> Monday &ndash; Friday: 9:00 AM &ndash; 5:00 PM</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-weight: 700; color: #f5a623;">📞</td>
                        <td style="padding: 4px 0;"><strong>Direct Helpline:</strong> +234 815 418 4722</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps Instructions -->
              <h3 style="margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255, 255, 255, 0.6); font-weight: 700;">
                What Happens Next?
              </h3>
              <ol style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.8);">
                <li>Our academic coordinator will reach out to you via WhatsApp or phone within <strong>24 hours</strong>.</li>
                <li>You will receive your student schedule, curriculum syllabus, and learning portal credentials.</li>
                <li>If you prefer in-person assistance, feel free to walk into our Bauchi office anytime during working hours!</li>
              </ol>

              <!-- WhatsApp Action Button -->
              <div style="text-align: center; margin: 28px 0 12px;">
                <a href="https://wa.me/2348154184722?text=Hello%20SMARTFLOW%20HUB,%20I%20have%20completed%20my%20payment%20for%20${encodeURIComponent(courseTitle)}.%20My%20Registration%20ID%20is:%20${encodeURIComponent(registrationId)}"
                   style="display: inline-block; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-size: 14px; font-weight: 800; box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4); letter-spacing: 0.3px;">
                  💬 Chat on WhatsApp with Your Registration ID &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #081320; padding: 26px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; color: rgba(255, 255, 255, 0.45); line-height: 1.6;">
              <p style="margin: 0 0 6px; font-weight: 600; color: rgba(255, 255, 255, 0.7);">
                &copy; ${new Date().getFullYear()} SMARTFLOW HUB &bull; A Division of Smartflow Group Ltd.
              </p>
              <p style="margin: 0 0 4px;">
                NO.B5 HD Plaza, Ahmadu Bello Way, Bauchi, Bauchi State, Nigeria
              </p>
              <p style="margin: 0;">
                Portal: <a href="https://techhub.smartflowgroupltd.com" style="color: #f5a623; text-decoration: none; font-weight: 600;">techhub.smartflowgroupltd.com</a> &bull; Email: <a href="mailto:info@smartflowgroupltd.com" style="color: #f5a623; text-decoration: none;">info@smartflowgroupltd.com</a> &bull; Phone: +234 815 418 4722
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const studentResult = await resend.emails.send({
      from: fromAddress,
      to: [studentEmail],
      replyTo: supportEmail,
      subject: `Registration Confirmed: ${courseTitle} — SMARTFLOW HUB`,
      html: studentEmailHtml,
    });

    // 2. Notification to Admin
    if (adminEmail) {
      const adminEmailHtml = `
        <div style="font-family: -apple-system, sans-serif; padding: 24px; color: #1a202c; max-width: 600px;">
          <h2 style="color: #0f2444; margin-top: 0;">🎉 New Student Enrollment Received!</h2>
          <p style="font-size: 15px; line-height: 1.5;">A student has completed registration and payment:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; width: 40%;">Student Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${studentName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Phone Number:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;"><a href="tel:${studentPhone}">${studentPhone || 'N/A'}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Email Address:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;"><a href="mailto:${studentEmail}">${studentEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Course Enrolled:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #0f2444;">${courseTitle}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Amount Paid:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; color: #d97706; font-weight: bold;">${amountPaid}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-weight: bold;">Registration ID:</td><td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; font-family: monospace;">${registrationId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Paystack Ref:</td><td style="padding: 8px 0; font-family: monospace;">${paymentReference}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 13px; color: #718096;">Date: ${currentDate}</p>
        </div>
      `;

      try {
        await resend.emails.send({
          from: fromAddress,
          to: [adminEmail],
          replyTo: studentEmail,
          subject: `[New Student] ${studentName} paid for ${courseTitle}`,
          html: adminEmailHtml,
        });
      } catch (adminErr) {
        console.warn('Admin notification email skipped:', adminErr);
      }
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      id: studentResult?.data?.id,
    });
  } catch (error: any) {
    console.error('Error dispatching confirmation email:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send confirmation email',
      },
      { status: 500 }
    );
  }
}
