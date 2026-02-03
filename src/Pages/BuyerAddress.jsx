import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import BuyerSiderbar from '../Components/BuyerSiderbar'
import FormValidators from '../Validators/FormValidators'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreateAddress, DeleteAddress, GetAddress, UpdateAddress } from '../Redux/ActionCreators/AddressActionCreator'

import db from "../data/data.json"
export default function BuyerAddress() {
  let [defaultAddress, setDefaultAddress] = useState({})
  let [addresses, setAddresses] = useState({})
  let [editAddress, setEditAddress] = useState({})
  let addressStateData = db.address
  let [data, setData] = useState(
    {
      userid: localStorage.getItem("userid"),
      name: "",
      mobile: "",
      pincode: "",
      locality: "",
      district: "",
      address: "",
      state: ""
    }
  )

  let [errorMessage, setErrorMessage] = useState({
    name: "mandatory",
    mobile: "mandatory",
    pincode: "mandatory",
    locality: "mandatory",
    district: "mandatory",
    address: "mandatory",
    state: "mandatory"
  })
  let [show, setShow] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  function getUserInput(e) {
    let { name, value, } = e.target

    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidators(e)
      }
    })
  }

  function editUserInput(e) {
    let { name, value, } = e.target

    setEditAddress((old) => {
      return {
        ...old,
        [name]: value
      }
    })
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidators(e)
      }
    })

  }

  function updateAddress(e, id) {

    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      console.log(error)
    }
    else {
      setShow(false)
      setErrorMessage({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        district: "",
        address: "",
        state: ""
      })
      dispatch(UpdateAddress({ ...editAddress, id: id }))

      navigate('/address')
      document.querySelector('#EditAddress .btn-close').click();


    }
    getUserAddress()
  }


  function postUserInput(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      console.log(error)
    }
    else {
      setShow(false)
      setErrorMessage({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        district: "",
        address: "",
        state: ""
      })
      dispatch(CreateAddress({ ...data }))
      navigate('/address')
      document.querySelector('#NewAddress .btn-close').click();


    }
    getUserAddress()
  }

  function deleteUserAddress(id) {
    alert("Are you sure?")
    dispatch(DeleteAddress({ id: id }))
    getUserAddress()
  }
  function getUserAddress() {
    dispatch(GetAddress())
    setAddresses(addressStateData.filter(x => x.userid === localStorage.getItem("userid")))
    setDefaultAddress(addressStateData.find(x => x.userid === localStorage.getItem("userid")))

  }
  useEffect(() => { getUserAddress() }, [addressStateData.length])


  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Saved Address" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Account - Addresses</h4>
              </div>
            </div>
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>
            <div className="row">
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <BuyerSiderbar />
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-9">
                <div className="card rounded-0">
                  <div className="card-header bg-light">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-0">Saved Address</h5>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-ecomm"
                          data-bs-toggle="modal"
                          data-bs-target="#NewAddress"
                        >
                          <i className="bi bi-plus-lg me-2" />
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                  {addressStateData ? <div className="card-body">
                    {defaultAddress ? <div><h6 className="fw-bold mb-3 py-2 px-3 bg-light">
                      Default Address
                    </h6>
                      <div className="card rounded-0 mb-3">
                        <div className="card-body">
                          <div className="d-flex flex-column flex-xl-row gap-3">
                            <div className="address-info form-check flex-grow-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefaultAddress"
                                id="flexRadioDefaultAddress1"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefaultAddress1"
                              >
                                <span className="fw-bold mb-0 h5">{defaultAddress.name}</span>
                                <br />
                                {defaultAddress.address} {defaultAddress.locality}, {defaultAddress.district} <br />
                                {defaultAddress.state}, {defaultAddress.pincode}
                                <br />
                                Mobile:{" "}
                                <span className="text-dark fw-bold">
                                  {defaultAddress.mobile}
                                </span>
                              </label>
                            </div>
                            <div className="d-none d-xl-block vr" />
                            <div className="d-grid gap-2 align-self-start align-self-xl-center">
                              <button
                                type="button" onClick={() => { deleteUserAddress(localStorage.getItem('id')) }}
                                className="btn btn-outline-dark px-5 btn-ecomm"
                              >
                                Remove
                              </button>
                              <button
                                type="button" onClick={() => {
                                  setEditAddress(defaultAddress)
                                  setErrorMessage({
                                    name: "",
                                    mobile: "",
                                    pincode: "",
                                    locality: "",
                                    district: "",
                                    address: "",
                                    state: ""
                                  })
                                }}
                                className="btn btn-outline-dark px-5 btn-ecomm"
                                data-bs-toggle="modal"
                                data-bs-target="#EditAddress"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div></div> : null}
                    {addresses.length > 1 ? <div><h6 className="fw-bold mb-3 py-2 px-3 bg-light">
                      Other Address
                    </h6>

                      {addresses.slice(1).map((item, index) => {
                        return <div key={index} className="card rounded-0 mb-3">
                          <div className="card-body">
                            <div className="d-flex flex-column flex-xl-row gap-3">
                              <div className="address-info form-check flex-grow-1">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefaultAddress"
                                  id="flexRadioDefaultAddress2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefaultAddress2"
                                >
                                  <span className="fw-bold mb-0 h5">{item.name}</span>
                                  <br />
                                  {item.address}, {item.locality}, {item.district} <br />
                                  {item.state}, {item.pincode}
                                  <br />
                                  Mobile:{" "}
                                  <span className="text-dark fw-bold">
                                    {item.mobile}
                                  </span>
                                </label>
                              </div>
                              <div className="d-none d-xl-block vr" />
                              <div className="d-grid gap-2 align-self-start align-self-xl-center">
                                <button
                                  type="button" onClick={() => { deleteUserAddress(item.id) }}
                                  className="btn btn-outline-dark px-5 btn-ecomm"
                                >
                                  Remove
                                </button>
                                <button
                                  type="button" onClick={() => {
                                    setEditAddress(item)
                                    setErrorMessage({
                                      name: "",
                                      mobile: "",
                                      pincode: "",
                                      locality: "",
                                      district: "",
                                      address: "",
                                      state: ""
                                    })
                                  }}
                                  className="btn btn-outline-dark px-5 btn-ecomm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#EditAddress"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      })}
                    </div> : null}
                  </div> : null}
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
        {/* filter Modal */}
        <div className="modal" id="FilterOrders" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Filter Orders</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <h6 className="mb-3 fw-bold">Status</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      On the way
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                      Delivered
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault4"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                      Cancelled
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault5"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault5">
                      Returned
                    </label>
                  </div>
                </div>
                <hr />
                <h6 className="mb-3 fw-bold">Time</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault6"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault6">
                      Anytime
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault7"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault7">
                      Last 30 days
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault8"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault8">
                      Last 6 months
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault9"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault9">
                      Last year
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex align-items-center gap-3 w-100">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-ecomm w-50"
                  >
                    Clear Filters
                  </button>
                  <button type="button" className="btn btn-dark btn-ecomm w-50">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Filters Modal */}

      </div>
      {/*end page content*/}
      <div className="modal" id="NewAddress" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add New Address</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="">
                <h6 className="fw-bold mb-3">Contact Details</h6>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingName" name='name' onChange={getUserInput}
                    placeholder="Name"
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingMobileNo" name='mobile' onChange={getUserInput}
                    placeholder="Mobile No"
                  />
                  <label htmlFor="floatingMobileNo">Mobile No</label>
                </div>{show && errorMessage.mobile ? <p className='text-danger'>{errorMessage.mobile}</p> : null}
              </div>
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Address</h6>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingPinCode" name='pincode' onChange={getUserInput}
                    placeholder="Pin Code"
                  />
                  <label htmlFor="floatingPinCode">Pin Code</label>
                </div>{show && errorMessage.pincode ? <p className='text-danger'>{errorMessage.pincode}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingAddress" name='address' onChange={getUserInput}
                    placeholder="Address (House No, Building, Street, Area)"
                  />
                  <label htmlFor="floatingAddress">Address</label>
                </div>{show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingLocalityTown" name='locality' onChange={getUserInput}
                    placeholder="Locality/Town"
                  />
                  <label htmlFor="floatingLocalityTown">Locality / Town</label>
                </div>
                {show && errorMessage.locality ? <p className='text-danger'>{errorMessage.locality}</p> : null}
                <div className="row">
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="floatingCity" name='district' onChange={getUserInput}
                        placeholder="City / District"
                      />
                      <label htmlFor="floatingAddress">City / District</label>
                    </div>{show && errorMessage.district ? <p className='text-danger'>{errorMessage.district}</p> : null}
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="floatingState" name='state' onChange={getUserInput}
                        placeholder="State"
                      />
                      <label htmlFor="floatingState">State</label>
                    </div>{show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-grid w-100">
                <button type="button" onClick={postUserInput} className="btn btn-dark py-3 px-5 btn-ecomm">
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end New Address Modal */}

      {/* Edit Address Modal */}
      <div className="modal" id="EditAddress" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Edit Address</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="">
                <h6 className="fw-bold mb-3">Contact Details</h6>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingName" name='name' onChange={editUserInput}
                    placeholder="Name" value={editAddress.name}
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingMobileNo" name='mobile' onChange={editUserInput}
                    placeholder="Mobile No" value={editAddress.mobile}
                  />
                  <label htmlFor="floatingMobileNo">Mobile No</label>
                </div>{show && errorMessage.mobile ? <p className='text-danger'>{errorMessage.mobile}</p> : null}
              </div>
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Address</h6>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingPinCode" name='pincode' onChange={editUserInput}
                    placeholder="Pin Code" value={editAddress.pincode}
                  />
                  <label htmlFor="floatingPinCode">Pin Code</label>
                </div>{show && errorMessage.pincode ? <p className='text-danger'>{errorMessage.pincode}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingAddress" name='address' onChange={editUserInput}
                    placeholder="Address (House No, Building, Street, Area)" value={editAddress.address}
                  />
                  <label htmlFor="floatingAddress">Address</label>
                </div>{show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="floatingLocalityTown" name='locality' onChange={editUserInput}
                    placeholder="Locality/Town" value={editAddress.locality}
                  />
                  <label htmlFor="floatingLocalityTown">Locality / Town</label>
                </div>
                {show && errorMessage.locality ? <p className='text-danger'>{errorMessage.locality}</p> : null}
                <div className="row">
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="floatingCity" name='district' onChange={editUserInput}
                        placeholder="City / District" value={editAddress.district}
                      />
                      <label htmlFor="floatingAddress">City / District</label>
                    </div>{show && errorMessage.district ? <p className='text-danger'>{errorMessage.district}</p> : null}
                  </div>
                  <div className="col">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        id="floatingState" name='state' onChange={editUserInput}
                        placeholder="State" value={editAddress.state}
                      />
                      <label htmlFor="floatingState">State</label>
                    </div>{show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-grid w-100">
                <button type="button" onClick={(e) => {
                  updateAddress(e, editAddress.id)

                }} className="btn btn-dark py-3 px-5 btn-ecomm">
                  Update Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end Edit Address Modal */}
    </>


  )
}
