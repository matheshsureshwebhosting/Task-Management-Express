import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },  
    startdate: {
        type: String,
        required: true
    },
    lastdate: {
        type: String,
        required: true
    },
    projectid: {
        type: String,
        required: true
    },
    clientid: {
        type: Array,        
    },
    status: {
        type: String,
        required: true
    },
    taskid:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    }
})

const Task = mongoose.model('task', TaskSchema);
export default Task;