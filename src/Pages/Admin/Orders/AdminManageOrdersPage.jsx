import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetUser, UpdateUser } from '../../../Redux/ActionCreators/UserActionCreator'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidators from '../../../Validators/FormValidators'
import { GetOrder, UpdateOrder } from '../../../Redux/ActionCreators/OrderActionCreator'

export default function AdminManageOrdersPage() {
  let orderStateData = useSelector((state) => state.orderStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [data, setData] = useState({})
  let [productData, setProductData] = useState([])
  let [shippingAddress, setShippingAddress] = useState({})
  let [payment, setPayment] = useState('Pending')
  let { id } = useParams()
  function getInput(e) {
    let { name, value } = e.target

    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })

  }

  function postInput(e) {
    e.preventDefault()
    console.log("update")
    dispatch(UpdateOrder({ ...data, paymentStatus: payment }))
    dispatch(GetOrder())

    navigate('/admin/orders')

  }

  useEffect(() => {
    dispatch(GetOrder())
  }, [])
  useEffect(() => {

    if (orderStateData.length) {
      let item = orderStateData.find(x => x.id === id)
      setData({ ...item })
      setShippingAddress(item.shippingAddress)
      setProductData(item.products)
      let p = item.orderStatus
      if (p === "Order delivered")
        setPayment("Success")
      else
        setPayment("Pending")
      console.log(p, payment)
    }
  }, [orderStateData])
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row my-4">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='text-center bg-dark text-light py-2'>Manage Order</h5>
              <form onSubmit={postInput}>
                <div className="row mt-3">

                  <div className="col-md-3">
                    <label className='text-dark' htmlFor="id">Order Id</label>
                    <input className='form-control' type="text" name="id" value={data.id} disabled />
                  </div>
                  <div className="col-md-3">
                    <label className='text-dark' htmlFor="orderDate">Order Date</label>
                    <input className='form-control' type="text" name="orderDate" value={data.orderDate} disabled />
                  </div>
                  <div className="col-md-3">
                    <label className='text-dark' htmlFor="userid">User Id</label>
                    <input className='form-control' type="text" name="userid" value={data.userid} disabled />
                  </div>
                  <div className="col-md-3">
                    <label className='text-dark' htmlFor="name">Name</label>
                    <input className="form-control" type="text" name="name" value={localStorage.getItem("name")} disabled />
                  </div>

                </div>

                <div className="row mt-3">
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="orderStatus">Order Status</label>
                    <select onChange={getInput} className='form-select' name="orderStatus" value={data.orderStatus} >
                      <option value="Order placed">Order Placed</option>
                      <option value="Processing Order">Processing Order</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value={`Order arrived at ${shippingAddress.state} Hub`}>Order arrived at {shippingAddress.state} Hub</option>
                      <option value="Order Arrived at nearest delivery centre">Order Arrived at nearest delivery centre</option>
                      <option value="Order out for delivery">Order out for delivery</option>
                      <option value="Order delivered">Order delivered</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="paymentStatus">Payment Status</label>
                    <input className='form-control' type="text" name="paymentStatus" value={payment} disabled />
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="paymentMethod">Payment Method</label>
                    <input className='form-control' type="text" name="paymentMethod" value={data.paymentMethod} disabled />
                  </div>

                </div>

                <div className="row mt-3">
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="totalAmount">Total Amount</label>
                    <input className='form-control' type="text" name="totalAmount" value={data.totalAmount} disabled />
                  </div>
                  <div className="col-md-8">
                    <label className='text-dark' htmlFor="shippingAddress">Shipping Address</label>
                    <input className='form-control' type="text" name="shippingAddress" value={`${shippingAddress.address} ${shippingAddress.locality} ${shippingAddress.district} ${shippingAddress.state} ${shippingAddress.pincode}`}
                      disabled />
                  </div>


                </div>

                <div className="row mt-3 mx-1">
                  <h4 className='text-dark mt-2'>Items in the order</h4>

                  {productData.map((item, index) => {
                    return <div key={index} className="col-md-6 card rounded-0 mb-3">
                      <div className="card-body">


                        <div className="d-flex flex-column flex-xl-row gap-3">

                          <div className="product-img mb-2">
                            <Link to={`/shop/products/${item.id}`}>
                              <img
                                src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic[0]}`}
                                width={120}
                                alt={item.name}
                              />
                            </Link>
                          </div>

                          <div className="product-info flex-grow-1">
                            <h5 className="fw-bold mb-1">{item.name}</h5>
                            <p className="mb-0">{item.brand}</p>
                            <p className="mb-0">&#8377;{item.finalPrice}</p>

                            <div className="mt-3 hstack gap-2">
                              <button
                                type="button"
                                className="btn btn-sm border rounded-0"
                              >
                                Size : {item.size}
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm border rounded-0"
                              >
                                color : {item.color}
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm border rounded-0"
                              >
                                Qty : {item.quantity}
                              </button>
                            </div>


                          </div>


                        </div>

                      </div>
                    </div>
                  })}
                </div>
                <div className=" mt-3">

                  <button type='submit' className='btn btn-dark'>Update Order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
