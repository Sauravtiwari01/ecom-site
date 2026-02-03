import React, { useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { useDispatch, useSelector } from 'react-redux'
import { DeleteFAQ, GetFAQ } from '../../../Redux/ActionCreators/FAQActionCreator'

export default function AdminFAQPage() {
    let FAQStateData = useSelector(state=> state.FAQStateData)
    let Dispatch = useDispatch()
     function GetApiData() {
        Dispatch(GetFAQ())
        

        if (FAQStateData.length) {
            var t = setTimeout(() => {
                $("#MyTable").DataTable()
            }, 300)
            return t
        }


    }
     function DeleteFAQData(id) {
        if(confirm("Do you want to delete this FAQ?")){
            Dispatch(DeleteFAQ({id:id}))
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
                            <h5 className='bg-dark text-light text-center py-2 px-2'>FAQs <Link to="/admin/faq/create-faq"><i className='bi bi-plus float-end text-light'></i></Link></h5>
                            <div className="row">

                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="MyTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Question</th>
                                                    <th>Answer</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {console.log(FAQStateData)}
                                                {FAQStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.question}</td>
                                                        <td>{item.answer}</td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><button className='btn '><Link to={`/admin/faq/update/${item.id}`}><i className='btn btn-primary text-light bi bi-pencil' ></i></Link></button></td>
                                                        <td> <button className='btn ' onClick={() => { DeleteFAQData(item.id) }}><i className='btn btn-danger text-light bi bi-trash'></i></button></td>


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
