import express from "express";
import cors from "cors";
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";
import authRouter from "./routes/auth.js"
import petRouter from "./routes/pets.js";

export default function createServer() {
    const app = express();

    app.use(cors());

    app.use(express.json());

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);
    
    app.use("/pets", petRouter(passport));

    return app;
}