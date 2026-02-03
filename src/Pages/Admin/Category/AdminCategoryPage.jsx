import React, { useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { useDispatch, useSelector } from 'react-redux'
import { DeleteCategory, GetCategory } from '../../../Redux/ActionCreators/CategoryActionCreator'

export default function AdminCategoryPage() {
    let CategoryStateData = useSelector(state=> state.CategoryStateData)
    let Dispatch = useDispatch()
     function GetApiData() {
        Dispatch(GetCategory())
        

        if (CategoryStateData.length) {
            var t = setTimeout(() => {
                $("#MyTable").DataTable()
            }, 300)
            return t
        }


    }
     function DeleteCategoryData(id) {
        if(confirm("Do you want to delete this category?")){
            Dispatch(DeleteCategory({id:id}))
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
                            <h5 className='bg-dark text-light text-center py-2 px-2'>Category <Link to="/admin/category/create-category"><i className='bi bi-plus float-end text-light'></i></Link></h5>
                            <div className="row">

                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="MyTable">
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
                                                    {console.log(CategoryStateData)}
                                                {CategoryStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td><Link to={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} target="_blank"><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`} height={50} width={50} /></Link></td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><button className='btn '><Link to={`/admin/category/update/${item.id}`}><i className='btn btn-primary text-light bi bi-pencil' ></i></Link></button></td>
                                                        <td> <button className='btn ' onClick={() => { DeleteCategoryData(item.id) }}><i className='btn btn-danger text-light bi bi-trash'></i></button></td>


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
