import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({title}) {
  return (
    <>
    <>
  {/*start breadcrumb*/}
  <div className="py-4 border-bottom">
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 d-flex justify-content-center">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/*end breadcrumb*/}
</>

    </>
  )
}
