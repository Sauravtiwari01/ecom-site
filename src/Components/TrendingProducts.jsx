import React from 'react'
import { Link } from 'react-router-dom'

export default function TrendingProducts({data}) {
 
  return (
    <>
      <>
        {/*start special product*/}
        <section className="section-padding bg-section-2">
          <div className="container">
            <div className="card border-0 rounded-0 p-3 depth">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-6 text-center">
                  <img
                    src={`${data?.pic[0]}`}
                    style={{height:'350px'}}
                    className="img-fluid rounded-0"
                    alt="..."
                  />
                </div>
                <div className="col-lg-6">
                  <div className="card-body">
                    <h3 className="fw-bold">New Features of Trending Products</h3>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-transparent px-0">
                        Contrary to popular belief, Lorem Ipsum is not simply random
                        text.
                      </li>
                      <li className="list-group-item bg-transparent px-0">
                        All the Lorem Ipsum generators on the Internet tend.
                      </li>
                      <li className="list-group-item bg-transparent px-0">
                        There are many variations of passages of Lorem Ipsum
                        available.
                      </li>
                      <li className="list-group-item bg-transparent px-0">
                        There are many variations of passages available.
                      </li>
                    </ul>
                    <div className="buttons mt-4 d-flex flex-column flex-lg-row gap-3">
                      <Link
                        to="/shop"
                        className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                      >
                        Buy Now
                      </Link>
                      <Link
                        to={`/shop/products/${data?.id}`}
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*start special product*/}
      </>

    </>
  )
}
