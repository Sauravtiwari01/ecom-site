import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ item }) {
    return (
        <>

            <div className="card">
                <div className="position-relative overflow-hidden">
                    <div className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
                        <Link to="javascript:;">
                            <i className="bi bi-heart" />
                        </Link>
                        <Link to="javascript:;">
                            <i className="bi bi-basket3" />
                        </Link>
                        <Link
                            to="javascript:;"
                            data-bs-toggle="modal"
                            data-bs-target="#QuickViewModal"
                        >
                            <i className="bi bi-zoom-in" />
                        </Link>
                    </div>
                    <Link to={`/shop/products/${item.id}`}>
                        <img
                            src={`${item.pic[0]}`}
                            className="card-img-top"
                            alt="..."
                        />
                    </Link>
                </div>

                <Link to={`/shop/products/${item.id}`}>
                    <div className="card-body ">
                        <div className="product-info text-center">
                            <h6 className="mb-1 fw-bold product-name">{item.name}</h6>
                            <div className="ratings mb-1 h6">
                                <i className="bi bi-star-fill text-warning" />
                                <i className="bi bi-star-fill text-warning" />
                                <i className="bi bi-star-fill text-warning" />
                                <i className="bi bi-star-fill text-warning" />
                                <i className="bi bi-star-fill text-warning" />
                            </div>
                            <p className="mb-0 h6 fw-bold product-price">&#8377;{item.finalPrice}&nbsp;<del className='text-danger'>{item.basePrice}</del>&nbsp;<sup>{item.discount}%</sup></p>
                        </div>
                    </div></Link>
            </div>
        </>
    )
}
