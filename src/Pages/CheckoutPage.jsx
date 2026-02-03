import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import FormValidators from '../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { GetAddress, UpdateAddress } from '../Redux/ActionCreators/AddressActionCreator'
import { DeleteCart, GetCart, UpdateCart } from '../Redux/ActionCreators/CartActionCreator'
import { GetProduct, UpdateProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { CreateOrder } from '../Redux/ActionCreators/OrderActionCreator'
import { Link, useNavigate } from 'react-router-dom'
export default function CheckoutPage() {
    let addressStateData = useSelector(state => state.addressStateData)
    let cartStateData = useSelector(state => state.cartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData || [])
    let dispatch = useDispatch()
    let [addresses, setAddresses] = useState({})
    let [selectedAddress, setSelectedAddress] = useState(null)
    let [cart, setCart] = useState([])
    let [editAddress, setEditAddress] = useState({})
    let [defaultAddress, setDefaultAddress] = useState({})
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        mobile: "",
        pincode: "",
        locality: "",
        district: "",
        address: "",
        state: ""
    })
    let [show, setShow] = useState(false)
    let [outOfStock, setOutofstock] = useState(false)
    let navigate = useNavigate()
    const totalAmount = cart.reduce((acc, item) => { return acc + (item.finalPrice * item.quantity) }, 0)
    const bagTotal = cart.reduce((acc, item) => { return acc + (item.basePrice * item.quantity) }, 0)
    const totalDiscount = cart.reduce((acc, item) => { return acc + ((item.basePrice * item.quantity) - (item.finalPrice * item.quantity)) }, 0)
    const delivery = (totalAmount) => totalAmount >= 5000 ? 0 : 149


    useEffect(() => {
        (() => {
            dispatch(GetProduct())
            if (cartStateData.length && ProductStateData.length) {
                let cart = cartStateData.filter(x => x.user === localStorage.getItem("userid"))
                cart.forEach(item => {
                    let p = ProductStateData.find(x => x.id === item.product)
                    if (p.stock === false) {
                        setOutofstock(true)
                    }
                })
            }
        })()
    }, [ProductStateData.length])
    function placeOrder() {
        console.log(bagTotal)
        navigate("/checkout/order-confirmation")
        let item = {
            id: Math.random().toString(36).slice(2).toUpperCase(),
            userid: localStorage.getItem("userid"),
            
            BuyerName: localStorage.getItem("name"),
            orderStatus: "Order Placed",
            paymentMethod: "COD",
            paymentStatus: "Pending",
            orderDate: new Date().toLocaleDateString(),
            bagTotal: bagTotal,
            totalAmount: totalAmount,
            totalDiscount: totalDiscount,
            delivery: delivery(totalAmount),
            shippingAddress: {
                name: defaultAddress.name,
                mobile: defaultAddress.mobile,
                pincode: defaultAddress.pincode,
                locality: defaultAddress.locality,
                district: defaultAddress.district,
                address: defaultAddress.address,
                state: defaultAddress.state,
            },
            products: cart
        }
        dispatch(CreateOrder(item))
        cart.forEach((item) => {
            let p = ProductStateData.find(x => x.id === item.id)
            console.log(p)
            const UpdatedStockQuantity = p.stockQuantity - item.quantity
            UpdatedStockQuantity === 0 ? p.stock = false : p.stock = true
            dispatch(UpdateProduct({ ...p, stockQuantity: UpdatedStockQuantity }))
            dispatch(DeleteCart({ id: item.id }))
        })
    }
    function editUserInput(e) {
        let { name, value, } = e.target

        setEditAddress((old) => {
            return {
                ...old,
                [name]: value
            }
        })
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidators(e)
            }
        })

    }
    function updateAddress(e, id) {

        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
            console.log(error)
        }
        else {
            setShow(false)
            setErrorMessage({
                name: "",
                mobile: "",
                pincode: "",
                locality: "",
                district: "",
                address: "",
                state: ""
            })
            dispatch(UpdateAddress({ ...editAddress, id: id }))
            dispatch(GetAddress())
            setDefaultAddress(editAddress)
            document.querySelector('#EditAddress .btn-close').click();


        }

    }


    useEffect(() => {
        (() => {
            dispatch(GetCart())
            if (cartStateData.length) {
                let p = cartStateData.filter(x => x.userid === localStorage.getItem("userid"))
                setCart(p);
            } else {
                setCart([])
            }
        })()
    }, [cartStateData.length])

    useEffect(() => {
        dispatch(GetAddress())
    }, [])
    useEffect(() => {
        setAddresses(addressStateData.filter(x => x.userid === localStorage.getItem("userid")))
        setDefaultAddress(addressStateData.find(x => x.userid === localStorage.getItem("userid")))
    }, [addressStateData])

    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                {/*start breadcrumb*/}
                <Breadcrumb title="Cart / Checkout" />
                {/*end breadcrumb*/}
                {/*start Checkout details*/}
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">Checkout Details</h4>
                            </div>
                        </div>

                        {/* delivery details */}
                        <div className="row g-4">
                            <div className="col-12 col-lg-8 col-xl-8">

                                <div className="d-flex align-items-center px-3 py-2 border mb-4">
                                    <div className="text-start">
                                        <h5 className="mb-0 h5 fw-bold">Select Delivery Address</h5>
                                    </div>
                                </div>
                                {defaultAddress ? <div>
                                    <div className="card rounded-0 mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-xl-row gap-3">
                                                <div className="address-info form-check flex-grow-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefaultAddress"
                                                        id="flexRadioDefaultAddress1"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexRadioDefaultAddress1"
                                                    >
                                                        <span className="fw-bold mb-0 h5">{defaultAddress.name}</span>
                                                        <br />
                                                        {defaultAddress.address} {defaultAddress.locality}, {defaultAddress.district} <br />
                                                        {defaultAddress.state}, {defaultAddress.pincode}
                                                        <br />
                                                        Mobile:{" "}
                                                        <span className="text-dark fw-bold">
                                                            {defaultAddress.mobile}
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="d-none d-xl-block vr" />                                                <div className="d-grid gap-2 align-self-start align-self-xl-center">
                                                    <button
                                                        type="button" onClick={() => {
                                                            setEditAddress(defaultAddress)
                                                            setErrorMessage({
                                                                name: "",
                                                                mobile: "",
                                                                pincode: "",
                                                                locality: "",
                                                                district: "",
                                                                address: "",
                                                                state: ""
                                                            })
                                                        }}
                                                        className="btn btn-outline-dark px-5 btn-ecomm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#EditAddress"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-dark btn-ecomm"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#changeAddress"
                                                    >
                                                        Change Address
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div> : null}

                                {/* Payment details */}

                                <div className="d-flex align-items-center px-3 py-2 border mb-4">
                                    <div className="text-start">
                                        <h5 className="mb-0 h5 fw-bold">Select Payment Method</h5>
                                    </div>
                                </div>

                                <div className="card rounded-0 payment-method">
                                    <div className="row g-0">
                                        <div className="col-12 col-lg-4 bg-light">
                                            <div className="nav flex-column nav-pills">
                                                <button
                                                    className="nav-link rounded-0"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-home"
                                                    type="button"
                                                >
                                                    <i className="bi bi-cash-stack me-2" />
                                                    Cash On Delivery
                                                </button>
                                                <button
                                                    className="nav-link rounded-0"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-profile"
                                                    type="button"
                                                >
                                                    <i className="bi bi-paypal me-2" />
                                                    Paypal
                                                </button>
                                                <button
                                                    className="nav-link active rounded-0"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-messages"
                                                    type="button"
                                                >
                                                    <i className="bi bi-credit-card-2-back me-2" />
                                                    Credit/Debit Card
                                                </button>
                                                <button
                                                    className="nav-link rounded-0 border-bottom-0"
                                                    id="v-pills-settings-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-settings"
                                                    type="button"
                                                >
                                                    <i className="bi bi-bank2 me-2" />
                                                    Net Banking
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-8">
                                            <div className="tab-content p-3">
                                                <div className="tab-pane fade" id="v-pills-home">
                                                    <h5 className="mb-3 fw-bold">
                                                        I would like to pay after product delivery
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn btn-ecomm btn-dark w-100 py-3 px-5"
                                                    >
                                                        Place Order
                                                    </button>
                                                </div>
                                                <div className="tab-pane fade" id="v-pills-profile">
                                                    <div className="mb-3">
                                                        <p>Select your Paypal Account type</p>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="inlineRadioOptions"
                                                                id="inlineRadio1"
                                                                defaultValue="option1"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="inlineRadio1"
                                                            >
                                                                Domestic
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="inlineRadioOptions"
                                                                id="inlineRadio2"
                                                                defaultValue="option2"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="inlineRadio2"
                                                            >
                                                                International
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="d-block">
                                                            {" "}
                                                            <a
                                                                href="javscript:;"
                                                                className="btn btn-outline-dark btn-ecomm rounded-0"
                                                            >
                                                                <i className="bi bi-paypal me-2" />
                                                                Login to my Paypal
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="mb-0">
                                                            Note: After clicking on the button, you will be
                                                            directed to a secure gateway for payment. After
                                                            completing the payment process, you will be redirected
                                                            back to the website to view details of your order.
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-ecomm btn-dark w-100 py-3 px-5"
                                                    >
                                                        Pay Now
                                                    </button>
                                                </div>
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="v-pills-messages"
                                                >
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control rounded-0"
                                                                    id="floatingCardNumber"
                                                                    placeholder="Card Number"
                                                                />
                                                                <label htmlFor="floatingCardNumber">
                                                                    Card Number
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control rounded-0"
                                                                    id="floatingNameonCard"
                                                                    placeholder="Name on Card"
                                                                />
                                                                <label htmlFor="floatingNameonCard">
                                                                    Name on Card
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-8">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control rounded-0"
                                                                    id="floatingValidity"
                                                                    placeholder="Validity (MM/YY)"
                                                                />
                                                                <label htmlFor="floatingValidity">
                                                                    Validity (MM/YY)
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-4">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    className="form-control rounded-0"
                                                                    id="floatingCCV"
                                                                    placeholder="CCV"
                                                                />
                                                                <label htmlFor="floatingCCV">CCV</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <button
                                                                type="button"
                                                                className="btn btn-ecomm btn-dark w-100 py-3 px-5"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/*end row*/}
                                                </div>
                                                <div className="tab-pane fade" id="v-pills-settings">
                                                    <div className="mb-3">
                                                        <p>Select your Bank</p>
                                                        <select
                                                            className="form-select form-select-lg rounded-0"
                                                            aria-label="Default select example"
                                                        >
                                                            <option defaultValue="">
                                                                --Please Select Your Bank--
                                                            </option>
                                                            <option value={1}>Bank Name 1</option>
                                                            <option value={2}>Bank Name 2</option>
                                                            <option value={3}>Bank Name 3</option>
                                                        </select>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-ecomm btn-dark w-100 py-3 px-5 mb-3"
                                                    >
                                                        Pay Now
                                                    </button>
                                                    <div className="">
                                                        <p className="mb-0">
                                                            Note: After clicking on the button, you will be
                                                            directed to a secure gateway for payment. After
                                                            completing the payment process, you will be redirected
                                                            back to the website to view details of your order.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*end row*/}
                                </div>



                            </div>
                            <div className="col-12 col-lg-4 col-xl-4">


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
                                            <p className="mb-0">&#8377;{delivery(totalAmount)}</p>
                                        </div>
                                        <hr />
                                        <div className="hstack align-items-center justify-content-between fw-bold text-content">
                                            <p className="mb-0">Total Amount</p>
                                            <p className="mb-0">&#8377;{totalAmount + delivery(totalAmount)}</p>
                                        </div>
                                        {
                                            cart.length && outOfStock === false ?
                                                <div className="d-grid mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark btn-ecomm py-3 px-5" onClick={() => placeOrder()}
                                                    >
                                                        Place Order
                                                    </button>
                                                </div> : <p className='mt-3 text-danger text-center '>One of Cart Item is Out of Stock. Please Remove from Cart<br /><Link to="/cart">Goto Cart to Remove</Link></p>
                                        }
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
                            </div>
                        </div>



                        {/* billing details */}


                        <div className="section-padding">
                            <div className="row g-4">
                                <div className="col-12 col-lg-8 col-xl-8">
                                    <div className="d-flex align-items-center px-3 py-2 border mb-4">
                                        <div className="text-start">
                                            <h5 className="mb-0 h5 fw-bold">Billing Details</h5>
                                        </div>
                                    </div>
                                    <h6 className="fw-bold mb-3 py-2 px-3 bg-light">Personal Details</h6>
                                    <div className="card rounded-0 mb-3">
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <div className="col-12 col-lg-6">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-0"
                                                            id="floatingFirstName"
                                                            placeholder="First Name" value={defaultAddress?.name}
                                                        />
                                                        <label htmlFor="floatingFirstName">Full Name</label>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-0"
                                                            id="floatingMobileNo"
                                                            placeholder="Mobile No" value={defaultAddress?.mobile}
                                                        />
                                                        <label htmlFor="floatingMobileNo">Mobile </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end row*/}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </section>
                {/*end Checkout details*/}





            </div>
            {/*end page content*/}

            {/* changeAddress modal */}
            <div className="modal" id="changeAddress" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Select Address</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            {addresses.length > 1 ?


                                addresses.map((item, index) => {
                                    return <div key={index} className="card rounded-0 mb-3">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-xl-row gap-3">
                                                <div className="address-info form-check flex-grow-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="defaultAddress" onChange={() => { setSelectedAddress(item) }}
                                                        id="flexRadioDefaultAddress2"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexRadioDefaultAddress2"
                                                    >
                                                        <span className="fw-bold mb-0 h5">{item.name}</span>
                                                        <br />
                                                        {item.address}, {item.locality}, {item.district} <br />
                                                        {item.state}, {item.pincode}
                                                        <br />
                                                        Mobile:{" "}
                                                        <span className="text-dark fw-bold">
                                                            {item.mobile}
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="d-none d-xl-block vr" />

                                            </div>
                                        </div>
                                    </div>
                                })

                                : null}

                        </div>
                        <div className="modal-footer">
                            <div className="d-grid w-100">
                                <button type="button" onClick={() => {
                                    if (selectedAddress) {
                                        setDefaultAddress(selectedAddress)
                                    }
                                }} data-bs-dismiss="modal" className="btn btn-dark py-3 px-5 btn-ecomm">
                                    Change Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EditAddress modal */}
            <div className="modal" id="EditAddress" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Address</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="">
                                <h6 className="fw-bold mb-3">Contact Details</h6>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="floatingName" name='name' onChange={editUserInput}
                                        placeholder="Name" value={editAddress.name}
                                    />
                                    <label htmlFor="floatingName">Name</label>
                                </div>
                                {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="floatingMobileNo" name='mobile' onChange={editUserInput}
                                        placeholder="Mobile No" value={editAddress.mobile}
                                    />
                                    <label htmlFor="floatingMobileNo">Mobile No</label>
                                </div>{show && errorMessage.mobile ? <p className='text-danger'>{errorMessage.mobile}</p> : null}
                            </div>
                            <div className="mt-4">
                                <h6 className="fw-bold mb-3">Address</h6>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="floatingPinCode" name='pincode' onChange={editUserInput}
                                        placeholder="Pin Code" value={editAddress.pincode}
                                    />
                                    <label htmlFor="floatingPinCode">Pin Code</label>
                                </div>{show && errorMessage.pincode ? <p className='text-danger'>{errorMessage.pincode}</p> : null}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="floatingAddress" name='address' onChange={editUserInput}
                                        placeholder="Address (House No, Building, Street, Area)" value={editAddress.address}
                                    />
                                    <label htmlFor="floatingAddress">Address</label>
                                </div>{show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="floatingLocalityTown" name='locality' onChange={editUserInput}
                                        placeholder="Locality/Town" value={editAddress.locality}
                                    />
                                    <label htmlFor="floatingLocalityTown">Locality / Town</label>
                                </div>
                                {show && errorMessage.locality ? <p className='text-danger'>{errorMessage.locality}</p> : null}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control rounded-0"
                                                id="floatingCity" name='district' onChange={editUserInput}
                                                placeholder="City / District" value={editAddress.district}
                                            />
                                            <label htmlFor="floatingAddress">City / District</label>
                                        </div>{show && errorMessage.district ? <p className='text-danger'>{errorMessage.district}</p> : null}
                                    </div>
                                    <div className="col">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control rounded-0"
                                                id="floatingState" name='state' onChange={editUserInput}
                                                placeholder="State" value={editAddress.state}
                                            />
                                            <label htmlFor="floatingState">State</label>
                                        </div>{show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="d-grid w-100">
                                <button type="button" onClick={(e) => {
                                    updateAddress(e, editAddress.id)

                                }} className="btn btn-dark py-3 px-5 btn-ecomm">
                                    Update Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


