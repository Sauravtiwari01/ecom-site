import React, { useState } from 'react'
import ProductCard from './ProductCard'

export default function LatestProducts({ data, Category }) {
  let [selected, setSelected] = useState("")
  return (
    <>
      {/*start tabular product*/}
      <section className="product-tab-section section-padding bg-light">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">Shop your favourites</h3>
            <p className="mb-0 text-capitalize">from Bestsellers </p>
          </div>
          <div className="row">
            <div className="col-auto mx-auto">
              <div className="product-tab-menu table-responsive">
                <ul
                  className="nav nav-pills flex-nowrap"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      data-bs-toggle="pill"
                      data-bs-target="#new-arrival"
                      type="button"
                      onClick={() => setSelected("")}
                    >
                      New Arrival
                    </button>
                  </li>
                  {Category.map(item => {
                    return <li key={item.id} className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#new-arrival"
                        type="button"
                        onClick={() => setSelected(item.name)}
                      >
                        {item.name}
                      </button>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="tab-content tabular-product">
            <div className="tab-pane fade show active" id="new-arrival">
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-4">
                {data.filter(x => selected === "" ? true : selected.toLowerCase() === x.category.toLowerCase()).slice(-10).map(item => {
                  return <div key={item.id} className="col">
                    <ProductCard item={item} />
                    
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*end tabular product*/}

    </>
  )
}
