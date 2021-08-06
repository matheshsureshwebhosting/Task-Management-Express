import bcrypt from "bcryptjs"

export const createrHashpwd = async (password: string) => {
    try {
        const salt: string = await bcrypt.genSalt(10)
        const hashPwd: string = await bcrypt.hashSync(password, salt)
        return hashPwd
    } catch (error) {
        if (error) return false
    }
}

export const verifyPwd = async (password: string, hashPwd: string) => {
    try {
        const verifyPwd: boolean = await bcrypt.compare(password, hashPwd)
        return verifyPwd
    } catch (error) {
        if (error) return false
    }
}