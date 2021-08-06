import { Request, Response } from 'express';
import Projectuser from '../models/projectuser';
import { Day } from "../helpers/dates"

export const addProjectuser = async (req: Request, res: Response): Promise<void> => {
    const today = await Day();
    console.log(today)
    const { projectid } = req.headers
    const projectuser = new Projectuser(req.body);
    projectuser["projectid"] = projectid
    projectuser["date"] = today
    projectuser.save().then(() => {
        res.send(projectuser)
    }).catch((err: any) => {
        res.send(err.message)
    })
}

export const allProjectuser = (req: Request, res: Response): void => {
    const projectuser = Projectuser.find((err: any, task: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send(task)
        }
    })
}

export const getProjectuser = (req: Request, res: Response): void => {
    Projectuser.findById(req.params.id, (err: any, task: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send(task)
        }
    })
}

export const updateProjectuser = (req: Request, res: Response): void => {
    const { projectid } = req.headers
    console.log(req.body)
    Projectuser.updateMany({ projectid: projectid }, { $push: req.body }).then((result: any) => {
        return res.send(result)
    }).catch((err: any) => {
        res.send(err.message)
    })
}

