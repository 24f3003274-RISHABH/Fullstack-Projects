import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'

const app =express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/',(req,res)=>res.send("Server is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
// #server will run on port 5000 or the port specified in the environment variables.
// to store our data we will use neon database which is a serverless postgres database. we will connect to it using the connection string provided by neon in our .env file. we will use prisma as our ORM to interact with the database.