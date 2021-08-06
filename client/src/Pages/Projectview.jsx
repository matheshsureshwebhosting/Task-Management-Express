import React, { Component } from 'react'
import taskimage from '../assest/images/task.png'
import { Link } from 'react-router-dom'
import '../assest/css/task.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import adminStatus from "../helpers/Checkadmin"
export default class Projectview extends Component {

    constructor(props) {
        super()
        this.state = {
            token: Cookies.get("_uid"),
            mytasks: [],
            admin: false,
            projectid: null,
            title: null,
            description: null,
            startdate: null,
            enddate: null
        }
    }
    componentDidMount = async () => {
        const admin = await adminStatus()
        const { projectid } = this.props.match.params
        this.setState({ projectid: projectid, admin: admin })
        const { token } = this.state
        const myTask = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/mytask/filter`, {
            headers: {
                "authorization": `Bearer ${token}`,
                projectid: projectid,
                admin: admin
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            if (error.response.data) {
                return false
            }
        })
        if (myTask !== false) {
            this.setState({
                mytasks: myTask
            })
        }

    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitTask = async () => {
        const { title, description, startdate, enddate, token, projectid } = this.state
        const newTask = {
            title: title,
            description: description,
            startdate: startdate,
            lastdate: enddate
        }
        const newtask = await axios.post(`${process.env.REACT_APP_SERVER_ORIGIN}/task/add`, newTask, {
            headers: {
                "authorization": `Bearer ${token}`,
                "projectid": projectid
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        if (newtask !== false) {
            if (newtask.taskid) {
                alert("uploaded")
                window.location.reload()
            } else {
                alert(newtask)
                window.location.reload()
            }

        }
    }
    delTask = async (e, taskid) => {
        const { token } = this.state
        const admin = await adminStatus()
        const deletetask = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/task/delete`, {
            headers: {
                "authorization": `Bearer ${token}`,
                "taskid": taskid,
                "admin": admin
            }
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        const { mytasks, admin } = this.state

        return (
            <React.Fragment>
                <div className="container mt-3 mb-5">
                    {
                        admin ? <button type="button" style={{ float: "right", marginTop: "-28px" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Create Task
                    </button> : null
                    }


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Task</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="email-login">
                                        <label htmlFor="title"> <b>Task Title</b></label>
                                        <input type="text" placeholder="Enter Task Title" onChange={(e) => this.handlechange(e)} name="title" required />

                                        <label htmlFor="des"> <b>Task Description</b></label>
                                        <textarea type="text" placeholder="Enter Task Description" onChange={(e) => this.handlechange(e)} name="description" required />

                                        <label htmlFor="startdate"> <b>Start date</b></label>
                                        <input type="date" placeholder="Enter Start Date" onChange={(e) => this.handlechange(e)} name="startdate" required />

                                        <label htmlFor="enddate"> <b>End date</b></label>
                                        <input type="date" placeholder="Enter End Date" onChange={(e) => this.handlechange(e)} name="enddate" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.submitTask}>Submit</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        {
                            mytasks.length !== 0 ? mytasks.map((task, index) => (
                                <div className="col-lg-12 col-12" key={index}>

                                    <div className="taskcard" style={{ maxHeight: "150px", width: "100%" }}>
                                        <div className="row g-0">

                                            <div className="col-md-2">
                                                <Link to={`/taskview/${task.taskid}`}>
                                                    <img src={taskimage} className="card-img-top" alt="doctor" style={{ width: "130px", marginTop: "-10px" }} />
                                                </Link>
                                            </div>
                                            <div className="col-md-10">
                                                <div className="card-body taskbody">
                                                    <h5 className="card-title">{task.title}  {admin ? <span className="btn btn-danger" onClick={(e) => this.delTask(e, task.taskid)} style={{ float: "right" }} >Remove Task</span> : null} </h5>
                                                    <Link to={`/taskview/${task.taskid}`}>
                                                        <p className="blogshort">{task.description}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <div>No Data</div>
                        }



                    </div>
                </div>
            </React.Fragment>
        )
    }
}
