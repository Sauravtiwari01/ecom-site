import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function BuyerSiderbar() {
  return (
    <>
    <div className="offcanvas-body account-menu">
                  <div className="list-group w-100 rounded-0">
                    <NavLink
                      to="/dashboard"
                      className="list-group-item"
                    >
                      <i className="bi bi-house-door me-2" />
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="list-group-item "
                    >
                      <i className="bi bi-basket3 me-2" />
                      Orders
                    </NavLink>
                    <NavLink to="/profile" className="list-group-item ">
                      <i className="bi bi-person me-2" />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/update-profile"
                      className="list-group-item"
                    >
                      <i className="bi bi-pencil me-2" />
                      Edit Profile
                    </NavLink>
                    <NavLink
                      to="/address"
                      className="list-group-item"
                    >
                      <i className="bi bi-pin-map me-2" />
                      Saved Address
                    </NavLink>
                    <NavLink to="/wishlist" className="list-group-item">
                      <i className="bi bi-suit-heart me-2" />
                      Wishlist
                    </NavLink>
                    <button type='button' data-bs-dismiss="offcanvas"  className="list-group-item">
                      <i className="bi bi-power me-2" />
                      logout
                    </button>
                    
                  </div>
                </div>
    </>
  )
}
