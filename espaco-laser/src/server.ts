import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectToDatabase from "./database";
import "reflect-metadata";
import 'express-async-errors';
import {campaing} from './router/campaing.router'
import { store } from "./router/store.router";


const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json())
app.use('/campaing',campaing);
app.use('/store',store);
//app.use("/users", users)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof Error) {
      return response.status(400).json({ error: err.message })
  }

  return response.status(500).json({ status: "error", message: "Internal Server Error" })

})


app.listen(2003, () => {
  console.log("Serer is run in port: 2003")
})

