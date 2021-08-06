import axios from 'axios'
import Cookies from 'js-cookie'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../assest/css/signup.css'

export default class Signup extends Component {
    constructor(props) {
        super()
        this.state = {
            name: null,
            email: null,
            number: null,
            password: null,
            token: Cookies.get("_uid"),
        }
      
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitbtnsign = async () => {
        const { name, email, number, password } = this.state
        await axios.post(`${process.env.REACT_APP_SERVER_ORIGIN}/auth/register`, {
            name: name,
            email: email,
            number: number,
            password: password
        }).then((res) => {
           if(res.data.token){
            window.location.replace("/home")
           }
        }).catch((error) => {
            if (error) {
                console.log(error.response);
            }
        })
    }
    render() {     
        const { token } = this.state
        if(token!==undefined){
            return <Redirect to="/home" />
        }   
        return (
            <div>

                <div className="card">
                    <h2 className="title"> Sign Up</h2>
                    {/* <p className="subtitle">Already have an account? <a href={"javascript"}> sign In</a></p> */}
                    <div className="email-login">
                        <label htmlFor="email"> <b>Name</b></label>
                        <input type="text" placeholder="Enter Name" onChange={(e) => this.handlechange(e)} name="name" required />

                        <label htmlFor="email"> <b>Email</b></label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => this.handlechange(e)} name="email" required />

                        <label htmlFor="email"> <b>Phone Number</b></label>
                        <input type="number" placeholder="Enter Phone Number" onChange={(e) => this.handlechange(e)} name="number" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => this.handlechange(e)} name="password" required />

                    </div>
                    <button className="btn btn-primary" onClick={this.submitbtnsign}>Sign Up</button>
                    <p className="subtitle mt-3">Already have an account? <Link to="/" > sign In</Link></p>
                </div>
                {/* <ToastContainer /> */}
            </div>

        )
    }
}
