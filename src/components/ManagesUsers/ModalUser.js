import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'

const ModalUser = (props) => {
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

    const getGroups = async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT)
        } else {
            toast.error(res.data.EM)
        }
    }

    return (
        <>
            <Modal size="lg" show={true} className="modal-user">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>
                            {props.title}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row content-body'>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="email" class="form-label">Email address (<span className='red'>*</span>)</label>
                            <input type="email" class="form-control" id="email" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="phone" class="form-label">Phone number (<span className='red'>*</span>)</label>
                            <input type="text" class="form-control" id="phone" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="password" class="form-label">Password (<span className='red'>*</span>)</label>
                            <input type="password" class="form-control" id="password" />
                        </div>
                        <div className="col-12 form-group">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select">
                                <option selected value="Male" >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label for="Group" class="form-label">Group (<span className='red'>*</span>)</label>
                            <select class="form-select">
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
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Confrim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalUser
