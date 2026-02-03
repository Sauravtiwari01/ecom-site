import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormValidators from '../Validators/FormValidators'
import { GetNewsletter, CreateNewsletter } from '../Redux/ActionCreators/NewsletterActionCreator'

import db from "../data/data.json"
export default function Newsletter() {
  let newsletterStateData = db.newsletter
  let dispatch = useDispatch()
  let [email, setEmail] = useState("")
  let [errorMessage, setErrorMessage] = useState("Enter Email")
  let [Message, setMessage] = useState("Enter Email")
  let [show, setShow] = useState(false)
  let [submitted, setSubmitted] = useState(false)


  function getUserEmail(e) {
    let { name, value } = e.target
    setEmail(value)
    setErrorMessage(FormValidators(e))
  }

  function postEmail(e) {
    e.preventDefault()
    if (errorMessage !== "") {
      setShow(true)
    }
    else {
      let item = newsletterStateData.find(x => x.email === email)
      if (item) {
        setShow(true)
        setErrorMessage("This Email is already subscribed")
      }
      else {
        setShow(false)
        setSubmitted(true)
        setMessage("You are now subscribed to our Newsletter")
        dispatch(CreateNewsletter({
          email: email,
          name: localStorage.getItem("name"),
          userid: localStorage.getItem("userid"),
          active: true
        }))
        setEmail("")
        setErrorMessage("Enter Email")
      }
    }
    setTimeout(() => {
      setSubmitted(false)
    }, 1500);
    dispatch(GetNewsletter())
  }


  useEffect(() => { dispatch(GetNewsletter()) }, [dispatch])
  return (
    <>
      <>
        {/*subscribe banner*/}
        <section className="product-thumb-slider subscribe-banner p-5">
          <div className="row">
            <div className="col-12 col-lg-6 mx-auto">
              <div className="text-center">
                <h3 className="mb-0 fw-bold text-white">
                  Get Latest Update by <br /> Subscribing to Our Newslater
                </h3>
                <div className="mt-3">
                  <input
                    type="text" name='email' onChange={getUserEmail} value={email}
                    className="form-control form-control-lg bubscribe-control rounded-0 px-5 py-3"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-3 d-grid">
                  <button
                    type="button" onClick={(e) => { postEmail(e) }}
                    className="btn btn-lg btn-ecomm bubscribe-button px-5 py-3"
                  >
                    Subscribe
                  </button>
                  <div className='mt-3'>

                  {show ? <p className='text-danger '>{errorMessage}</p> : null}
                  {submitted ? <p className='text-danger '>{Message}</p> : null}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
        {/*subscribe banner*/}
      </>

    </>
  )
}
