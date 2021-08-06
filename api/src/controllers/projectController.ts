import { Request, Response } from 'express';
import Project from '../models/project';
import { Day } from "../helpers/dates"
import { randomid } from "../helpers/uuid"
import createErrors from "http-errors"
import getToken from "../helpers/gettoken"
import { verifyToken } from "../helpers/jwt"

import { myTasks,projectfilters } from "../modules/project.modules"

export const createProject = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const mytoken: any = await getToken(authorization)    
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const Projectid = randomid();
        const today = await Day();
        const project = new Project(req.body);
        project["date"] = today
        project["Projectid"] = Projectid
        project["Projectcreatorid"] = veryfytoken
        project.save().then(() => {
            res.send(project)
        }).catch((err: any) => {
            res.send(err.message)
        })
    } catch (error) {
        return res.status(error.status).send(error.message)
    }

}

export const allProject = (req: Request, res: Response): void => {
    Project.find({}).then((result: any) => {
        return res.send(result)
    }).catch((error: any) => {
        return res.send(false)
    })
}

export const getProject = (req: Request, res: Response): void => {
    const { projectid } = req.headers
    Project.findOne({ "Projectid": projectid }).then((result: any) => {
        return res.send(result)
    }).catch((error: any) => {
        return res.send(false)
    })
}

export const deleteProject = (req: Request, res: Response): void => {
    const { projectid } = req.headers
    Project.deleteOne({ "Projectid": projectid }).then((result: any) => {
        return res.send(result)
    }).catch((error: any) => {
        return res.send(false)
    })
}


export const updateProject = (req: Request, res: Response): void => {
    const { projectid } = req.headers
    Project.updateOne({ "projectid": projectid }, { $push: req.body }).then((result: any) => {
        return res.send(result)
    }).catch((err: any) => {
        res.send(err.message)
    })
}

export const checkadmin = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]    
    const mytoken: any = await getToken(authorization)

    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const mytask: any = await myTasks(veryfytoken)
        if (mytask.length == 0) return res.send(false)
        return res.send(mytask)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }

}

export const projectfilter  = async (req: Request, res: Response) => {
    const authorization: any = req.headers["authorization"]
    const admin: any = req.headers["admin"]
    const mytoken: any = await getToken(authorization)
    try {
        if (mytoken == false) throw createErrors(401, "Token Missing")
        const veryfytoken: any = await verifyToken(mytoken)
        if (!veryfytoken) throw createErrors(400, "Token Invalid")
        const mytask: any = await projectfilters(admin,veryfytoken)
        if (mytask.length == 0) return res.send(false)
        return res.send(mytask)
    } catch (error) {
        return res.status(error.status).send(error.message)
    }

}








