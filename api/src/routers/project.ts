import { Router } from "express"

const projectRouter: Router = Router()

import { allProject, createProject, deleteProject, getProject, updateProject,checkadmin,projectfilter } from "../controllers/projectController"

projectRouter.post("/add", createProject)
projectRouter.get("/view", getProject)
projectRouter.get("/", allProject)
projectRouter.get("/delete", deleteProject)
projectRouter.post("/update", updateProject)
projectRouter.get("/admin", checkadmin)
projectRouter.get("/filter", projectfilter)



export default projectRouter