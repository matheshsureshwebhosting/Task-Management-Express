import { Router } from "express"

const taskRouter: Router = Router()

import { addTask, allTask, getTask, updateTask,deleteTask,removeUser } from "../controllers/taskController"

taskRouter.post("/add", addTask)
taskRouter.get("/view", getTask)
taskRouter.get("/", allTask)
taskRouter.post("/update", updateTask)
taskRouter.get("/delete", deleteTask)
taskRouter.get("/removeuser", removeUser)

export default taskRouter