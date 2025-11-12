// models/Usuario.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoInstitucional: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },          // 🟣 Para guardar el token de confirmación
  confirmEmail: { type: Boolean, default: false }, // 🟢 Para saber si confirmó el correo
}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
