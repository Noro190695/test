import React, {Component} from 'react';
import {get, post} from "../config/Request";


export default class Account extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            edit: false,
            id: 0,
            search: [false]
        }
        this.contactRef = React.createRef();
    }

    componentDidMount() {
        let data = new FormData();
        data.append('rest', 'contact');
        data.append('method', 'GET');
        data.append('id', this.props.user.data.id);
        post(data).then( res => {
            if (res.status){
                this.setState({
                    contacts: res.contact
                })
            }
        })
    }
    addContact = (e) => {
        e.preventDefault()
        let data = new FormData(e.target);
        post(data).then( res => {
            if (res.status){
                this.contactRef.current.value = ''
                
                this.setState({
                    contacts: res.contact,
                    edit:false
                })
            }
        })
    }
    delete = (e) => {
        let data = new FormData();
        data.append('rest', 'contact');
        data.append('method', 'DELETE');
        data.append('id', e.target.dataset.id);
        data.append('user_id', this.props.user.data.id);
        post(data).then( res => {
            this.contactRef.current.value = ''
            if (res.status){
                this.setState({
                    contacts: res.contact,
                    edit:false
                })
            }else{
                this.setState({
                    contacts: [],
                    edit:false
                })
            }
        })
    }
    edit = (e) => {
        this.contactRef.current.value = e.target.dataset.contact
        this.setState({
            edit: true,
            id: e.target.dataset.id
        })
    }
    search = (e) =>{
        let num = +e.target.value
       let res = this.state.contacts.filter(res => {
           if(res.contact.match(num) !== null){
              return res
           }else{
              return false
           }
       })
        this.setState({
            search: res
        })
    }
    render() {
        let contacts = [];
        if (this.state.search[0]){
            contacts = this.state.search
        }else{
            contacts = this.state.contacts
        }
        return (
            <div className='account'>
                <form className='contact__form' onSubmit={this.addContact}>
                    <input type="number" placeholder={'Search...'} onChange={this.search} className='search'/>
                    {
                        this.state.edit?
                            <input type="hidden" name='contact_id' value={this.state.id}/>:''
                    }
                    <input type="hidden" name='rest' value='contact'/>
                    <input type="hidden" name='method' value={this.state.edit? 'PUT': 'POST'}/>
                    <input type="hidden" name='id' value={this.props.user.data.id?this.props.user.data.id:''}/>
                   <div>
                       <input type="number" name='contact' placeholder='Add new contact' ref={this.contactRef}/>
                       <button type='submit'>{this.state.edit? 'Change': 'Add'}</button>
                   </div>
                </form>

                <ul className='contacts'>
                    {
                        contacts.map((contact,i) => {
                            return (
                                <li key={i}>
                                    <p>
                                        <span>{i +1})</span>
                                        <span> {contact.contact}</span>
                                    </p>
                                    <span>{contact.date}</span>
                                    <div className="config">
                                        <div className="edit" onClick={this.edit} data-contact={contact.contact} data-id={contact.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                        </div>
                                        <div className="delete" onClick={this.delete} data-id={contact.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className='git'><a href="https://github.com/Noro190695/testReact">LINK GITHUB</a></h2>
            </div>
        )
    }
}