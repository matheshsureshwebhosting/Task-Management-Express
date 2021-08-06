import * as mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema({
    project_title: {
        type: String,
        required: true
    },
    Company_name: {
        type: String,
        required: true
    },
    Onwer_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    Projectid: {
        type: String,
        required: true
    },
    Projectcreatorid: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    clientid:{
        type:Array
    }
})

const project = mongoose.model('project', ProjectSchema);
export default project;