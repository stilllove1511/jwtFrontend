import { useState, useEffect } from 'react'

import './Users.scss'
import { fetchAllUser } from '../../services/userService'

function Users(props) {
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        let response = await fetchAllUser()
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT)
        }
    }
    return (
        <div className='container'>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Group</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 ?
                        <>
                            {listUsers.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td>{item.Group ? item.Group.name : ''}</td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <></>
                    }


                </tbody>
            </table>
        </div>
    );
}

export default Users 