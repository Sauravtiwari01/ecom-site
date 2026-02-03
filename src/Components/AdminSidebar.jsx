import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <>
    <div className="list-group">
  <Link to="/admin"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-house text-light'></i><span className='float-end '>Home</span></Link>
  <Link to="/admin/category"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-grid text-light'></i><span className='float-end '>Category</span></Link>
  <Link to="/admin/sub-category"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-grid text-light'></i><span className='float-end '>Sub Category</span></Link>
  <Link to="/admin/products"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-box text-light'></i><span className='float-end '>Products</span></Link>
  <Link to="/admin/brands"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-tag text-light'></i><span className='float-end '>Brand</span></Link>
  <Link to="/admin/orders"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-cart text-light'></i><span className='float-end '>Orders</span></Link>
  <Link to="/admin/manage-newsletters"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-envelope text-light'></i><span className='float-end '>Newsletter</span></Link>
  <Link to="/admin/users"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-person text-light'></i><span className='float-end '>User</span></Link>
  <Link to="/admin/contact-us"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-chat-text text-light'></i><span className='float-end '>Contact Us</span></Link>
  <Link to="/admin/feature"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-stars text-light'></i><span className='float-end '>Features</span></Link>
  <Link to="/admin/settings"className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-gear text-light'></i><span className='float-end '>Setting</span></Link>
  <Link to="/admin/faq "className="list-group-item list-group-item-action bg-dark active" aria-current="true"><i className='bi bi-question-circle text-light'></i><span className='float-end '>FAQs</span></Link>
 
 

</div>
 
    </>
  )
}
