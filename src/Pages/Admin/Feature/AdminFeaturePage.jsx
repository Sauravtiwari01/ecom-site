import React, { useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { useDispatch, useSelector } from 'react-redux'
import { DeleteFeature, GetFeature } from '../../../Redux/ActionCreators/FeatureActionCreator'

export default function AdminFeaturePage() {
    let FeatureStateData = useSelector(state=> state.FeatureStateData)
    let Dispatch = useDispatch()
     function GetApiData() {
        Dispatch(GetFeature())
        

        // if (FeatureStateData.length) {
        //     var t = setTimeout(() => {
        //         $("#MyTable").DataTable()
        //     }, 300)
        //     return t
        // }


    }
     function DeleteFeatureData(id) {
        if(confirm("Do you want to delete this Feature?")){
            Dispatch(DeleteFeature({id:id}))
        GetApiData()
        }
    }
    useEffect(() => {
        let time = GetApiData()
        return () => clearTimeout(time)
    }, [])


    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2 px-2'>Feature <Link to="/admin/feature/create-feature"><i className='bi bi-plus float-end text-light'></i></Link></h5>
                            <div className="row">

                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="MyTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Icon</th>
                                                    <th>Description</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {console.log(FeatureStateData)}
                                                {FeatureStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td><span dangerouslySetInnerHTML={{__html:item.icon}} ></span></td>
                                                        <td>{item.description}</td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><button className='btn '><Link to={`/admin/feature/update/${item.id}`}><i className='btn btn-primary text-light bi bi-pencil' ></i></Link></button></td>
                                                        <td> <button className='btn ' onClick={() => { DeleteFeatureData(item.id) }}><i className='btn btn-danger text-light bi bi-trash'></i></button></td>


                                                    </tr>
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
