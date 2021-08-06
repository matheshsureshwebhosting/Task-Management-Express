import axios from 'axios'
import Cookies from 'js-cookie'
import React, { Component } from 'react'
import '../assest/css/taskview.css'
import { Admincontext } from "../contexts/Admincontext"
import adminStatus from "../helpers/Checkadmin"
export default class Taskview extends Component {
    static contextType = Admincontext
    constructor(props) {
        super()
        this.state = {
            token: Cookies.get("_uid"),
            mytasks: [],
            taskid: null,
            admin: false,
            status: null,
            users: [],
            allusers: [],
            taskStatus: ["Processing", "Completed", "Bending"]
        }
    }
    componentDidMount = async () => {
        const { taskid } = this.props.match.params
        const admin = await adminStatus()
        this.setState({ admin: admin })
        this.setState({ taskid: taskid })
        const myTask = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/task/view`, {
            headers: {
                taskid: taskid,
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
            if (myTask.clientid !== undefined) {
                const getusers = await this.getUsers(myTask.clientid)
                this.setState({
                    users: getusers
                })
            }
        }
        const allusers = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/users`, {
            headers: {
                admin: admin
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        if (allusers !== false) {
            this.setState({ allusers: allusers })
        }
    }

    getUsers = async (users) => {
        const getUsers = new Promise(async (resolve, reject) => {
            const allusers = []
            for (var i = 0; i < users.length; i++) {
                await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/users/singleid`, {
                    headers: {
                        clientid: users[i]
                    }
                }).then((res) => {
                    allusers.push({ name: res.data.name, clientid: res.data.clientid })
                })
            }
            return resolve(allusers)
        })
        return await getUsers
    }


    removeUser = async (e, removeclientid) => {
        const admin = await adminStatus()
        const { taskid, token } = this.state
        const deluser = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/task/removeuser`, {
            headers: {
                "authorization": `Bearer ${token}`,
                taskid: taskid,
                admin: admin,
                clientid: removeclientid
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        console.log(deluser);
    }

    handlechange = (e) => {
        this.setState({ status: e.target.value })
    }
    updateStatus = async () => {
        const admin = await adminStatus()
        const { status, token, taskid } = this.state
        await axios.post(`${process.env.REACT_APP_SERVER_ORIGIN}/mytask/statusupdate`, {
            status: status
        }, {
            headers: {
                "authorization": `Bearer ${token}`,
                taskid: taskid,
                admin: admin
            }
        }).then((res) => {
            if (res.data) {
                console.log(res.data);
                const { nModified } = res.data
                if (nModified !== 0) {
                    alert("Status Updated")
                    window.location.reload()
                } else {
                    alert("Status Not Updated")
                }

            }
        }).catch((error) => {
            if (error) {
                alert(error.response)
            }
        })
    }
    handlechangegetemail = (e) => {
        const { allusers } = this.state
        const email = e.target.value
        if (allusers.length !== 0) {
            for (var i = 0; i < allusers.length; i++) {
                if (allusers[i].email.toLowerCase().includes(email.toLowerCase())) {
                    console.log(allusers[i]);
                }
            }
        }
    }
    render() {
        const { mytasks, taskStatus, admin, users } = this.state
        return (
            <div className="container">
                <div className="row">
                    {
                        mytasks.length !== 0 ? (
                            <div className="col-md-6"><div className="card taskcard">
                                <h2 className="title mb-5"> Task Details</h2>
                                <h6><b>Title</b></h6>
                                <p>{mytasks.title}</p>
                                <h6><b>Task Description</b></h6>
                                <p>{mytasks.description}</p>
                                <h6><b>Start date</b></h6>
                                <p>{mytasks.startdate}</p>
                                <h6><b>End date</b></h6>
                                <p>{mytasks.lastdate}</p>
                                <h6><b>Status</b></h6>
                                <p>{mytasks.status}</p>
                            </div></div>
                        ) : null
                    }

                    <div className="col-md-6">
                        <div className="col-lg-12">
                            {
                                admin ? (
                                    <div className="card taskcard">
                                        <h5 className="mb-5"> <b>Users</b><span className="btn btn-info" style={{ float: "right" }} data-bs-toggle="modal" data-bs-target="#exampleModal" >Add User</span></h5>
                                        {
                                            users.length !== 0 ? users.map((user, index) => (
                                                <p key={index}><b>{user.name}</b>  <span className="btn btn-danger" style={{ float: "right" }} onClick={(e) => this.removeUser(e, user.clientid)} >Remove User</span></p>
                                            )) : null
                                        }
                                    </div>
                                ) : null
                            }

                            <div className="card taskcard">
                                <h5 className="mb-5"> <b>Update Status</b></h5>

                                <div>
                                    <select style={{ width: "47%" }} name="status" id="status" className="form-select" onChange={(e) => this.handlechange(e)} >
                                        {
                                            taskStatus.map((tasksts, index) => (
                                                tasksts === mytasks.status ? <option key={index} selected value={tasksts}  >{tasksts}</option> : <option key={index} value={tasksts} >{tasksts}</option>
                                            ))
                                        }
                                    </select>  <span className="btn btn-info" onClick={this.updateStatus} style={{ float: "right", marginTop: "-39px" }}>Update Status</span>
                                </div>


                            </div>


                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="email-login">
                                                <label htmlFor="email"> <b>User Email</b></label>
                                                <input type="email" placeholder="Enter User Email" onChange={(e) => this.handlechangegetemail(e)} name="email" required />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary">Submit</button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* </div> */}
                    </div>


                    {/* <ToastContainer /> */}
                </div>
            </div>
        )
    }
}
