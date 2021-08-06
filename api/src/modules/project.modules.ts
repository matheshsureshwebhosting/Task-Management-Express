import Project from "../models/project"

export const myTasks = async (clientid: string) => {
    const myTasks = new Promise(async (resolve, reject) => {
        const alltask = await Project.find({}).then((result: any) => {
            return result
        }).catch((error: any) => {
            return false
        })
        const filterdtask = await filtermyTask(clientid, alltask)
        return resolve(filterdtask)
    })
    return await myTasks
}

const filtermyTask = async (clientID: string, allTask: any) => {
    const filtermyTask = new Promise(async (resolve, reject) => {
        const mytask: any[] = []
        for (var i = 0; i < allTask.length; i++) {
            for (var j = 0; j < allTask[i].Projectcreatorid.length; j++) {
                if (allTask[i].Projectcreatorid[j] === clientID) {
                    mytask.push(allTask[i])
                }
            }
        }
        return resolve(mytask)
    })
    return await filtermyTask
}

export const projectfilters = async (status: any, clientid: string) => {
    const myTasks = new Promise(async (resolve, reject) => {
        const alltask = await Project.find({}).then((result: any) => {
            return result
        }).catch((error: any) => {
            return false
        })
        const filterdtask = await filtermyProject(status, clientid, alltask)
        return resolve(filterdtask)
    })
    return await myTasks
}

const filtermyProject = async (status: any, clientID: string, allTask: any) => {
    const filtermyTask = new Promise(async (resolve, reject) => {
        const mytask: any[] = []
        for (var i = 0; i < allTask.length; i++) {
            if (status == "false") {
                for (var j = 0; j < allTask[i].Projectcreatorid.length; j++) {
                    if (allTask[i].clientid[j] === clientID) {
                        mytask.push(allTask[i])
                    }
                }
            } else {
                mytask.push(allTask[i])
            }

        }
        return resolve(mytask)
    })
    return await filtermyTask
}
