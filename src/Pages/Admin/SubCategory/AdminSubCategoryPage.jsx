import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link } from 'react-router-dom'

//for datatable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { useDispatch, useSelector } from 'react-redux';
import { DeleteSubCategory, GetSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator';

export default function AdminSubCategoryPage() {
    let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
    let Dispatch = useDispatch()
    function GetApiData() {
        Dispatch(GetSubCategory())

        if (SubCategoryStateData.length) {
            var t = setTimeout(() => {
                $("#MyTable").DataTable()
            }, 300)
            return t
        }

    }

    function DeleteApiData(id) {
        if (confirm("Are you sure ?")) {
            Dispatch(DeleteSubCategory({ id: id }))
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
                            <h5 className='bg-dark text-light text-center py-2 px-2'>Sub-Category <Link to="/admin/sub-category/create-sub-category"><i className='bi bi-plus float-end text-light'></i></Link></h5>
                            <div className="row">

                                <div className='table-responsive'>
                                    <table className='table table-bordered' id='MyTable'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>PIC</th>
                                                <th>ACTIVE</th>
                                                <th>EDIT</th>
                                                <th>DELETE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SubCategoryStateData.map((item) => {
                                                return <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td><Link to={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} target='_blank'><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} width={50} height={50} alt="" target='_blank' /></Link></td>
                                                    <td>{item.active ? "yes" : "No"}</td>
                                                    <td><button className='btn'><Link to={`/admin/sub-category/update/${item.id}`}><i className='btn btn-primary bi bi-pencil-square'></i></Link></button></td>
                                                    <td><button className='btn' onClick={() => DeleteApiData(item.id)}><i className='btn btn-danger bi bi-trash'></i></button></td>


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
