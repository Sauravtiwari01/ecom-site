import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetUser, UpdateUser } from '../../../Redux/ActionCreators/UserActionCreator'
import { useNavigate, useParams } from 'react-router-dom'
import FormValidators from '../../../Validators/FormValidators'


export default function AdminManageUsersPage() {
  let userStateData = useSelector((state) => state.userStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    pwd: "",
    active: true
  })
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    pwd: ""
  })
  let { id } = useParams()
  let [show, setShow] = useState(false)
  function getInput(e) {
    let { name, value } = e.target

    setData((old) => {
      return {
        ...old,
        [name]: name === "role" ? value === "Admin" ? "Admin" : "Buyer" : value,
        [name]: name === "active" ? value === "true" ? true : false : value
      }
    })
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidators(e)
      }
    })
  }

  function postInput(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error) {
      setShow(true)
      console.log(error)
    } else {
      console.log("update")
      setShow(false)
      dispatch(UpdateUser({ ...data }))
      navigate('/admin/users')
    }
  }

  useEffect(() => {
    dispatch(GetUser())
  }, [])
  useEffect(() => {

    if (userStateData.length) {
      let item = userStateData.find(x => x.id === id)
      setData({ ...item })
    }
  }, [userStateData])
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row my-4">
            <div className="col-md-2"><AdminSidebar /></div>
            <div className="col-md-10">
              <h5 className='text-center bg-dark text-light py-2'>Manage User</h5>
              <form onSubmit={postInput}>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="id">UserId</label>
                    <input className='form-control' type="text" name="id" value={data.id} disabled />
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="name">Name</label>
                    <input onChange={getInput} className={`form-control ${show ? "border-danger" : "border-dark"}`} type="text" name="name" value={data.name} />
                    {show ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="userName">UserName</label>
                    <input onChange={getInput} className={`form-control ${show ? "border-danger" : "border-dark"}`} type="text" name="userName" value={data.userName} />
                    {show ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>

                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className='text-dark' htmlFor="mobile">Mobile Number</label>
                    <input onChange={getInput} className={`form-control ${show ? "border-danger" : "border-dark"}`} type="text" name="mobile" value={data.mobile} />
                    {show ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>
                  <div className="col-md-6">
                    <label className='text-dark' htmlFor="email">Email</label>
                    <input onChange={getInput} className={`form-control ${show ? "border-danger" : "border-dark"}`} type="text" name="email" value={data.email} />
                    {show ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>

                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="pwd">User Password</label>
                    <input onChange={getInput} className={`form-control ${show ? "border-danger" : "border-dark"}`} type="text" name="pwd" value={data.pwd} />
                    {show ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="role">User Role</label>
                    <select onChange={getInput} className='form-select' name="role" value={data.role} >
                      <option value="Admin">Admin</option>
                      <option value="Buyer">Buyer</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className='text-dark' htmlFor="active">Active</label>
                    <select onChange={getInput} className='form-select' name="active" value={data.active} >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                </div>
                <div className=" mt-3">

                  <button type='submit' className='btn btn-dark'>Update User Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
