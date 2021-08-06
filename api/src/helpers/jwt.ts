import jwt, { Secret } from "jsonwebtoken"

var secret: Secret = process.env.JWT_KEY || "maybe this not a token" 

export const createToken = async (userid: string) => {
    try {
        const Token = await jwt.sign(userid, secret)
        return Token
    } catch (error) {
        if (error) return false
    }
}

export const verifyToken = async (token: string) => {
    try {
        var data = jwt.verify(token, secret)
        return data
    } catch (error) {
        return false
    }
}