import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreateSetting, GetSetting, UpdateSetting } from '../../../Redux/ActionCreators/SettingActionCreator'
export default function AdminSettingPage() {

    let [data, setData] = useState({
        map1: "",
        map2: "",
        email: "",
        address: "",
        phone: "",
        whatsapp: "",
        facebook: "",
        instagram: "",
        twitter: ""
    })

    let settingStateData = useSelector(state => state.settingStateData)
    let Dispatch = useDispatch()
    let navigate = useNavigate()
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.value
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault(e)
        if (settingStateData.length)
            Dispatch(UpdateSetting({ ...data }))

        else
            Dispatch(CreateSetting({ ...data }))
        alert("Settings updated!")
        navigate("/admin/settings")


    }


   useEffect(() => {
        Dispatch(GetSetting())  // Fetch once
    }, [])

    useEffect(() => {
        if (settingStateData.length)
            setData(old => ({ ...old, ...settingStateData[0] }))
    }, [settingStateData])

    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='text-light text-center bg-dark p-2'>Site Setting</h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='col-12 mb-3'>
                                        <label>GoogleMapURL*</label>
                                        <input type="url" placeholder="Google Map Link" name="map1" onChange={getInputData} className='form-control border-dark' value={data.map1} />

                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>GoogleMapURL*2</label>
                                        <input type="url" placeholder="Google Map Link" name="map2" onChange={getInputData} value={data.map2} className='form-control border-dark' />

                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Address*</label>
                                        <textarea placeholder="Address" value={data.address} rows={3} name="address" onChange={getInputData} className='border-dark form-control' />

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label>Phone*</label>
                                            <input type="text" placeholder="Contact Number" name="phone" onChange={getInputData} value={data.phone} className='border-dark form-control' />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Email*</label>
                                            <input type="email" placeholder="Email" name="email" onChange={getInputData} value={data.email} className='border-dark form-control' />
                                        </div>
                                        <div className="col-md-4">
                                            <label>WhatsApp*</label>
                                            <input type="text" placeholder="WhatsApp Numbe" name="whatsapp" onChange={getInputData} value={data.whatsapp} className='border-dark form-control' />
                                        </div>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Facebook Profile Page Link*</label>
                                        <input type="url" placeholder="Facebook Profile Page Link" value={data.facebook} name="facebook" onChange={getInputData} className='border-dark form-control' />

                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Twitter Profile Page Link*</label>
                                        <input type="url" placeholder="Twitter Profile Page Link" value={data.twitter} name="twitter" onChange={getInputData} className='border-dark form-control' />

                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Instagram Profile Page Link*</label>
                                        <input type="url" placeholder="Instagram Profile Page Link" value={data.instagram} name="instagram" onChange={getInputData} className='border-dark form-control' />

                                    </div>


                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Save Setting</button>
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
