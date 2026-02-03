import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { GetBrand, UpdateBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
export default function AdminUpdateBrandPage() {


    let brandStateData = useSelector(state => state.brandStateData)
    let Dispatch = useDispatch()
    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let { id } = useParams()
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? "/brands/" + e.target.files[0].name : e.target.value
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

    async function postData(e) {
        e.preventDefault(e)
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            let item = brandStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Brand Already Exists"
                    }
                })

                return
            }
            Dispatch(UpdateBrand({ ...data }))
            navigate('/admin/brands')



        }

    }
     function getApiData() {
        
        Dispatch(GetBrand())
        if(brandStateData.length){
            let item = brandStateData.find(x=> x.id === id)
            if(item){
          setData({...data,...item})
        }
         else{
          navigate("/admin/brands")
        }
        }
        

    }
    useEffect(() => { getApiData() }, [brandStateData.length])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='text-light text-center bg-dark p-2'>Update Brand <Link to="/admin/brands"><i className='float-end text-light bi bi-arrow-left'></i></Link>
                            </h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className="mb-3">
                                        <label htmlFor="Bname">Brand Name</label>
                                        <input type="text" value={data.name} name="name" id="" placeholder='Brand Name' className={`form-control ${show && errorMessage.name ? "border-danger" : 'border-dark'}`} onChange={getInputData} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="pic">Brand Logo</label>
                                            <input type="file" name="pic" id="" className={`form-control ${show && errorMessage.pic ? 'border-danger' : "border-dark"}`} onChange={getInputData} />
                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="active">Active Status</label>
                                            <select name="active" value={data.active ? "1" : "0"} id="" className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button type='submit' className='btn btn-dark text-light mt-3'>Update Brand</button>
                                        </div>
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
