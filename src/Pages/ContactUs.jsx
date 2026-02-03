import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { GetSetting } from '../Redux/ActionCreators/SettingActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser } from '../Redux/ActionCreators/UserActionCreator'
import { CreateContactUS } from '../Redux/ActionCreators/ContactUsActionCreator'
import FormValidators from '../Validators/FormValidators'
import toast, { Toaster } from 'react-hot-toast';
export default function ContactUs() {
  let settingStateData = useSelector(state => state.settingStateData)
  let userStateData = useSelector(state => state.userStateData)
  const uid = localStorage.getItem("userid")
  const notify = (msg) => toast(msg);
  let [data, setData] = useState([])
  let [errorMessage, setErrorMessage] = useState("Can't send empty message")
  let [show, setShow] = useState(false)
  function getUserInput(e) {
    let { name, value } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
    setErrorMessage(FormValidators(e))
  }
  function postInput(e) {
    e.preventDefault()
    if (errorMessage !== "") {
      console.log("no")
      setShow(true)
    } else {
      setShow(false)
      console.log("yes")
      dispatch(CreateContactUS({ ...data }))
      notify("We will get back to you shortly.")
      setData((old) => { return { ...old, message: "" } })

    }
    setErrorMessage("Can't send Blank")

  }
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetSetting())

  }, [])
  useEffect(() => {
    dispatch(GetUser())
    if (userStateData.length) {
      let item = userStateData.find(x => x.id === uid)
      setData({
        userid: item.id,
        name: item.name,
        userName: item.userName,
        email: item.email,
        mobile: item.mobile
      })
    }
  }, [userStateData.length])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Contact" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="separator mb-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Find Us Map</h3>
              <div className="line" />
            </div>
            <div className="border p-3">
              <iframe
                className="w-100"
                src={settingStateData[0] ? settingStateData[0].map2 : import.meta.env.VITE_SITE_MAP2}
                height={450}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="separator my-3">
              <div className="line" />
              <h3 className="mb-0 h3 fw-bold">Why Choose Us</h3>
              <div className="line" />
            </div>
            <div className="row g-4">
              <div className="col-xl-8">
                <div className="p-4 border">
                  <form>
                    <div className="form-body">
                      <h4 className="mb-0 fw-bold">Drop Us a Line</h4>
                      <div className="my-3 border-bottom" />
                      <div className="mb-3">
                        <label className="form-label">Enter Your Name</label>
                        <input type="text" className="form-control rounded-0" value={data.name} name='name' readOnly />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Enter Email</label>
                        <input type="text" className="form-control rounded-0" value={data.email} name='email' readOnly />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control rounded-0" value={data.mobile} name='mobile' readOnly />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control rounded-0" name='message' onChange={getUserInput}
                          rows={4}
                          cols={4}
                          value={data.message}
                        />
                      </div>
                      {show ? <p className='text-danger'>{errorMessage}</p> : null}
                      <div className="mb-0">
                        <button onClick={postInput} className="btn btn-dark btn-ecomm">
                          Send Message
                        </button>
                      </div>
                      <Toaster
                        toastOptions={{
                          success: {
                            duration: 3000,
                            iconTheme: {
                              primary: 'green',
                              secondary: 'black',
                            },
                          },
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="p-3 border">
                  <div className="address mb-3">
                    <h5 className="mb-0 fw-bold">Address</h5>
                    <p className="mb-0 font-12">{settingStateData[0] ? settingStateData[0].address : import.meta.env.VITE_SITE_ADDRESS}</p>
                  </div>
                  <hr />
                  <div className="phone mb-3">
                    <h5 className="mb-0 fw-bold">Phone</h5>
                    <p className="mb-0 font-13">Mobile : {settingStateData[0] ? settingStateData[0].phone : import.meta.env.VITE_SITE_PHONE}</p>
                    <p className="mb-0 font-13">WhapsApp : {settingStateData[0] ? settingStateData[0].whatsapp : import.meta.env.VITE_SITE_WHATSAPP}</p>
                  </div>
                  <hr />
                  <div className="email mb-3">
                    <h5 className="mb-0 fw-bold">Email</h5>
                    <p className="mb-0 font-13">{settingStateData[0] ? settingStateData[0].email : import.meta.env.VITE_SITE_EMAIL}</p>
                  </div>
                  <hr />
                  <div className="working-days mb-0">
                    <h5 className="mb-0 fw-bold">Working Days</h5>
                    <p className="mb-0 font-13">Mon - FRI / 9:30 AM - 6:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}

