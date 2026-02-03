import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteNewsletter, GetNewsletter, UpdateNewsletter } from '../../../Redux/ActionCreators/NewsletterActionCreator'
// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

export default function AdminManageNewsletterPage() {
  let newsletterStateData = useSelector((state) => state.newsletterStateData)
  let dispatch = useDispatch()

  function removeRecord(id) {
    if (confirm("You want to delete this record?")) {
      dispatch(DeleteNewsletter({ id: id }))
    }
  }

  function unsubscribeUser(data) {
    dispatch(UpdateNewsletter({
      id: data.id,
      email: data.email,
      name: data.name,
      userid: data.userid,
      active: false
    }))
    dispatch(GetNewsletter())
    console.log("update")
  }

  useEffect(() => {
    dispatch(GetNewsletter())
    if (newsletterStateData.length) {
      $('#MyTable').DataTable()
    }
  }, [newsletterStateData])

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='bg-dark text-light text-center py-2'>Manage Newsletters</h5>
              <div className="row">
                <div className="table-responsive">
                  <table className="table-bordered table" id='MyTable'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subscribed</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(newsletterStateData)}
                      {newsletterStateData ? (newsletterStateData.map((item) => {
                        return <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.userid}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.active ? "Yes" : "No"}</td>
                          {item.active ? <td><button onClick={() => { unsubscribeUser(item) }} className='btn btn-light text-primary'>Unsubscribe</button></td> : <td><button onClick={() => { removeRecord(item.id) }} className='btn btn-light'><i className='bi bi-trash text-danger'>&nbsp;Delete</i></button></td>}


                        </tr>
                      })) : <h4>Loading Details...</h4>}

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
