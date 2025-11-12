// src/config/nodemailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});

// 👉 Función genérica para enviar correos
const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Vibe-U 🎓" <noreply@vibeu.com>',
            to,
            subject,
            html
        });
        console.log("✅ Email enviado:", info.messageId);
    } catch (error) {
        console.error("❌ Error enviando email:", error.message);
    }
};

// 🟣 CORREO DE CONFIRMACIÓN (URL corregida)
export const sendMailToRegister = async (userMail, token) => {
    const urlConfirm = `${process.env.URL_BACKEND}/api/usuarios/confirmar/${token}`; // ⚠️ usar la ruta de backend
    const html = `
        <h1>Bienvenido a Vibe-U 🎓</h1>
        <p>Gracias por registrarte. Confirma tu correo haciendo clic en el siguiente enlace:</p>
        <a href="${urlConfirm}" style="display:inline-block;background:#7c3aed;color:white;padding:10px 20px;
           text-decoration:none;border-radius:8px;font-weight:bold;">
           Confirmar correo
        </a>
        <hr>
        <footer>El equipo de Vibe-U 🎓</footer>
    `;
    await sendMail(userMail, "Confirma tu cuenta en VIBE-U 💜", html);
};

// 🟣 CORREO PARA RECUPERAR CONTRASEÑA
export const sendMailToRecoveryPassword = async (userMail, token) => {
    const urlRecovery = `${process.env.URL_FRONTEND}/recuperarpassword/${token}`;
    const html = `
        <h1>Vibe-U 💜</h1>
        <p>Has solicitado restablecer tu contraseña.</p>
        <a href="${urlRecovery}" style="display:inline-block;background:#7c3aed;color:white;padding:10px 20px;
           text-decoration:none;border-radius:8px;font-weight:bold;">
           Restablecer contraseña
        </a>
        <hr>
        <footer>El equipo de Vibe-U 💜</footer>
    `;
    await sendMail(userMail, "Recupera tu contraseña en Vibe-U 🎓", html);
};

export default sendMail;
