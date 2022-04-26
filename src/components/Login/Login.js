
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import './Login.scss'
import { UserContext } from '../../context/UserContext'

function Login(props) {
    const { loginContext } = useContext(UserContext)
    let history = useHistory()

    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }

    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

    const handleCreateNewAccount = () => {
        history.push('/register')
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput)

        if (!valueLogin) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueLogin: false
            })
            toast.error('Please enter your email adrees or phone number')
            return
        }
        if (!password) {
            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false
            })
            toast.error('Please enter your password')
            return
        }



        let response = await loginUser(valueLogin, password)
        if (response && +response.EC === 0) {
            //success
            let token = response.DT.access_token
            let email = response.DT.email
            let username = response.DT.username
            let groupWithRoles = response.DT.groupWithRoles
            let data = {
                isAuthenticated: true,
                token,
                account: { email, username, groupWithRoles }
            }
            loginContext(data)
            history.push('/users')
        }

        if (response && +response.EC !== 0) {
            toast.error(response.EM)
        }
    }


    return (
        <div className="login-container py-4">
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
                        <input
                            type="text"
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email or phone'
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                        <span className='text-center'>
                            <a href="#">
                                Forgotten your password???

                            </a>
                        </span>
                        <hr />
                        <div className=' text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;