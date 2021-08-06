import { Router } from "express"

const projectuserRouter: Router = Router()

import { addProjectuser,updateProjectuser,allProjectuser,getProjectuser } from "../controllers/projectuserController"

projectuserRouter.post("/add", addProjectuser)
projectuserRouter.get("/view/:id", getProjectuser)
projectuserRouter.get("/",allProjectuser )
projectuserRouter.post("/update", updateProjectuser)

export default projectuserRouter