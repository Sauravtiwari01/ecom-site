import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../../Components/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCategory, GetCategory } from '../../../Redux/ActionCreators/CategoryActionCreator'

export default function AdminCreateCategoryPage() {

    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Category Name is Mandatory",
        pic: "Picture is Mandatory"
    })
    let [show, setShow] = useState(false)
    let CategoryStateData = useSelector(state => state.CategoryStateData)
    let Dispatch = useDispatch()
    function GetInputData(e) {
        let name = e.target.name
        let value = e.target.files ? "/category/" + e.target.files[0].name : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidators(e) : FormValidators(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value

            }
        })
    }
    let navigate = useNavigate()
    function postData(e) {
        e.preventDefault(e)
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = CategoryStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Category Already Exists"
                    }
                })
                return
            }
            Dispatch(CreateCategory({ ...data }))
            navigate('/admin/category')

        }
    }


    function GetApiData() {
        Dispatch(GetCategory())
    }
    useEffect(() => { GetApiData() }, [CategoryStateData.length])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2 px-2'> Create Category <Link to="/admin/category"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label htmlFor="CName">Category Name*</label>
                                        <input type="text" name="name" id="name" placeholder=' Category Name' onChange={GetInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="pic">Category Picture*</label>
                                            <input type="file" name="pic" id="pic" onChange={GetInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="active">Active</label>
                                            <select name="active" className='form-select' onChange={GetInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className='my-3 btn btn-dark'>Create Category</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
