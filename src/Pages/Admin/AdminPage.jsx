import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser } from '../../Redux/ActionCreators/UserActionCreator'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
    let userStateData = useSelector((state) => state.userStateData)
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(GetUser())
        if (userStateData.length) {
            const user = userStateData.find(x => x.id === localStorage.getItem("userid"))
            setData(user)
        }
    }, [userStateData.length])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2'>Admin Panel</h5>
                            <div className="row">

                                <div className="col-md-2">
                                    <img src="/assets/images/avatars/NoUser.png" width="100%" alt="" />
                                    <button onClick={()=>{navigate('/update-profile')}} className='btn btn-dark my-5 w-100'>Update Profile</button>
                                </div>
                                <div className="col-md-10">
                                    <table className=' table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <th>Name</th><td>{data?.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Username</th><td>{data?.userName}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th><td>{data?.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Mobile</th><td>{data?.mobile}</td>
                                            </tr>
                                            <tr>
                                                <th>Role</th><td>{data?.role}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
