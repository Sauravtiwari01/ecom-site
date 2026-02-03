import React, { useEffect } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import BuyerSiderbar from '../Components/BuyerSiderbar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteWishlist, GetWishlist } from '../Redux/ActionCreators/WishlistActionCreator'
import { CreateCart } from '../Redux/ActionCreators/CartActionCreator'
import toast, { Toaster } from 'react-hot-toast';

export default function WishlistPage() {
  let wishlistStateData = useSelector(state => state.wishlistStateData)
  let cartStateData = useSelector(state => state.cartStateData)
  let navigate = useNavigate()
  let dispatch = useDispatch()

  function removeWishlist(id) {
    dispatch(DeleteWishlist({ id: id }))
  }


  const notify = (msg) => toast(msg)
  function moveToCart(id) {
    let product = wishlistStateData.find(x => x.id === id)
    let item = cartStateData.find(x => x.id === product.id && x.color === product.color && x.size === product.size)
    if (!item) {
      dispatch(CreateCart({...product,quantity:1}))
      dispatch(DeleteWishlist({ id: id }))
      dispatch(GetWishlist())
    }
    else {
      notify("Product Already in Cart")
    }
  }
  useEffect(() => { dispatch(GetWishlist()) }, [wishlistStateData.length])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Wishlist" />
        {/*start product wishlist*/}
        <section className="section-padding">
          <div className="container">

            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Wishlist ({wishlistStateData.length} Items)</h4>
              </div>
              <div className="ms-auto">
                <button type="button" onClick={() => { navigate("/shop") }} className="btn btn-light btn-ecomm">
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className="similar-products">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {wishlistStateData.map(item => {
                  return <div key={item.id} className="col">
                    <div className="card rounded-0">
                      <button onClick={() => { removeWishlist(item.id) }} className="btn-close wishlist-close position-absolute end-0 top-0"></button>
                      <Link to={`/shop/products/${item.id}`}>
                        <img
                          src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic[0]}`}
                          alt=""
                          className="card-img-top rounded-0"
                        />
                      </Link>
                      <div className="card-body border-top text-center">
                        <p className="mb-0 product-short-name">{item.name}</p>
                        <div className="product-price d-flex align-items-center gap-2 mt-2 justify-content-center">
                          <div className="h6 fw-bold">&#8377;{item.finalPrice}</div>
                          <div className="h6 fw-light text-muted text-decoration-line-through">
                            &#8377;{item.basePrice}
                          </div>
                          <div className="h6 fw-bold text-danger">({item.discount}% off)</div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent text-center">
                        <button onClick={() => { moveToCart(item.id) }} className="btn btn-ecomm w-100">
                          Move to Bag
                        </button>
                      </div>
                      <Toaster/>
                    </div>
                  </div>
                })}


              </div>
            </div>
            {/*end row*/}

          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}
