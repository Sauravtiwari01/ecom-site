import React, { useEffect } from 'react'
import { GetFeature } from '../Redux/ActionCreators/FeatureActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import db from "../data/data.json"
export default function Features() {
    let FeatureStateData = db.feature
    let Dispatch = useDispatch()
    useEffect(() => {
        (() => { Dispatch(GetFeature()) })()
    }, [FeatureStateData.length])
    return (
        <>
            {/*start features*/}
            <section className="product-thumb-slider section-padding">
                <div className="container">
                    <div className="text-center pb-3 m-3">
                        <h3 className="mb-0 h3 fw-bold">What We Offer!</h3>
                        <p className="mb-0 text-capitalize">Our Features</p>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-4 g-4">
                        {
                            FeatureStateData.filter(x => x.active).map(item => {
                                return <div key={item.id} className="col d-flex">
                                    <div className="card depth border-0 rounded-0 border-bottom border-primary border-3 w-100">
                                        <div className="card-body text-center">
                                            <div className="h1 fw-bold my-2 text-primary">
                                                <span dangerouslySetInnerHTML={{__html:item.icon}}></span>
                                            </div>
                                            <h5 className="fw-bold">{item.name}</h5>
                                            <p className="mb-0">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            })}


                    </div>
                    {/*end row*/}
                </div>
            </section>
            {/*end features*/}

        </>
    )
}
