import { Router } from "express"
const authRouter: Router = Router()

import { register,login } from '../controllers/authController'

authRouter.post("/register", register)
authRouter.post("/login", login)

export default authRouter