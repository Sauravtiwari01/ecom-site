import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import OrderSummary from "../Components/OrderSummary";
import { useDispatch, useSelector } from 'react-redux'
import { GetCart, DeleteCart } from '../Redux/ActionCreators/CartActionCreator'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { CreateWishlist, GetWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import db from "../data/data.json"

export default function CartPage() {

  let cartStateData = db.cart
  let wishlistStateData = db.wishlist
  let [data, setData] = useState([])
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let {id} = useParams()
console.log(db.cart)
  function removeItem(id) {
    if (window.confirm("Are you sure?")) {
      dispatch(DeleteCart({ id: id }))
    }
  }
  const notify = (msg) => toast(msg);
  async function addToWishlist(id) {
    let item = wishlistStateData.find(x => x.id === id)
    if (!item) {
      let product = cartStateData.find(x => x.id === id)

      dispatch(CreateWishlist(product))
      dispatch(DeleteCart({ id: id }))
      dispatch(GetCart())
      notify("Product Added in Wishlist")
      console.log("get")
    }
    else {
      notify("Product Already in Wishlist")
      console.log("not")
    }
  }
  const totalAmount = data.reduce((acc, item) => { return acc + (item.finalPrice * item.quantity) }, 0)
  const bagTotal = data.reduce((acc, item) => { return acc + (item.basePrice * item.quantity) }, 0)
  const totalDiscount = data.reduce((acc, item) => { return acc + ((item.basePrice * item.quantity) - (item.finalPrice * item.quantity)) }, 0)
  const delivery = (totalAmount) => totalAmount >= 5000 ? 0 : 149


  useEffect(() => { dispatch(GetWishlist()) }, [])
  useEffect(() => {
    dispatch(GetCart())
    let item = cartStateData.filter(x => x.userid === localStorage.getItem("userid"))
    setData(item)
  }, [cartStateData.length])

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        {/*start product details*/}
        <Breadcrumb title="Cart" />
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">My Bag ({data.length} items)</h4>
              </div>
              <div className="ms-auto">
                <button type="button" onClick={() => { navigate("/shop") }} className="btn btn-light btn-ecomm">
                  Continue Shopping
                </button>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-xl-8">
                {data.map((item, index) => {


                  return <div key={index} className="card rounded-0 mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-column flex-lg-row gap-3">
                        <Link to={`/shop/products/${item.id}`}><div className="product-img">
                          <img
                            src={`${item.pic[0]}`}
                            width={150}
                            alt=""
                          />
                        </div></Link>

                        <div className="product-info flex-grow-1">
                          <h5 className="fw-bold mb-0">
                            {item.name}
                          </h5>
                          <div className="product-price d-flex align-items-center gap-2 mt-3">
                            <div className="h6 fw-bold">&#8377;{item.finalPrice}</div>
                            <div className="h6 fw-light text-muted text-decoration-line-through">
                              &#8377;{item.basePrice}
                            </div>
                            <div className="h6 fw-bold text-danger">({item.discount}% off)</div>
                          </div>
                          <div className="mt-3 hstack gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-light border rounded-0"
                              data-bs-toggle="modal"
                              data-bs-target="#SizeModal"
                            >
                              Color : {item.color}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-light border rounded-0"
                              data-bs-toggle="modal"
                              data-bs-target="#SizeModal"
                            >
                              Size : {item.size}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-light border rounded-0"
                              data-bs-toggle="modal"
                              data-bs-target="#QtyModal"
                            >
                              Qty : {item.quantity}
                            </button>
                          </div>
                        </div>
                        <div className="d-none d-lg-block vr" />
                        <div className="d-grid gap-2 align-self-start align-self-lg-center">
                          <button type="button" onClick={() => { removeItem(item.id) }} className="btn btn-ecomm">
                            <i className="bi bi-x-lg me-2" />
                            Remove
                          </button>
                          <button type="button" onClick={() => { addToWishlist(item.id) }} className="btn dark btn-ecomm">
                            <i className="bi bi-suit-heart me-2" />
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                })}

              </div>
              <div className="col-12 col-xl-4">

                <OrderSummary button={"Continue to Checkout"} bagTotal={bagTotal} delivery={delivery(totalAmount)} totalAmount={totalAmount} totalDiscount={totalDiscount} />
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        <Toaster />
        {/*start product details*/}
      </div>
      {/*end page content*/}



    </>

  )
}
