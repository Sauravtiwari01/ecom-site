import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { DeleteContactUS, GetContactUS } from '../../../Redux/ActionCreators/ContactUsActionCreator';
import { DeleteOrder, GetOrder } from '../../../Redux/ActionCreators/OrderActionCreator';
import { useNavigate } from 'react-router-dom';
export default function AdminOrdersPage() {
  let orderStateData = useSelector((state) => state.orderStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  function deleteOrder(id) {
    if (confirm("You want to delete this record?")) {
      dispatch(DeleteOrder({ id: id }))
      dispatch(GetOrder())
    }
  }

  function manageOrder(id){
    navigate(`/admin/orders/manage-orders/${id}`)
  }

  useEffect(() => {
    dispatch(GetOrder())
    if (orderStateData.length) {
      $('#MyTable').DataTable()
    }
  }, [orderStateData.length])

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-4">
          <div className="row">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='bg-dark text-light text-center py-2'>Manage Orders</h5>
              <div className="row">
                <div className="table-responsive">
                  <table className="table-bordered table" id='MyTable'>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>Order Status</th>
                        <th>Payment Method</th>
                        <th>Mobile</th>
                        <th>Shipping Address</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderStateData.map((item) => {
                        return <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.orderDate}</td>
                          <td>{item.userid}</td>
                          <td>{item.BuyerName}</td>
                          <td>{item.orderStatus}</td>
                          <td>{item.paymentMethod}</td>
                          <td>{item.shippingAddress.mobile}</td>
                          <td >
                            {item.shippingAddress.address}{" "}{item.shippingAddress.locality}{" "}{item.shippingAddress.district}{" "}{item.shippingAddress.state}{" "}{item.shippingAddress.pincode}
                          </td>
                          <td><button onClick={()=>{manageOrder(item.id)}} className='btn btn-light'><i className='text-primary bi bi-pencil'></i></button></td>
                          <td><button onClick={() => { deleteOrder(item.id) }} className='btn btn-light'><i className='text-danger bi bi-trash'></i></button></td>

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


    </>
  )
}
