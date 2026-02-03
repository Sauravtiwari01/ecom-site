import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../../Components/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { CreateFAQ, GetFAQ } from '../../../Redux/ActionCreators/FAQActionCreator'

export default function AdminCreateFAQPage() {

    let [data, setData] = useState({
        question: "",
        answer: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        question: "Question is Mandatory",
        answer: "Answer is Mandatory",
    })
    let [show, setShow] = useState(false)
    let FAQStateData = useSelector(state => state.FAQStateData)
    let Dispatch = useDispatch()
    function GetInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidators(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value

            }
        })
    }
    let navigate = useNavigate()
    function postData(e) {
        e.preventDefault(e)
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = FAQStateData.find(x => x.question.toLowerCase() === data.question.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'question': "FAQ Already Exists"
                    } 
                })
                return
            }
            Dispatch(CreateFAQ({ ...data }))
            navigate('/admin/faq')

        }
    }


    function GetApiData() {
        Dispatch(GetFAQ())
    }
    useEffect(() => { GetApiData() }, [FAQStateData.length])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2 px-2'> Create FAQs <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label htmlFor="FAQquestion">FAQ Question*</label>
                                        <textarea rows={2} name="question" id="question" placeholder=' FAQ Question' onChange={GetInputData} className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-dark'}`}></textarea>
                                        {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : null}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="CName">FAQ Answer*</label>
                                        <textarea rows={4} name="answer" id="answer" placeholder=' FAQ answer' onChange={GetInputData} className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`}></textarea>
                                        {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : null}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="active">Active</label>
                                            <select name="active" className='form-select' onChange={GetInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className='my-3 btn btn-dark'>Create FAQ</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
