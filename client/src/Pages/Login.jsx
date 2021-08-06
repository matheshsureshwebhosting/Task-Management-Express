import axios from 'axios'
import Cookies from 'js-cookie';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            email: null,
            password: null,
            token: Cookies.get("_uid"),
        }
    }
    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitbtn = async () => {
        const { email, password } = this.state
        await axios.post(`${process.env.REACT_APP_SERVER_ORIGIN}/auth/login`, {
            email: email,
            password: password
        }).then((res) => {
            const { token } = res.data                        
            if(token){
                window.location.replace("/home")
            }
        }).catch((error) => {
            if (error) {
                toast.info(error.response.data, {
                    autoClose: 10000,
                    transition: Slide
                })
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
                <div>
                    <div className="card">
                        <h2 className="title"> Sign In</h2>
                        <div className="email-login">

                            <label htmlFor="email"> <b>Email</b></label>
                            <input type="email" placeholder="Enter Email" onChange={(e) => this.handlechange(e)} name="email" required />

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" onChange={(e) => this.handlechange(e)} name="password" required />

                        </div>
                        <button className="cta-btn" onClick={this.submitbtn}>Sign In</button>
                        <p className="subtitle">Don't have an account? <Link to="/signup" > sign Up</Link></p>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        )
    }
}
