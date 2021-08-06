import { Request, Response } from 'express';
import Task from '../models/task';
import { randomid } from "../helpers/uuid"
import { Day } from "../helpers/dates"
import createErrors from "http-errors"
import getToken from "../helpers/gettoken"
import { verifyToken } from "../helpers/jwt"

import Projects from "../models/project"

export const addTask = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const mytoken: any = await getToken(authorization)
    try {
        const taskid = randomid();
        const today = await Day();
        const { projectid } = req.headers
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const task = new Task(req.body);
        task["projectid"] = projectid
        // task["clientid"] = veryfytoken
        task["clientid"] = []
        task["taskid"] = taskid
        task["date"] = today
        task["status"] = "Bending"
        task.save().then(async () => {
            const projectupdate = await Projects.updateMany({ "Projectid": projectid }, { $push: { clientid: veryfytoken } }).then((res: any) => {
                if (res.nModified != 0) {
                    return true
                } else {
                    return false
                }
            }).catch((err: any) => {
                return false
            })
            if (projectupdate) {
                return res.send(task)
            } else {
                return res.send(false)
            }

        }).catch((err: any) => {
            res.send(err.message)
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }

}

export const allTask = (req: Request, res: Response): void => {
    Task.find({}).then((result: any) => {
        return res.send(result)
    }).catch((error: any) => {
        return res.send(false)
    })
}

export const getTask = (req: Request, res: Response): void => {
    const { taskid } = req.headers
    Task.findOne({ "taskid": taskid }).then((result: any) => {
        return res.send(result)
    }).catch((error: any) => {
        return res.send(false)
    })
}

export const updateTask = (req: Request, res: Response): void => {
    const { taskid } = req.headers
    Task.updateMany({ "taskid": taskid }, { $push: req.body }).then((result: any) => {
        return res.send(result)
    }).catch((err: any) => {
        res.send(err.message)
    })
}


export const deleteTask = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const taskid: any = req.headers["taskid"]
    const admin: any = req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        if (admin == "true") {
            Task.deleteOne({ "taskid": taskid }).then((res: any) => {
                if (res.n !== 0) {
                    return res.send(true)
                } else {
                    return res.send(false)
                }

            }).catch((err: any) => {
                return res.send(false)
            })
        } else {
            throw createErrors(401, "Not valid user")
        }
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}


export const removeUser = async (req: Request, res: Response) => {
    const clientid: any = req.headers["clientid"]    
    const authorization: any = req.headers["authorization"]
    const taskid: any = req.headers["taskid"]
    const admin: any = req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid") 
        if(admin=="true"){
            const removeuser = await Task.updateOne({ "taskid": taskid }, { $pull: { "clientid": clientid } }).then((res: any) => {
                if (res.nModified !== 0) {
                    return true
                } else {
                    return false
                }
            }).catch((err: any) => {
                return res.send(false)
            })
            return res.send(removeuser)
        }else{
            throw createErrors(401, "Not a valid a User")
        }
        
      
    } catch (error) {
        return res.status(error.status).send(error.message)
    }
}