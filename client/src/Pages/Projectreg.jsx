import axios from 'axios'
import Cookies from 'js-cookie'
import React, { Component } from 'react'
import "../assest/css/projectreg.css"

export default class Projectreg extends Component {
    constructor(props) {
        super()
        this.state = {
            token: Cookies.get("_uid"),
            project_title: null,
            Company_name: null,
            onwer_name: null,
            email: null,
            phone: null,
            address: null
        }
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitbtnsign = async () => {
        const { project_title, Company_name, onwer_name, email, phone, address, token } = this.state
        const newProjects = {
            project_title: project_title,
            Company_name: Company_name,
            Onwer_name: onwer_name,
            email: email,
            phone: phone,
            address: address
        }
        const newproject = await axios.post(`${process.env.REACT_APP_SERVER_ORIGIN}/project/add`, newProjects, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return false
        })
        if (newproject !== false) {
            if (newproject.Projectid) {
                alert("uploaded")
                window.location.reload()
            } else {
                alert(newproject)
                window.location.reload()
            }
        }
    }
    render() {
        return (
            <div>
                <div className="card">
                    <h2 className="title"> Project Register</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="mt-5 row">
                        <div className="col-md-6 col">
                            <label htmlFor="title"> <b>Project Title</b></label>
                            <input type="text" placeholder="Enter Project Title" onChange={(e) => this.handlechange(e)} name="project_title" required />

                            <label htmlFor="name"> <b>Company Name</b></label>
                            <input type="text" placeholder="Enter Company Name" onChange={(e) => this.handlechange(e)} name="Company_name" required />

                            <label htmlFor="onwername"> <b>Onwer Name</b></label>
                            <input type="text" placeholder="Enter Onwer Name" onChange={(e) => this.handlechange(e)} name="onwer_name" required />

                        </div>
                        <div className="col-md-6 col">
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="email" placeholder="Enter Email" onChange={(e) => this.handlechange(e)} name="email" required />

                            <label htmlFor="phone"><b>Phone Number</b></label>
                            <input type="text" placeholder="Enter Phone Number" onChange={(e) => this.handlechange(e)} name="phone" required />

                            <label htmlFor="address"><b>Address</b></label>
                            <input type="text" placeholder="Enter Address" onChange={(e) => this.handlechange(e)} name="address" required />
                        </div>



                    </div>
                    <button className="btn btn-primary mt-3" onClick={this.submitbtnsign}>submit</button>
                </div>
                {/* <ToastContainer /> */}
            </div>

        )
    }
}
