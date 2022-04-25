
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

import './Register.scss'

function Register(props) {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }

    useEffect(() => {
        // axios.post('http://localhost:8080/api/v1/register', {
        //     email, phone, username, password
        // })
    }, [])

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput)
        if (!email) {
            toast.error('Email is invalid')
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Please enter a valid email adress')
            return false
        }
        if (!phone) {
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })

            toast.error('Phone is invalid')
            return false
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })

            toast.error('Password is invalid')
            return false
        }
        if (password !== confirmPassword) {
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            toast.error('Your password is not the same')
            return false
        }

        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        if (check === true) {
            let serverData = await registerNewUser(email, phone, username, password)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                history.push('/login')
            } else {
                toast.error(serverData.EM)
            }
        }
    }
    return (
        <div className="register-container py-4">
            <div className="container ">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Hoi Dan IT
                        </div>
                        <div className='detail'>
                            Hoi Dan It helps you connect and share with the people in your ....
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand text-center d-sm-none'>
                            Hoi Dan IT
                        </div>
                        <div className="form-group">
                            <label for="email" className="form-label">Email address:</label>
                            <input type="email" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} id="email" placeholder='Email'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="phone" className="form-label">Phone number:</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} id="phone" placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="Username" className="form-label">Username:</label>
                            <input type="text" className='form-control' id="Username" placeholder='Username'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="password" className="form-label">Password:</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} id="password" placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}

                            />
                        </div>
                        <div className="form-group">
                            <label for="Re-enterPassword" className="form-label">Re-enter password:</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} id="Re-enterPassword" placeholder='Re-enter password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <btn className='btn btn-primary' onClick={() => handleRegister()}>Register</btn>

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