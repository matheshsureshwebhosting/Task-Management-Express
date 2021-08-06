import * as mongoose from 'mongoose'

export const ProjectuserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createby: {
        type: String,
        required: true
    },
    projectid: {
        type: String,
        required: true
    },
    clientid: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Projectuser = mongoose.model('projectuser', ProjectuserSchema);
export default Projectuser;