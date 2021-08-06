import { Router } from "express"
const usersRouter: Router = Router()

import { allusers,singleuser,singleuserid } from '../controllers//usersController'

usersRouter.get("/", allusers)
usersRouter.get("/single", singleuser)
usersRouter.get("/singleid", singleuserid)

export default usersRouter