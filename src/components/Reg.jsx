import React from 'react';

export default function Reg(props){
    return (
        <form className='form login' onSubmit={props.reg}>
            <h2>Register</h2>
            <input type="hidden" name='rest' value='reg'/>
            <input type="text" placeholder='Name' name='name'/>
            <input type="text" placeholder='Surname' name='surname'/>
            <input type="email" placeholder='E-mail' name='email'/>
            <input type="password" placeholder='password' name='password'/>
            <button type='submit'>Login</button>
        </form>
    )
}