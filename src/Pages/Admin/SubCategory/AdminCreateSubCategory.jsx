import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../../Components/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { CreateSubCategory, GetSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminCreateSubCategory() {

    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Sub Category Name is Mandatory",
        pic: "Sub Category Pic is Mandatory"
    })
    let [show, setShow] = useState(false)

    function GetInputData(e) {
        let name = e.target.name
        let value = e.target.files ? "/subcategory/" + e.target.files[0].name : e.target.value
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
    async function PostData(e) {
        e.preventDefault(e)
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error) {
            setShow(true)
        }
        else {
            let item = SubCategoryStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Sub Category Already Exists"
                    }
                })
                return
            }
            Dispatch(CreateSubCategory({ ...data }))
            navigate('/admin/sub-category')
        }
    }
    
    let SubCategoryStateData  = useSelector(state=>state.CategoryStateData)
    let Dispatch = useDispatch()
     function GetApiData() {
        Dispatch(GetSubCategory())
    }
    useEffect(() => { GetApiData() }, [SubCategoryStateData.length])

    return (
        <>
            <div className='page-content'>
                <div className='container-fluid my-4'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <AdminSidebar />
                        </div>
                        <div className='col-md-10'>
                            <h5 className='bg-dark text-light text-center p-2'>Create Sub-Category <Link to="/admin/sub-category"><i className='bi bi-arrow-left float-end text-light'></i></Link></h5>
                            <div className='row'>
                                <form onSubmit={PostData}>
                                    <div className='mb-3'>
                                        <label htmlFor="SCname">Sub Category Name</label>
                                        <input type="text" name="name" id="name" placeholder='Sub Category Name' onChange={GetInputData} className={`form-control ${show && errorMessage.name ? "border-danger" : "border-dark"}`} />
                                        {show && errorMessage.name ? <p className='text-danger border-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="pic">Sub Category Picture</label>
                                            <input type="file" name="pic" id="pic" placeholder='Sub Category Picture' onChange={GetInputData} className={`form-control ${show && errorMessage.pic ? "border-danger" : "border-dark"}`} />
                                            {show && errorMessage.pic ? <p className='text-danger  border-danger'>{errorMessage.pic}</p> : ""}
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <label htmlFor="active">Sub Category Status</label>
                                            <select name="active" id="" onChange={GetInputData} className='form-select'>
                                                <option value="1">yes</option>
                                                <option value="0">No</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className='btn btn-dark text-light mt-3'>Create Sub Category</button>
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
