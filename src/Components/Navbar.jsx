import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GetCategory } from '../Redux/ActionCreators/CategoryActionCreator'
import { GetSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreator'
import { GetCart } from '../Redux/ActionCreators/CartActionCreator'
export default function Navbar() {
  let CategoryStateData = useSelector(state => state.CategoryStateData)
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let cartStateData = useSelector(state => state.cartStateData)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  function userLogOut() {
    localStorage.clear()
    mobileNavToggle()
    navigate("/login")
  }
  let [toggleMobileNav, setToggleMobileNav] = useState(true)
  function mobileNavToggle() {
    setToggleMobileNav(!toggleMobileNav)
  }
  useEffect(() => { dispatch(GetCategory()) }, [CategoryStateData.length])
  useEffect(() => { dispatch(GetCart()) }, [cartStateData.length])
  useEffect(() => { dispatch(GetSubCategory()) }, [SubCategoryStateData.length])
  return (
    <>
      <>
        {/* page loader*/}
        {/* <div className="loader-wrapper">
    <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div> */}
        {/*end loader */}
        {/*start top header*/}
        <header className="top-header">
          <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
            <Link className="navbar-brand d-none d-xl-inline" to="/">
              <img src="assets/images/logo.webp" className="logo-img" alt="" />
            </Link>
            <a
              className="mobile-menu-btn d-inline d-xl-none"
              href="javascript:;"
              // data-bs-toggle="offcanvas"
              // data-bs-target="#offcanvasNavbar"
            onClick={mobileNavToggle}
            >
              <i className="bi bi-list" />
            </a>
            <div
              className={`offcanvas offcanvas-start ${toggleMobileNav ? "show" : ""}`}
              style={{ visibility: toggleMobileNav ? "visible" : "hidden" }}

              tabIndex={-1}
              id="offcanvasNavbar"
            >
              <div className="offcanvas-header">
                <div className="offcanvas-logo">
                  <img src="assets/images/logo.webp" className="logo-img" alt="" />
                </div>
                <button
                  type="button"
                  className="btn-close text-reset"
                  // data-bs-dismiss="offcanvas"
                  onClick={mobileNavToggle}
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body primary-menu">
                <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                  <li className="nav-item">
                    <Link onClick={mobileNavToggle} className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                      href="tv-shows.html"
                      data-bs-toggle="dropdown"
                    >
                      Categories
                    </a>
                    <div className="dropdown-menu dropdown-large-menu">
                      <div className="row">
                        <div className="col-12 col-xl-4">
                          <h6 className="large-menu-title">Category</h6>
                          <ul className="list-unstyled">
                            {
                              CategoryStateData.filter(x => x.active).map(item => {
                                return <li key={item.id}>
                                  <Link onClick={mobileNavToggle} to={`/shop?cg=${item.name}`}>{item.name}</Link>
                                </li>
                              })
                            }

                          </ul>
                        </div>
                        {/* end col-3 */}
                        <div className="col-12 col-xl-4">
                          <h6 className="large-menu-title">Sub Category</h6>
                          <ul className="list-unstyled">
                            {
                              SubCategoryStateData.filter(x => x.active).map(item => {
                                return <li key={item.id}>
                                  <Link onClick={mobileNavToggle} to={`/shop?sc=${item.name}`}>{item.name}</Link>
                                </li>
                              })
                            }
                          </ul>
                        </div>
                        {/* end col-3 */}
                        <div className="col-12 col-xl-4 d-none d-xl-block">
                          <div className="pramotion-banner1">
                            <img
                              src="assets/images/menu-img.webp"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                        {/* end col-3 */}
                      </div>
                      {/* end row */}
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link onClick={mobileNavToggle}
                      className="nav-link " to="/shop">
                      Shop
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link onClick={mobileNavToggle}
                      className="nav-link " to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link onClick={mobileNavToggle}
                      className="nav-link " to="/features">
                      Features
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link onClick={mobileNavToggle}
                      className="nav-link " to="/contact">
                      Contact Us
                    </Link>
                  </li>

                  {localStorage.getItem('role') === "Admin" ? <li className="nav-item dropdown">
                    <Link  onClick={mobileNavToggle}
                      className="nav-link " to="/admin">
                      Admin
                    </Link>
                  </li> : ""}



                  {localStorage.getItem('name') ? <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                      to="/dashboard"
                      data-bs-toggle="dropdown"
                    >
                      {localStorage.getItem("name")}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link onClick={mobileNavToggle} className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link onClick={mobileNavToggle} className="dropdown-item" to="/orders">
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link onClick={mobileNavToggle} className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={mobileNavToggle} className="dropdown-item" to="/update-profile">
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={mobileNavToggle}
                          className="dropdown-item"
                          to="address"
                        >
                          Addresses
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button onClick={userLogOut} className="dropdown-item" >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li> : <li className="nav-item dropdown">
                    <Link onClick={mobileNavToggle}
                      className="nav-link " to="/login">
                      Login
                    </Link>
                  </li>}


                </ul>
              </div>
            </div>
            <ul className="navbar-nav secondary-menu flex-row">
              <li className="nav-item">
                <a className="nav-link dark-mode-icon" href="javascript:;">
                  <div className="mode-icon">
                    <i className="bi bi-moon" />
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="search.html">
                  <i className="bi bi-search" />
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <i className="bi bi-suit-heart" />
                </Link>
              </li>
              <li
                className="nav-item"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
              >
                <Link className="nav-link position-relative" to="/cart">
                  <div className="cart-badge">{cartStateData.filter(x => x.userid === localStorage.getItem("userid")).length}</div>
                  <i className="bi bi-basket2" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-person-circle" />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/*end top header*/}

      </>

    </>
  )
}
