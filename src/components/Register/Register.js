
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

import './Register.scss'

function Register(props) {
    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }

    //tets api
    useEffect(() => {
        axios.get("http://localhost:8080/api/test-api").then(data => {
            console.log(">>> check data axois:", data)
        })
    }, [])
    return (
        <div class="register-container py-4">
            <div class="container ">
                <div class="row px-3 px-sm-0">
                    <div class="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Hoi Dan IT
                        </div>
                        <div className='detail'>
                            Hoi Dan It helps you connect and share with the people in your ....
                        </div>
                    </div>
                    <div class="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand text-center d-sm-none'>
                            Hoi Dan IT
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Email address:</label>
                            <input type="email" class="form-control" id="email" placeholder='Email' />
                        </div>
                        <div class="form-group">
                            <label for="phone" class="form-label">Phone number:</label>
                            <input type="text" class="form-control" id="phone" placeholder='Phone number' />
                        </div>
                        <div class="form-group">
                            <label for="Username" class="form-label">Username:</label>
                            <input type="text" class="form-control" id="Username" placeholder='Username' />
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder='Password' />
                        </div>
                        <div class="form-group">
                            <label for="Re-enterPassword" class="form-label">Re-enter password:</label>
                            <input type="password" class="form-control" id="Re-enterPassword" placeholder='Re-enter password' />
                        </div>
                        <btn className='btn btn-primary'>Register</btn>

                        <hr />
                        <div className=' text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already have an account?
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Register;