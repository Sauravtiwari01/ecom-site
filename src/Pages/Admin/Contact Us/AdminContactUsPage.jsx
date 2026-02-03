import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { DeleteContactUS, GetContactUS } from '../../../Redux/ActionCreators/ContactUsActionCreator';
export default function AdminContactUsPage() {
  let contactUsStateData = useSelector((state) => state.contactUsStateData)
  let dispatch = useDispatch()

  function removeRecord(id) {
    if (confirm("You want to delete this record?")) {
      dispatch(DeleteContactUS({ id: id }))
      dispatch(GetContactUS())
    }
  }

  let [msg,setMSG] = useState("")

  useEffect(() => {
    dispatch(GetContactUS())
    if (contactUsStateData.length) {
      $('#MyTable').DataTable()
    }
  }, [contactUsStateData.length ])

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='bg-dark text-light text-center py-2'>Manage Contact Messages</h5>
              <div className="row">
                <div className="table-responsive">
                  <table className="table-bordered table" id='MyTable'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactUsStateData.map((item) => {
                        return <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.userid}</td>
                          <td>{item.name}</td>
                          <td>{item.userName}</td>
                          <td>{item.email}</td>
                          <td><button type='button' onClick={()=>{setMSG(item.message)}} data-bs-toggle="modal" data-bs-target="#messageModal" className='btn btn-light'><i className='bi bi-eye text-primary'>&nbsp;View</i></button></td>
                          <td><button onClick={() => { removeRecord(item.id) }} className='btn btn-light'><i className='bi bi-trash text-danger'>&nbsp;Delete</i></button></td>


                        </tr>
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- MESSAGE Modal --> */}
      <div class="modal fade" id="messageModal" tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="messageModalLabel">User Message</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <span className='text-dark'>{msg}</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
