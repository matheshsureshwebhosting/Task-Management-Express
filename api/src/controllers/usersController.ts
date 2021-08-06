import { Request, Response } from "express"
import createErrors from "http-errors"
import Users from "../models/user"

import getToken from "../helpers/gettoken"
import { verifyToken } from "../helpers/jwt"

export const allusers = async (req: Request, res: Response) => {
    const admin: any = req.headers["admin"]
    try {
        if (admin == "true") {
            const allusers = await Users.find({}).then((res: any) => {
                return res
            }).catch((error: any) => {
                return false
            })
            return res.send(allusers)
        }else{
            throw createErrors(401, "Not a valid User")
        }

    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}

export const singleuser = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const admin: any = req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const singleuser = await Users.findOne({ "clientid": veryfytoken }).then((res: any) => {
            return res
        }).catch((error: any) => {
            return false
        })
        return res.send(singleuser)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}
export const singleuserid = async (req: Request, res: Response) => {
    const clientid: any = req.headers["clientid"]
    const admin: any = req.headers["admin"]

    try {
        if (!clientid) throw createErrors(401, "clientid missing")
        const singleuser = await Users.findOne({ "clientid": clientid }).then((res: any) => {
            return res
        }).catch((error: any) => {
            return false
        })
        return res.send(singleuser)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}