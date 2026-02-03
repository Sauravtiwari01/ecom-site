import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteBrand, GetBrand } from '../../../Redux/ActionCreators/BrandActionCreator'

// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

export default function AdminBrandPage() {
    let brandStateData = useSelector(state => state.brandStateData)
    let Dispatch = useDispatch()
    function getApiData() {
        Dispatch(GetBrand())
        if (brandStateData.length) {
            var t = setTimeout(() => {
                $("#MyTable").DataTable()
            }, 300)
            return t
        }

    }
    function deleteApiData(id) {
        if (confirm("Are you sure??")) {
            Dispatch(DeleteBrand({ id: id }))
            getApiData()

        }
    }
        useEffect(() => {
            let time = getApiData()
            return () => clearTimeout(time)
        }, [])
        return (
            <>
                <div className="page-content">
                    <div className="container-fluid my-4">
                        <div className="row">
                            <div className="col-md-2"><AdminSidebar /></div>
                            <div className="col-md-10">
                                <h5 className='bg-dark text-light text-center p-2'>Brands <Link to="/admin/brands/create-brand"><i className='float-end text-light bi bi-plus'></i></Link></h5>
                                <div className="row">
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Pic</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brandStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td><Link to={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} ><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} height={50} width={50} alt="" /></Link></td>
                                                        <td>{item.active ? "yes" : "No"}</td>
                                                        <td><Link to={`/admin/brands/update/${item.id}`}><i className='btn btn-primary bi bi-pencil-square'></i></Link></td>
                                                        <td><button onClick={() => deleteApiData(item.id)}><i className='btn btn-danger bi bi-trash'></i></button></td>
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
            </>
        )
    
}