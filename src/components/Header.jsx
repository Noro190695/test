import React from 'react';
import {Link} from "react-router-dom";

export default function Header(props){
    let user = false;
    if (localStorage.getItem('user') !== ''){
        user = JSON.parse(localStorage.getItem('user'))
    }else{
        user = ''
    }

    return (
        <header>
            <Link to='/'>
                <h1>Test</h1>
            </Link>
            {
                user? <h2>{user.data.name + ' ' + user.data.surname}</h2>:''
            }
            <div>
                {
                    props.userExist?
                        <Link to='/' onClick={props.logout}>Log out</Link>:
                        <>
                            <Link to='login'>Login</Link>
                            <Link to='register'>Register</Link>
                        </>
                }

            </div>
        </header>
    )
}