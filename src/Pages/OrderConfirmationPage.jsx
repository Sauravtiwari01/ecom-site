import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GetOrder } from '../Redux/ActionCreators/OrderActionCreator'

export default function OrderConfirmationPage() {
    let orderStateData = useSelector(state => state.orderStateData)
    let dispatch = useDispatch()
    let [data, setData] = useState([])
    let [order, setOrder] = useState([])

    useEffect(() => { dispatch(GetOrder()) }, [])
    useEffect(() => {
        if (orderStateData.length) {
            setData(orderStateData.filter(x => x.userid === localStorage.getItem("userid")))
        }
        if(data.length){
            setOrder(data.at(-1))
        }
    }, [orderStateData])
    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    {/*start breadcrumb*/}
                    <section className="py-3 border-bottom border-top d-none d-md-flex bg-light">
                        <div className="container">
                            <div className="page-breadcrumb d-flex align-items-center">
                                <h3 className="breadcrumb-title pt-3 pe-3">Order Successful</h3>
                            </div>
                        </div>
                    </section>
                    {/*end breadcrumb*/}
                    {/*start shop cart*/}
                    <section className="py-4">
                        <div className="container">
                            <div className="card py-3 mt-sm-3">
                                <div className="card-body text-center">
                                    <h2 className="h4 pb-3">Thank you for your order!</h2>
                                    <p className="fs-sm mb-2">
                                        Your order has been placed and will be processed as soon as
                                        possible.
                                    </p>
                                    <p className="fs-sm mb-2">
                                        Make sure you make note of your ORDER ID{" "}
                                        <span className="fw-medium">{order.id}.</span>
                                    </p>
                                    <p className="fs-sm">
                                        You will be receiving an email shortly with confirmation of your
                                        order. 
                                    </p>
                                    <Link
                                        className="btn btn-light rounded-0 mt-3 me-3"
                                        to="/shop"
                                    >
                                        Go back shopping
                                    </Link>
                                    <Link
                                        className="btn btn-dark rounded-0 mt-3"
                                        to="/orders"
                                    >
                                        <i className="bx bx-map" />
                                        Track order
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*end shop cart*/}
                </div>
            </div>
            {/*end page wrapper */}
        </>

    )
}
