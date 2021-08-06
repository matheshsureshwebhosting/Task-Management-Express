import Users from "../models/user"

export const checkUser = async (email: string) => {
    const checkUser = new Promise(async (resolve, reject) => {
        await Users.find({ "email": email }).then((result: any) => {
            return resolve(result)
        }).catch((error: any) => {
            if (error) return resolve(false)
        })
    })
    return await checkUser
}

export const createUsers = async (userinfos: object) => {
    const createUsers = new Promise(async (resolve, reject) => {
        const users = await new Users(userinfos).save().then((result: any) => {
            return resolve(result)
        }).catch((error: any) => {
            if (error) return resolve(false)
        })
        return resolve(userinfos)
    })
    return await createUsers
}