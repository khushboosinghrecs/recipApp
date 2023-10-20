import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
const apiUrl = 'http://localhost:8081/api/post';
const intialState = {
    username: '',
    email: '',
    password: ''
}

const AddEdit = () => {
    const [formData, setFormData] = useState(intialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        console.log(formData, 'ggg')
    }
    const { username, email, password } = formData;

    const handleSubmit = (e) => {
        console.log('hello submit', e.target.value);
        e.preventDefault();
        if (!username || !email || !password) {
            console.log('please enter your username and email');
            console.log( username, email, password )
            toast.error('Please Provide a value into input field');
        } else {
            console.log('hello submit in else');
            try {
                const response = axios.post(apiUrl, {
                  username: username,
                  email: email,
                  password: password,
                });
          
                if (response.status === 200) {
                  const responseData = response.data; // Parse the response data
                  console.log(responseData, 'hhhhhhhhh');
                } else {
                  console.log('Error:', response.status);
                }
              } catch (error) {
                console.error('Axios error:', error);
              }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>userName</label>
                <input type="text" id='username' name='username' placeholder="username" onChange={handleInputChange} />
                <label htmlFor='email'>email</label>
                <input type="email" id='email' name='email' placeholder="email" onChange={handleInputChange} />
                <label htmlFor='password'>password</label>
                <input type="password" id='password' name='password' placeholder="password" onChange={handleInputChange} />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
export default AddEdit