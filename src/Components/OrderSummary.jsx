import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary({bagTotal,totalAmount,button,delivery,totalDiscount}) {
    let navigate = useNavigate()
  return (
    <>
    
                <div className="card rounded-0 mb-3">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">Order Summary</h5>
                    <div className="hstack align-items-center justify-content-between">
                      <p className="mb-0">Bag Total</p>
                      <p className="mb-0">&#8377;{bagTotal}</p>   
                    </div>
                    <hr />
                    <div className="hstack align-items-center justify-content-between">
                      <p className="mb-0">Bag discount</p>
                      <p className="mb-0 text-success">- &#8377;{totalDiscount}</p>
                    </div>
                    <hr />
                    <div className="hstack align-items-center justify-content-between">
                      <p className="mb-0">Delivery</p>
                      <p className="mb-0">&#8377;{delivery}</p>
                    </div>
                    <hr />
                    <div className="hstack align-items-center justify-content-between fw-bold text-content">
                      <p className="mb-0">Total Amount</p>
                      <p className="mb-0">&#8377;{totalAmount + delivery}</p>
                    </div>
                    <div className="d-grid mt-4">
                      <button
                        type="button"
                        onClick={()=>{navigate('/cart/checkout')}}
                        className="btn btn-dark btn-ecomm py-3 px-5"
                      >
                        {button}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card rounded-0">
                  <div className="card-body">
                    <h5 className="fw-bold mb-4">Apply Coupon</h5>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="Enter coupon code"
                      />
                      <button
                        className="btn btn-dark btn-ecomm rounded-0"
                        type="button"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              
    </>
  )
}
