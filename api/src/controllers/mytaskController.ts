import { Request, Response } from "express"
import createErrors from "http-errors"
import getToken from "../helpers/gettoken"
import { verifyToken } from "../helpers/jwt"

import { myTasks, updateTasks,myTasksFilter } from "../modules/mytask.modules"

export const myTask = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]    
    const admin:any=req.headers["admin"]
    const projectid:any=req.headers["projectid"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const mytask: any = await myTasks(projectid,veryfytoken,admin)
        if (mytask.length == 0) throw createErrors(400, "No Task")
        return res.send(mytask)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}

export const updateStatus = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const taskid: any = req.headers["taskid"]
    const admin: any = req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    const { status } = req.body
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const updatestatus = await updateTasks(veryfytoken, taskid, status,admin)
        return res.send(updatestatus)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}

export const myTaskfilter  = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const projectid:any=req.headers["projectid"]
    const admin:any=req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const mytask: any = await myTasksFilter(projectid,veryfytoken,admin)
        if (mytask.length == 0) throw createErrors(400, "No Task")
        return res.send(mytask)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}