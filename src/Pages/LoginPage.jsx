import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import FormValidators from '../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser } from '../Redux/ActionCreators/UserActionCreator'

import db from "../data/data.json"

export default function LoginPage() {
  let userStateData = db.user

  let [user, setUser] = useState({
    userName: "",
    pwd: ""
  })
  let [errorMessage, setErrorMessage] = useState({
    userName: "",
    pwd: "", err: ""
  })
  let [show, setShow] = useState(false)
  function getUserInput(e) {
    let { name, value } = e.target
    setUser((old) => {
      return {
        ...old,
        [name]: value
      }
    })

  }
  let dispatch = useDispatch()
  let navigate = useNavigate()
  async function postUserInput(e) {
    setShow(false)
    setErrorMessage({
      userName: "",
      pwd: "", err: ""
    })
    e.preventDefault()
    if (!user.userName) {
      setShow(true)
      setErrorMessage((old) => {
        return {
          ...old,
          userName: "Enter UserName"
        }
      })
    } else if (!user.pwd) {
      setShow(true)
      setErrorMessage((old) => {
        return {
          ...old,
          pwd: "Enter Password"
        }
      })
    } else {
      let item = userStateData.find(x => x.userName?.toLowerCase() === user.userName.toLowerCase() || x.email?.toLowerCase() === user.userName.toLowerCase())
      if (item) {
        if (item.active === true) {
          if (item.pwd === user.pwd) {
            localStorage.setItem("login", true)
            localStorage.setItem("userid", item.id)
            localStorage.setItem("name", item.name)
            localStorage.setItem("role", item.role)
            if (item.role === "Buyer")
              navigate("/profile")
            else
              navigate("/admin")

          } else {
            setShow(true)
            setErrorMessage((old) => {
              return {
                ...old,
                err: "Username or Password is invalid"
              }
            })
          }
        } else {
          setShow(true)
          setErrorMessage((old) => {
            return {
              ...old,
              err: "Your acoount has been blocked"
            }
          })
        }

      }
      else {
        setShow(true)
        setErrorMessage((old) => {
          return {
            ...old,
            err: "Username/Email does not exist"
          }
        })
      }
    }

  }

  useEffect(() => { dispatch(GetUser()) }, [])

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Login" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">User Login</h4>
                    <hr />
                    <p className="mb-2">Join / Sign In using</p>
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
                    <form onSubmit={postUserInput}>
                      <div className="row g-4">
                        <div className="col-12">
                          <label className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            name='userName' onChange={getUserInput}
                            id="userName"
                            className={`form-control rounded-0 ${show && errorMessage.userName ? "border-danger" : ""}`}
                          />
                          {show && errorMessage.userName ? <p className='text-danger'>{errorMessage.userName}</p> : null}
                        </div>
                        <div className="col-12">
                          <label className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className={`form-control rounded-0 ${show && errorMessage.pwd ? "border-danger" : ""}`}
                            onChange={getUserInput} name='pwd'
                            id="pwd"
                          />{show && errorMessage.pwd ? <p className='text-danger'>{errorMessage.pwd}</p> : null}
                        </div>

                        <div className="col-12">
                          <a
                            href="javascript:;"
                            className="text-content btn bg-light rounded-0 w-100"
                          >
                            <i className="bi bi-lock me-2" />
                            Forgot Password
                          </a>
                        </div>
                        <div className="col-12">{show && errorMessage.err ? <p className='text-danger'>{errorMessage.err}</p> : null}
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-danger">
                              Sign Up
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
