import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import Features from '../Components/Features'

export default function FeaturesPage() {
  return (
        <>
  {/*start features*/}
  <div className='page-content'>
    <Breadcrumb title="Features"/>
  <Features/>
  {/*end features*/}
  </div>
</>
  )
}
