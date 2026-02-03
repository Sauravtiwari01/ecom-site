import React, { useState } from 'react'
import AdminSidebar from '../../../Components/AdminSidebar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import db from "../../../data/data.json"
// For DataTable
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';

import { useDispatch, useSelector } from 'react-redux'
import { DeleteProduct, GetProduct } from '../../../Redux/ActionCreators/ProductActionCreator'

export default function AdminProductPage() {
    // let ProductStateData = useSelector(state => state.ProductStateData)
    let ProductStateData = db.products
    let Dispatch = useDispatch()
    function GetApiData() {
        Dispatch(GetProduct())


        if (ProductStateData.length) {
            var t = setTimeout(() => {
                $("#MyTable").DataTable()
            }, 300)
            return t
        }


    }
    function DeleteProductData(id) {
        if (confirm("Do you want to delete this Product?")) {
            Dispatch(DeleteProduct({ id: id }))
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
                            <h5 className='bg-dark text-light text-center py-2 px-2'>Product <Link to="/admin/products/create-product"><i className='bi bi-plus float-end text-light'></i></Link></h5>
                            <div className="row">

                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="MyTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Pic</th>
                                                    <th>Category</th>
                                                    <th>Sub Category</th>
                                                    <th>Brand</th>
                                                    <th>Description</th>
                                                    <th>Base Price</th>
                                                    <th>Discount</th>
                                                    <th>Final Price</th>
                                                    <th>Stock</th>
                                                    <th>Stock Quantity</th>
                                                    <th>Color</th>
                                                    <th>Size</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {console.log(ProductStateData)}
                                                {ProductStateData.map(item => {
                                                    return <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>

                                                        <td >
                                                           <div style={{width:'200px'}}>
                                                           {item.pic.map((p) => { return <Link key={p} to={`${import.meta.env.VITE_SITE_IMG_SERVER}${p}`} target="_blank"><img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${p}`} height={50} width={50} style={{marginRight:'10px',marginBottom:'10px'}} /></Link> })}
                                                           </div>



                                                        </td>


                                                        <td>{item.category}</td>
                                                        <td>{item.SubCategory}</td>
                                                        <td>{item.brand}</td>
                                                        <td dangerouslySetInnerHTML={{ __html: item.productDescription }}></td>
                                                        <td>&#8377;{item.basePrice}</td>
                                                        <td>{item.discount}%</td>
                                                        <td>&#8377;{item.finalPrice}</td>
                                                        <td>{item.stock ? "Yes" : "No"}</td>
                                                        <td>{item.stockQuantity}</td>
                                                        <td>{item.color.join().toUpperCase()}</td>
                                                        <td>{item.size.join().toUpperCase()}</td>
                                                        <td>{item.active ? "Yes" : "No"}</td>
                                                        <td><button className='btn '><Link to={`/admin/products/update/${item.id}`}><i className='btn btn-primary text-light bi bi-pencil' ></i></Link></button></td>
                                                        <td> <button className='btn ' onClick={() => { DeleteProductData(item.id) }}><i className='btn btn-danger text-light bi bi-trash'></i></button></td>


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
