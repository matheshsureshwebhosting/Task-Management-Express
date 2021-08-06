import Task from "../models/task"

export const myTasks = async (projectid:string,clientid: string, status: any) => {
    const myTasks = new Promise(async (resolve, reject) => {
        const alltask = await Task.find({}).then((result: any) => {
            return result
        }).catch((error: any) => {
            return false
        })    
        console.log(alltask.length)    
        const filterdtask = await filtermyTask(projectid,clientid, alltask, status)

        return resolve(filterdtask)
    })
    return await myTasks
}

const filtermyTask = async (projectid:string,clientID: string, allTask: any, status: any) => {
    const filtermyTask = new Promise(async (resolve, reject) => {
        const mytask: any[] = []
        for (var i = 0; i < allTask.length; i++) {            
            if (status == "false") {
                console.log("if")
                for (var j = 0; j < allTask[i].clientid.length; j++) {
                    if (allTask[i].clientid[j] === clientID && allTask[i].projectid===projectid) {
                        mytask.push(allTask[i])
                    }
                }
            } else {
                console.log("else")
                mytask.push(allTask[i])
            }

        }
        console.log(mytask.length,allTask.length)
        return resolve(mytask)
    })
    return await filtermyTask
}

export const updateTasks = async (clientid: string, taskid: string, status: string,admin:string) => {
    const updateTasks = new Promise(async (resolve, reject) => {      
        if(admin=="false"){
            await Task.updateOne({ "clientid": clientid, "taskid": taskid }, { $set: { "status": status } }).then((result: any) => {
                return resolve(result)
            }).catch((error: any) => {
                return resolve(false)
            })
        }else{
            await Task.updateOne({"taskid": taskid }, { $set: { "status": status } }).then((result: any) => {
                return resolve(result)
            }).catch((error: any) => {
                return resolve(false)
            })
        }
      
    })
    return await updateTasks
}

export const myTasksFilter = async (projectid: string, clientid: string, status: any) => {
    const myTasks = new Promise(async (resolve, reject) => {
        const alltask = await Task.find({}).then((result: any) => {
            return result
        }).catch((error: any) => {
            return false
        })
        console.log(projectid, clientid, status)
        const filterdtask = await filtermyTasks(projectid, clientid, alltask, status)

        return resolve(filterdtask)
    })
    return await myTasks
}

const filtermyTasks = async (projectid: string, clientID: string, allTask: any, status: any) => {
    const filtermyTask = new Promise(async (resolve, reject) => {
        const mytask: any[] = []
        for (var i = 0; i < allTask.length; i++) {
            if (status == "false") {
                for (var j = 0; j < allTask[i].clientid.length; j++) {
                    if (allTask[i].clientid[j] === clientID && allTask[i].projectid === projectid) {
                        mytask.push(allTask[i])
                    }
                }
            } else {
                if (allTask[i].projectid === projectid) {
                    mytask.push(allTask[i])
                }
            }

        }
        return resolve(mytask)
    })
    return await filtermyTask
}