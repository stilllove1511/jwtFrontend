import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'

import './Users.scss'
import { fetchAllUser, deleteUser } from '../../services/userService'
import ModalDelete from './ModalDelete'
import ModalUser from './ModalUser'

function Users(props) {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(3)

    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})

    //modal update/create user
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({})


    useEffect(() => {
        fetchUser()
    }, [currentPage])

    const fetchUser = async () => {
        let response = await fetchAllUser(currentPage, currentLimit)
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }

    const handleClose = () => {
        setIsShowModalDelete(false)
        setDataModal({})
    }

    const confirmDeleteUser = async (user) => {
        let response = await deleteUser(dataModal)
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUser()
            setIsShowModalDelete(false)
        } else {
            toast.error(response.data.EM)
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        await fetchUser()
    }

    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }
    return (
        <>
            <div className='container'>
                <button className='btn btn-success'>Refresh</button>
                <button className='btn btn-primary' onClick={() => { setIsShowModalUser(true); setActionModalUser('CREATE') }}>Add new user</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Group</th>
                            <th scope="col">Action</th>
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
                                            <td>
                                                <button className='btn btn-warning' onClick={() => { handleEditUser(item) }}>Edit</button>
                                                <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                                            </td>
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
            {totalPages > 0 &&
                <div className='user-footer'>
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div>
            }
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                title={"Create new user"}
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users 