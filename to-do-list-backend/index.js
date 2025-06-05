import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(cors({
   origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
}))

const mongoUri = process.env.MONGO_URI;

export async function connectDB(){
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1); // Cierra la app si falla la conexión
  }
};

connectDB()

app.use(express.json());

app.listen(3001, () => {
  console.log("🚀 Servidor backend en http://localhost:3001");
});
