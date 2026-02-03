import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import FormValidators from '../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { CreateUser, GetUser } from '../Redux/ActionCreators/UserActionCreator'


export default function Signup() {
  let userStateData = useSelector((state) => state.userStateData)
  let [data, setData] = useState([])
  let [user, setUser] = useState({
    name: "",
    userName: "",
    mobile: "",
    email: "",
    pwd: "",
    tcCheck: false
  })

  let [errorMessage, setErrorMessage] = useState({
    name: " Name is Mandatory",
    userName: "userName is Mandatory",
    mobile: "mobile is Mandatory",
    email: "email is Mandatory",
    pwd: "password is Mandatory",
    tcCheck: "Please Accept T&C"
  })

  let [show, setShow] = useState(false)
  function getUserInput(e) {
    let { name, value, checked, type } = e.target
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: name === "tcCheck" ? (checked ? "" : errorMessage.tcCheck) : FormValidators(e)
      }
    })
    setUser((old) => {
      return {
        ...old,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  let navigate = useNavigate()
  let dispatch = useDispatch()

  function postUserInput(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find((x) => x !== "")
    console.log(error)
    if (error)
      setShow(true)
    else {

      let item = userStateData.find(x => x.userName?.toLowerCase() === user.userName.toLowerCase() || x.email?.toLowerCase() === user.email.toLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage((old) => {
          return {
            ...old,
            "userName": item.userName?.toLowerCase() === user.userName.toLowerCase() ? "UserName Already Taken" : "",
            "email": item.email?.toLowerCase() === user.email.toLowerCase() ? "Email Already in Use" : ""
          }
        })
      }
      else {
        let uid = Math.random().toString(36).slice(2,6).toUpperCase()
        dispatch(CreateUser({
          id:uid,
          name: user.name,
          userName: user.userName,
          mobile: user.mobile,
          email: user.email,
          pwd: user.pwd,
          role: "Buyer",
          active: true
        }))

        localStorage.setItem("login", true)
        localStorage.setItem("userid",uid )
        localStorage.setItem("name", user.name)
        localStorage.setItem("role", "Buyer")
        navigate("/profile")



      }

    }
  }

  useEffect(() => {
    dispatch(GetUser())
    if (userStateData.length) {
      setData(userStateData.find(x => x.email === user.email))
    }
  }, [userStateData.length])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="SignUp" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-5 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">Registration</h4>
                    <hr />
                    <p className="mb-2">Join / Sign Up using</p>
                    <div className="social-login mb-4">
                      <div className="row g-4">
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-facebook btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-facebook me-2" />
                            Facebook
                          </button>
                        </div>
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-pinterest btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-google me-2" />
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="separator mb-4">
                      <div className="line" />
                      <p className="mb-0 fw-bold">Or</p>
                      <div className="line" />
                    </div>
                    <form onSubmit={(e) => postUserInput(e)}>
                      <div className="row g-4">
                        <div className="col-6">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            onChange={getUserInput}
                            type="text" name='name'
                            className="form-control rounded-0"
                            id="name"
                          />
                          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label htmlFor="userName" className="form-label">
                            UserName
                          </label>
                          <input
                            onChange={getUserInput}
                            type="text" name='userName'
                            className="form-control rounded-0"
                            id="userName"
                          />
                          {show && errorMessage.userName ? <p className='text-danger'>{errorMessage.userName}</p> : ""}
                        </div>
                        <div className="col-12">
                          <label htmlFor="mobile" className="form-label">
                            Mobile
                          </label>
                          <input
                            onChange={getUserInput}
                            type="text" name='mobile'
                            className="form-control rounded-0"
                            id="mobile"
                          />
                          {show && errorMessage.mobile ? <p className='text-danger'>{errorMessage.mobile}</p> : ""}
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Email ID
                          </label>
                          <input
                            onChange={getUserInput}
                            type="text" name='email'
                            className="form-control rounded-0"
                            id="email"
                          />
                          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                        </div>
                        <div className="col-12">
                          <label htmlFor="pwd" className="form-label">
                            Password
                          </label>
                          <input
                            onChange={getUserInput}
                            type="text" name='pwd'
                            className="form-control rounded-0"
                            id="pwd "
                          />
                          {show && errorMessage.pwd ? <p className='text-danger'>{errorMessage.pwd}</p> : ""}
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox" onChange={getUserInput}
                              defaultValue="" name='tcCheck'
                              id="tcCheck"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="tcCheck"
                            >
                              I agree to Terms and Conditions
                            </label>
                          </div>
                          {show && errorMessage.tcCheck ? <p className='text-danger'>{errorMessage.tcCheck}</p> : ""}
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Already have an account?{" "}
                            <Link to="/login" className="text-danger">
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                      {/*-end row*/}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}
