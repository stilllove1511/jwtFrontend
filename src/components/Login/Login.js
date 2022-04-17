
import { useHistory } from 'react-router-dom';

import './Login.scss'

function Login(props) {
    let history = useHistory()
    const handleCreateNewAccount = () => {
        history.push('/register')
    }
    return (
        <div class="login-container py-4">
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
                        <input type="text" className='form-control' placeholder='Email' />
                        <input type='password ' className='form-control' placeholder='Password' />
                        <btn className='btn btn-primary'>Login</btn>
                        <span className='text-center'>
                            <a href="#">
                                Forgotten your password?

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