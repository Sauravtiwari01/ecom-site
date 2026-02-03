import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../../Components/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { CreateFeature, GetFeature } from '../../../Redux/ActionCreators/FeatureActionCreator'

export default function AdminCreateFeaturePage() {

    let [data, setData] = useState({
        name: "",
        icon: "",
        description: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Feature Name is Mandatory",
        icon: "Icon is Mandatory",
        description: "Description is mandatory"
    })
    let [show, setShow] = useState(false)
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let Dispatch = useDispatch()
    function GetInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidators(e)
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
            let item = FeatureStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Feature Already Exists"
                    }
                })
                return
            }
            Dispatch(CreateFeature({ ...data }))
            navigate('/admin/feature')

        }
    }


    function GetApiData() {
        Dispatch(GetFeature())
    }
    useEffect(() => { GetApiData() }, [FeatureStateData.length])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2 px-2'> Create Feature <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label htmlFor="CName">Feature Name*</label>
                                        <input type="text" name="name" id="name" placeholder=' Feature Name' onChange={GetInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="CName">Feature Description*</label>
                                        <textarea rows={4} name="description" id="desc" placeholder=' Feature Description' onChange={GetInputData} className={`form-control ${show && errorMessage.description ? 'border-danger' : 'border-dark'}`}></textarea>
                                        {show && errorMessage.description ? <p className='text-danger'>{errorMessage.description}</p> : null}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="pic">Feature Icon*</label>
                                            <input type="text" name="icon" id="pic" onChange={GetInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
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
                                        <button type="submit" className='my-3 btn btn-dark'>Create Feature</button>
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
