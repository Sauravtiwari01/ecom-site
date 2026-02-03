import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import BrandSlider from '../Components/BrandSlider'

export default function AboutPage() {
  return (
    <>
  {/*start page content*/}
  <div className="page-content">
   <Breadcrumb title="About"/>
    {/*start product details*/}
    <section className="section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-xl-6">
            <h3 className="fw-bold">Our Story</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure.
            </p>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College.
            </p>
          </div>
          <div className="col-12 col-xl-6">
            <img
              src="https://images.pexels.com/photos/7679877/pexels-photo-7679877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
        {/*end row*/}
        <div className="separator section-padding">
          <div className="line" />
          <h3 className="mb-0 h3 fw-bold">Why Choose Us</h3>
          <div className="line" />
        </div>
        <div className="row row-cols-1 row-cols-xl-3 g-4 why-choose">
          <div className="col d-flex">
            <div className="card rounded-0 shadow-none w-100">
              <div className="card-body">
                <img
                  src="assets/images/icons/delivery.webp"
                  width={60}
                  alt=""
                />
                <h5 className="my-3 fw-bold">Free Shipping</h5>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industr in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="card rounded-0 shadow-none w-100">
              <div className="card-body">
                <img
                  src="assets/images/icons/money-bag.webp"
                  width={60}
                  alt=""
                />
                <h5 className="my-3 fw-bold">100% Back Gaurantee</h5>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industr in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="card rounded-0 shadow-none w-100">
              <div className="card-body">
                <img src="assets/images/icons/support.webp" width={60} alt="" />
                <h5 className="my-3 fw-bold">Online Support 24/7</h5>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industr in some
                  form.
                </p>
              </div>
            </div>
          </div>
        </div>
        <BrandSlider/>
      </div>
    </section>
    {/*start product details*/}
  </div>
  {/*end page content*/}
</>

  )
}
