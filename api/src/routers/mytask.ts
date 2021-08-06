import { Router } from "express"
const mytaskRouter: Router = Router()

import { myTask,updateStatus,myTaskfilter } from '../controllers/mytaskController'

mytaskRouter.get("/", myTask)
mytaskRouter.get("/filter", myTaskfilter)
mytaskRouter.post("/statusupdate", updateStatus)


export default mytaskRouter