import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import BuyerSiderbar from '../Components/BuyerSiderbar'
import FormValidators from '../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser, UpdateUser } from '../Redux/ActionCreators/UserActionCreator'

export default function UpdateProfile() {
  let userStateData = useSelector((state) => state.userStateData)
  let [data, setData] = useState({
    gender: "",
    dob: "",

  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    mobile: "",
    email: ""

  })
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [show, setShow] = useState(false)
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

  function postUserInput(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      console.log("here")
    }
    else {

      let item = userStateData.find(x => x.id !== localStorage.getItem("userid") && x.email?.toLowerCase() === data.email.toLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage((old) => {
          return {
            ...old,
            "email": "Email Already in Use"
          }
        })
      }
      else {
        console.log("update")
        dispatch(UpdateUser({ id: localStorage.getItem("userid"), ...data }))
        navigate('/profile')
        localStorage.setItem("name", data.name)
      }
      alert("Profile Updated")
      dispatch(GetUser())
    }
  }



  useEffect(() => {
    dispatch(GetUser())
    if (userStateData.length) {

      setData(userStateData.find(x => x.id === localStorage.getItem('userid')))
    }
  }, [userStateData.length])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Edit Profile" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Account - Edit Profile</h4>
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
              <div className="col-12 col-xl-7">
                <div className="card rounded-0">
                  <div className="card-body p-lg-5">
                    <h5 className="mb-0 fw-bold">Edit Details</h5>
                    <hr />
                    <form onSubmit={postUserInput}>
                      <div className="row row-cols-1 g-3">
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="name"
                              name='name'
                              placeholder="Name"
                              value={data.name} onChange={getUserInput}
                            />
                            <label htmlFor="name">Name</label>
                          </div>
                          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="mobile" name='mobile'
                              placeholder="Name" onChange={getUserInput}
                              value={`${data.mobile}`}
                            />
                            <label htmlFor="floatingInputNumber">
                              Mobile Number
                            </label>
                          </div>
                          {show && errorMessage.mobile ? <p className='text-danger'>{errorMessage.mobile}</p> : null}
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="email" name='email'
                              placeholder="Email"
                              value={data.email} onChange={getUserInput}
                            />
                            <label htmlFor="email">Email</label>
                          </div>
                          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                        </div>
                        <div className="col">
                          <div className="form-control">
                            <label className='form-label' htmlFor="gender">Gender</label>
                            <select value={data.gender} className="form-select" name="gender" id="" onChange={(e) => {
                              getUserInput(e)
                            }}>
                              <option value="N/A">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="prefer not to say">Prefer not to say</option>
                            </select>
                          </div>


                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="date"
                              className="form-control rounded-0" onChange={(e) => { getUserInput(e) }}
                              id="dob" name='dob' value={data.dob}
                            />
                            <label htmlFor="dob">Date of Birth</label>
                          </div>
                        </div>
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-dark py-3 btn-ecomm w-100"
                          >
                            Save Details
                          </button>
                        </div>
                        <div className="col">
                          <Link
                            to="/forget-password"
                            className="btn btn-outline-dark py-3 btn-ecomm w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#ChangePasswordModal"
                          >
                            Change Password
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
        {/* Change Password Modal */}
        <div className="modal" id="ChangePasswordModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-body">
                <h5 className="fw-bold mb-3">Change Password</h5>
                <hr />
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputOldPass"
                      placeholder="Old Password"
                    />
                    <label htmlFor="floatingInputOldPass">Old Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputNewPass"
                      placeholder="New Password"
                    />
                    <label htmlFor="floatingInputNewPass">New Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputConPass"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="floatingInputConPass">Confirm Password</label>
                  </div>
                  <div className="d-grid gap-3 w-100">
                    <button type="button" className="btn btn-dark py-3 btn-ecomm">
                      Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark py-3 btn-ecomm"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Change Password Modal */}
      </div>
      {/*end page content*/}
    </>

  )
}
