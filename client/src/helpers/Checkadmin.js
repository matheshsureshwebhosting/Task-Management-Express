import axios from "axios"
import Cookies from "js-cookie"

const checkAdmin = async () => {
    const admin = new Promise(async (resolve, reject) => {
        const token = Cookies.get("_uid")
        if (token !== undefined) {
            const checkAdmin = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/project/admin`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }).then((res) => {
                return res.data
            }).catch((error) => {
                if (error) return false
            })
            if (checkAdmin === false) return resolve(false)
            if (checkAdmin.length === 0) return resolve(false)
            return resolve(true)
        }

    })
    return await admin
}

export default checkAdmin