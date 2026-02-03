import React, { useEffect, useState } from "react"
import Breadcrumb from "../Components/Breadcrumb"
import { Link } from "react-router-dom"
import BuyerSiderbar from "../Components/BuyerSiderbar"
import { useDispatch, useSelector } from "react-redux"
import { GetOrder } from "../Redux/ActionCreators/OrderActionCreator"
import {
  CreateTestimonial,
  GetTestimonial,
  UpdateTestimonial,
} from "../Redux/ActionCreators/TestimonialActionCreator"
import FormValidators from "../Validators/FormValidators"

export default function OrderPage() {
  const dispatch = useDispatch()
  const orderStateData = useSelector((state) => state.orderStateData) || []
  const testimonialStateData = useSelector((state) => state.testimonialStateData) || []

  const [data, setData] = useState([])
  const [reviewData, setReviewData] = useState({ review: "" })
  const [errorMessage, setErrorMessage] = useState({
    review: "Can't leave blank",
  })
  const [show, setShow] = useState(false)
  const userId = localStorage.getItem("userid")


  const userTestimonials = React.useMemo(
    () => testimonialStateData.filter((x) => x.userID === userId),
    [testimonialStateData, userId]
  )

  function getUserInput(e) {
    const { name, value } = e.target;
    setReviewData((old) => ({ ...old, [name]: value }));
    setErrorMessage((old) => ({ ...old, [name]: FormValidators(e) }));
  }

  function postReview(e) {
    e.preventDefault();
    const item = Object.values(errorMessage).find((x) => x !== "");
    if (item) {
      setShow(true);
      console.log(item);
      return;
    }

    setShow(false);
    const existing = userTestimonials.find(
      (x) => x.orderID === reviewData.orderID && x.productID === reviewData.productID
    )

    if (existing) {
      dispatch(UpdateTestimonial({ ...existing, review: reviewData.review }))
    } else
      dispatch(CreateTestimonial(reviewData))


    try {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("reviewModal")
      );
      modal?.hide();
    } catch (err) {
    }
    setTimeout(() => dispatch(GetTestimonial()), 300)
  }

  function postRating(rating, id, orderid, buyerName, name) {
    const existing = userTestimonials.find(
      (x) => x.orderID === orderid && x.productID === id
    )

    if (existing) {
      dispatch(UpdateTestimonial({ ...existing, rating }))
    } else {
      dispatch(
        CreateTestimonial({
          orderID: orderid,
          productID: id,
          userID: userId,
          BuyerName: buyerName,
          productName: name,
          rating,
        })
      )
    }

    setTimeout(() => dispatch(GetTestimonial()), 300);
  }

  useEffect(() => {
    dispatch(GetOrder());
    dispatch(GetTestimonial());
  }, [dispatch])

  useEffect(() => {
    if (orderStateData && orderStateData.length) {
      setData(orderStateData.filter((x) => x.userid === userId));
    } else {
      setData([])
    }
  }, [orderStateData, userId])

  const order = [...data].reverse()


  return (
    <>
      <div className="page-content">
        <Breadcrumb title="Orders" />

        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-start">
                <h4 className="mb-0 h4 fw-bold">Account - Orders</h4>
              </div>
            </div>

            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>

            <div className="row">
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <BuyerSiderbar />
                  </div>
                </nav>
              </div>

              <div className="col-12 col-xl-9">
                <div className="card rounded-0 mb-3 bg-light">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-xl-row gap-3 align-items-center">
                      <div>
                        <h5 className="mb-1 fw-bold">All Orders</h5>
                        <p className="mb-0">for anytime</p>
                      </div>

                      <div className="order-search flex-grow-1">
                        <form>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control ps-5 rounded-0"
                              placeholder="Search Product..."
                            />
                            <span className="position-absolute top-50 product-show translate-middle-y">
                              <i className="bi bi-search ms-3" />
                            </span>
                          </div>
                        </form>
                      </div>

                      <div className="filter">
                        <button
                          type="button"
                          className="btn btn-dark rounded-0"
                          data-bs-toggle="modal"
                          data-bs-target="#FilterOrders"
                        >
                          <i className="bi bi-filter me-2" />
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {order.map((item) => {
                  return <div key={item.id} className="card rounded-0 mb-3">
                    <div className="card-body">
                      <p className="text-dark">Order ID: {item.id}</p>

                      {item.products.map((p, index) => {
                        const productRating =
                          userTestimonials.find(
                            (x) => x.orderID === item.id && x.productID === p.id
                          )?.rating || 0
                        const existingReview = userTestimonials.find(
                          (x) => x.orderID === item.id && x.productID === p.id
                        )
                        const hasReview = existingReview && "review" in existingReview;

                        return (
                          <div key={index} className="d-flex flex-column flex-xl-row gap-3">

                            <div className="product-img mb-2">
                              <Link to={`/shop/products/${p.id}`}>
                                <img
                                  src={`${import.meta.env.VITE_SITE_IMG_SERVER}${p.pic[0]}`}
                                  width={120}
                                  alt={p.name}
                                />
                              </Link>
                            </div>

                            <div className="product-info flex-grow-1">
                              <h5 className="fw-bold mb-1">{p.name}</h5>
                              <p className="mb-0">{p.brand}</p>
                              <p className="mb-0">&#8377;{p.finalPrice}</p>

                              <div className="mt-3 hstack gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm border rounded-0"
                                >
                                  Size : {p.size}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm border rounded-0"
                                >
                                  color : {p.color}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm border rounded-0"
                                >
                                  Qty : {p.quantity}
                                </button>
                              </div>

                              {item.orderStatus === "Order delivered" ? <div className="d-flex align-items-center justify-content-between mt-3 gap-3">
                                <div className="d-flex align-items-center">
                                  <p className="mb-1 fw-bold">Rate this Product</p>&nbsp;
                                  <div className="ratings">
                                    <i
                                      onClick={() =>
                                        postRating(1, p.id, item.id, item.BuyerName, p.name)
                                      }
                                      className={`bi bi-star${productRating >= 1 ? "-fill" : ""
                                        } text-warning h6`}
                                    />
                                    &nbsp;
                                    <i
                                      onClick={() =>
                                        postRating(2, p.id, item.id, item.BuyerName, p.name)
                                      }
                                      className={`bi bi-star${productRating >= 2 ? "-fill" : ""
                                        } text-warning h6`}
                                    />
                                    &nbsp;
                                    <i
                                      onClick={() =>
                                        postRating(3, p.id, item.id, item.BuyerName, p.name)
                                      }
                                      className={`bi bi-star${productRating >= 3 ? "-fill" : ""
                                        } text-warning h6`}
                                    />
                                    &nbsp;
                                    <i
                                      onClick={() =>
                                        postRating(4, p.id, item.id, item.BuyerName, p.name)
                                      }
                                      className={`bi bi-star${productRating >= 4 ? "-fill" : ""
                                        } text-warning h6`}
                                    />
                                    &nbsp;
                                    <i
                                      onClick={() =>
                                        postRating(5, p.id, item.id, item.BuyerName, p.name)
                                      }
                                      className={`bi bi-star${productRating >= 5 ? "-fill" : ""
                                        } text-warning h6`}
                                    />
                                  </div>
                                </div>
                              </div> : null}



                            </div>
                            <div className="d-none d-xl-block vr" />
                            {item.orderStatus === "Order delivered" ? <div className="d-grid align-self-start align-self-xl-center ">

                              {hasReview ? (
                                <button type="button" className=" btn btn-dark btn-ecomm">
                                  Review Posted
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setReviewData({
                                      orderID: item.id,
                                      productID: p.id,
                                      userID: p.userid,
                                      BuyerName: item.BuyerName,
                                      productName: p.name,
                                      review: "",
                                    })
                                  }
                                  className="btn btn-dark btn-ecomm "
                                  data-bs-toggle="modal"
                                  data-bs-target="#reviewModal"
                                >
                                  Write a review?
                                </button>
                              )}
                            </div> : null}


                          </div>
                        );
                      })}
                    </div>

                    <div className="card-footer rounded-0 bg-transparent">
                      <div className="d-flex align-items-center justify-content-between gap-3">
                        <div className="d-flex">
                          <p className="mb-1 fw-bold text-dark">
                            Total Amount : {item.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>

        {/* review modal */}
        <div
          className="modal fade"
          id="reviewModal"
          tabIndex={-1}
          aria-labelledby="reviewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark" id="reviewModalLabel">
                  Write your review!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="review">
                    Tell us what you think about this product.
                  </label>
                  <textarea
                    className="w-100"
                    onChange={getUserInput}
                    value={reviewData.review}
                    rows={4}
                    name="review"
                    id="review"
                  />
                  {show ? <p className="text-danger">{errorMessage.review}</p> : null}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() =>
                    setReviewData({ orderID: "", productID: "", userID: "", BuyerName: "", productName: "", review: "" })
                  }
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button type="button" onClick={postReview} className="btn btn-success">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* filter Modal (unchanged) */}
        <div className="modal" id="FilterOrders" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Filter Orders</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* status/time filters (unchanged) */}
                <h6 className="mb-3 fw-bold">Status</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      On the way
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                      Delivered
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault4"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault4">
                      Cancelled
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault5"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault5">
                      Returned
                    </label>
                  </div>
                </div>

                <hr />

                <h6 className="mb-3 fw-bold">Time</h6>
                <div className="status-radio d-flex flex-column gap-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault6"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault6">
                      Anytime
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault7"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault7">
                      Last 30 days
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault8"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault8">
                      Last 6 months
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioTime"
                      id="flexRadioDefault9"
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault9">
                      Last year
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="d-flex align-items-center gap-3 w-100">
                  <button type="button" className="btn btn-outline-dark btn-ecomm w-50">
                    Clear Filters
                  </button>
                  <button type="button" className="btn btn-dark btn-ecomm w-50">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Filters Modal */}
      </div>
    </>
  );
}
