import React, { Component } from 'react'
import "../assest/css/home.css"
import { Link, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import adminStatus from "../helpers/Checkadmin"
export default class Home extends Component {

    constructor(props) {
        super()
        this.state = {
            token: Cookies.get("_uid"),
            myprojects: []
        }
    }

    componentDidMount = async () => {
        const { token } = this.state
        const admin = await adminStatus()
        const myproject = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/project/filter`, {
            headers: {
                "authorization": `Bearer ${token}`,
                admin: admin
            }
        }).then((res) => {            
            return res.data
        }).catch((error) => {            
            if (error.response.data) {
                return false
            }
        })
        if (myproject !== false) {
          this.setState({myprojects:myproject})
        }
    }   
  
    render() {
        const { token, myprojects } = this.state     
        if (token === undefined) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <div className="row">
                    {
                        myprojects.length !== 0 ? myprojects.map((project, index) => (
                            <div className="col-md-6" key={index}>
                                <Link to={`/view/${project.Projectid}`}><div className="homecard mb-3" style={{ maxWidth: "540px" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{project.project_title}</h5>
                                        <p>{project.Company_name}</p>

                                    </div>
                                </div>
                                </Link>
                            </div>
                        )) : <div>No Data</div>
                    }

                </div>
            </div>
        )
    }
}
