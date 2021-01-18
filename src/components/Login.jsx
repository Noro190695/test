import React from 'react';

export default function Login(props){
    return (
        <form className='form login' onSubmit={props.login}>
            <h2>Login</h2>
            <input type="hidden" name='rest' value='login'/>
            <input type="email" placeholder='E-mail' name='email' required/>
            <input type="password" placeholder='password' name='password' required/>
            <button type='submit'>Login</button>
        </form>
    )
}