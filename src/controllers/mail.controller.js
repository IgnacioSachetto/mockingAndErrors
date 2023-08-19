import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const mailController = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

export async function sendPurchaseConfirmationEmail(ticket) {
  try {
    const result = await mailController.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: 'nachosachetto1998@hotmail.com',
      subject: "Compra Realizada",
      html: `
        <div>
          <h1>Compra Realizada</h1>
          <p>¡Felicitaciones por tu compra!</p>
          <p>Ticket detalles:</p>
          <ul>
            <li>Código: ${ticket.code}</li>
            <li>Fecha y Hora de Compra: ${ticket.purchase_datetime}</li>
            <li>Comprador: ${ticket.purchaser}</li>
          </ul>
        </div>
      `,
    });

    console.log(result);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    console.log("Error sending email");
  }
}
