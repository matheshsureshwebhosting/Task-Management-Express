import express, { Application, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
const dotenv = require("dotenv").config()
const app: Application = express()
const port: number = 3001

import { mongooseconnection, mongoosedisconnect } from "./database/connection"

mongooseconnection()

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(morgan("dev"))


app.get("/", (req: Request, res: Response) => {
    res.send("okay")
})

import taskRouter from "./routers/task"
import projectRouter from "./routers/project"
import authRouter from "./routers/auth"
import mytask from "./routers/mytask"
import projectuserRouter from "./routers/projectuser"
import users from "./routers/users"

app.use('/task', taskRouter)
app.use('/project', projectRouter)
app.use("/auth", authRouter)
app.use("/mytask", mytask)
app.use('/projectuser', projectuserRouter)
app.use("/users",users)

app.listen(port, (): any => { console.log(`App Running on http://localhost:${port}`) })

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    mongoosedisconnect()
    process.exit(1);
});




