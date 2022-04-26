import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { fetchGroup, createNewUser, updateCurrentUser } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'

const ModalUser = (props) => {
    const { action, dataModalUser } = props
    const defaulUserData = {
        email: "",
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [userData, setUserData] = useState(defaulUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassWord] = useState('')
    const [address, setAddress] = useState('')
    const [sex, setSex] = useState('')
    const [group, setGroup] = useState('')

    const [userGroups, setUserGroups] = useState([])

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, Group: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, group: userGroups[0].id })
            }
        }
    }, [action])
    const getGroups = async () => {
        let res = await fetchGroup()
        if (res && res.EC === 0) {
            setUserGroups(res.DT)
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }

    const checkValidInputs = () => {
        //create  user
        if (action == 'UPDATE')
            return true
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)

                toast.error(`Empty input ${arr[i]}`)
                check = false
                break
            }
        }
        return check
    }

    const handleConfirmUser = async () => {
        //creatr user
        let check = checkValidInputs()
        if (check) {
            let res = action === 'CREATE' ?
                await createNewUser({ ...userData, groupId: userData['group'] })
                : await updateCurrentUser({ ...userData, groupId: userData['group'] })
            if (res.data && res.EC === 0) {
                props.onHide()
                setUserData({ ...defaulUserData, group: userGroups.length > 0 ? userGroups[0].id : '' })
            } else {
                toast.error(res.EM)
            }
        }
    }

    const handleClosedModalUser = () => {
        props.onHide()
        setUserData(defaulUserData)
        setValidInputs(validInputsDefault)
    }

    return (
        <>
            <Modal size="lg" show={props.show} className="modal-user" onHide={() => handleClosedModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>
                            {props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row content-body'>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="email" className="form-label">Email address (<span className='red'>*</span>)</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type="email" className="form-control" id="email"
                                value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="phone" className="form-label">Phone number (<span className='red'>*</span>)</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type="text" className="form-control" id="phone"
                                value={userData.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="username" className="form-label">Username</label>
                            <input
                                type="text" className="form-control" id="username"
                                value={userData.username}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            {
                                action === 'CREATE' && (
                                    <>
                                        <label for="password" className="form-label">Password (<span className='red'>*</span>)</label>
                                        <input
                                            className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                            type="password" className="form-control" id="password"
                                            value={userData.password}
                                            onChange={(event) => handleOnchangeInput(event.target.value, 'password')}
                                        />
                                    </>
                                )
                            }

                        </div>
                        <div className="col-12 form-group">
                            <label for="address" className="form-label">Address</label>
                            <input
                                type="text" className="form-control" id="address"
                                value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="sex" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                value={userData.sex}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'sex')}
                            >
                                <option selected value="Male" >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="Group" className="form-label">Group (<span className='red'>*</span>)</label>
                            <select
                                className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                value={userData.group}
                                onChange={(event) => handleOnchangeInput(event.target.value, 'group')}
                            >
                                {
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalUser
