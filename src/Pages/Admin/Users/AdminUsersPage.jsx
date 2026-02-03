import React, { useEffect } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetUser } from '../../../Redux/ActionCreators/UserActionCreator'
import { useNavigate } from 'react-router-dom'

// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

export default function AdminUsersPage() {
  let userStateData = useSelector((state) => state.userStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function deleteUser(id) {
    if (confirm("Delete this User?")) {
      dispatch(DeleteUser({ id: id }))
    }
  }
  useEffect(() => {
    dispatch(GetUser())
    if(userStateData.length){
      $('#MyTable').DataTable()
    }
  }, [userStateData])
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row my-4">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='text-center bg-dark text-light py-2'>Site Users</h5>
              <div className="table-responsive">
                <table className="table table-bordered" id="MyTable">
                  <thead>
                    <tr>
                      <td>UserID</td>
                      <td>Name</td>
                      <td>UserName</td>
                      <td>Email</td>
                      <td>Mobile</td>
                      <td>Role</td>
                      <td>Active</td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                  </thead>
                  <tbody>
                    {userStateData.map((item) => {
                      return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.role}</td>
                        <td>{item.active ? "Yes" : "No"}</td>
                        <td><button onClick={()=>{navigate(`/admin/manage-users/${item.id}`)}} className='btn btn-light'><i className='bi bi-pencil text-primary'></i></button></td>
                        <td><button onClick={() => { deleteUser(item.id) }} className='btn btn-light'><i className='bi bi-trash text-danger'></i></button></td>
                      </tr>
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
