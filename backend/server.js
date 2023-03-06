import express from "express";
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";
import authRouter from "./routes/auth.js"
import petRouter from "./routes/pets.js";
import cors from 'cors'


export default function createServer() {
    // const express = require('express')
    const app = express();
    // const cors = require('cors');
    // app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
    app.use(cors())
    
    app.use(express.json());

    setupJWTStrategy(passport);

    app.use("/auth", authRouter);
    
    app.use("/pets", petRouter(passport));

   

    return app;
}