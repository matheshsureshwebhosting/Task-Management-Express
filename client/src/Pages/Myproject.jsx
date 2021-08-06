import React, { Component } from 'react'
import "../assest/css/home.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export default class Myproject extends Component {
    constructor(props) {
        super()
        this.state = {
            token: Cookies.get("_uid"),
            myprojects: []
        }
    }
    componentDidMount = async () => {
        const { token } = this.state
        const adminProjects = await axios.get(`${process.env.REACT_APP_SERVER_ORIGIN}/project/admin`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            if (error) return false
        })
        if (adminProjects !== false) {
            this.setState({ myprojects: adminProjects })
        }
    }


    render() {
        const { myprojects } = this.state
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
                        )) : null
                    }

                </div>
            </div>
        )
    }
}
