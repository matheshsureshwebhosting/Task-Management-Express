
import { Request, Response } from "express"
import { checkUser, createUsers } from "../modules/auth.modules"

import createErrors from "http-errors"

import { createToken } from "../helpers/jwt"
import { verifyPwd, createrHashpwd } from "../helpers/bcrypt"

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body    
    try {
        const checkuser: any = await checkUser(email)
        if (checkuser.length != 0) throw createErrors(401, "Already Registerd")
        const pwdHash = await createrHashpwd(password)
        const userinfo = await req.body
        userinfo["password"] = pwdHash
        const clientid = Date.now().toString()
        const createtoken = await createToken(clientid)
        if (createtoken == false) throw createErrors(400, "Token Doesn't create try again")
        userinfo["clientid"] = clientid
        userinfo["token"] = createtoken
        const createuser:any = await createUsers(userinfo)
        return res.cookie("_uid",createuser.token).send(createuser)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const checkuser: any = await checkUser(email)
        if (checkuser.length == 0) throw createErrors(401,"You Not Registerd")
        const hashPwd: string = checkuser[0].password
        const token: string = checkuser[0].token
        const verifyHash: boolean | undefined = await verifyPwd(password, hashPwd)
        if (!verifyHash) throw createErrors(401, "Please Check Password")
        return res.cookie("_uid",token).json({ token: token })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}