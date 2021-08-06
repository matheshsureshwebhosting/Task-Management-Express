import mongoose,{ Schema, model } from "mongoose"

const userSchema: Schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },   
    token: {
        type: String
    },
    clientid: {
        type: String
    }
})

const Users = mongoose.model('user', userSchema);
export default Users;