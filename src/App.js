import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {get, post, url} from "./config/Request";
import Login from "./components/Login";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import Reg from "./components/Reg";
import Alert from "./components/Alert";
import Account from "./components/Account";
import Header from "./components/Header";



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            redirect: false,
            alert: false,
            userExist: false,
            user: ''
        }
    }
    componentDidMount() {

        if (localStorage.getItem('user') !== null  && localStorage.getItem('user') !== ''){
            this.setState({
                user: JSON.parse(localStorage.getItem('user')),
                userExist: true
            })
        }else{
            this.setState({
                user: false,
                userExist: false
            })
        }

    }

    userLogin = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);

        post(data).then(res => {
    
            if (res.status){
               localStorage.setItem('user', JSON.stringify(res));
                this.setState({
                    userExist: true
                })
            }else{
                this.setState({
                    alert: true,
                    message: res.message
                })
                setTimeout(() => {
                    this.setState({
                        alert: false
                    })
                },2000)
            }
        })
    }
    userReg = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        post(data).then(res => {
            if (res.status){
                this.setState({
                    redirect: true
                })
                setTimeout(() => {
                    this.setState({
                        redirect: false
                    })
                },2000)
            }else{
                this.setState({
                    alert: true,
                    message: res.message
                })
                setTimeout(() => {
                    this.setState({
                        alert: false
                    })
                },2000)
            }
        })
    }
    logout = () =>{
        localStorage.setItem('user', '')
        this.setState({
            userExist: false
        })
    }
    render() {

        return (
            <div className="App">
                {
                    this.state.alert?<Alert content={this.state.message}/>:''
                }
                {
                    this.state.redirect? <Redirect to='/login' />:''
                }
                {
                    this.state.userExist?<Redirect to='/account' /> :<Redirect to='/login' />
                }
                <Header userExist={this.state.userExist} user={this.state.user} logout={this.logout}/>
                <Switch>
                    {
                        this.state.userExist?
                            <Route path='/account' >
                                <Account user={this.state.user}/>
                            </Route>:
                            <>
                                <Route path='/login'>
                                    <Login login={this.userLogin}/>
                                </Route>
                                <Route path='/register'>
                                    <Reg reg={this.userReg}/>
                                </Route>
                            </>
                    }

                </Switch>
            </div>
        )
    }
}


export default App;
