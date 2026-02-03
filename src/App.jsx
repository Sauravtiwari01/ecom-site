import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./Components/Navbar.jsx"
import Footer from "./Components/Footer.jsx"
import HomePage from "./Pages/Homepage.jsx"
import ShopPage from './Pages/ShopPage.jsx'
import AboutPage from './Pages/AboutPage.jsx'
import BuyerAddress from './Pages/BuyerAddress.jsx'
import ContactUs from './Pages/ContactUs.jsx'
import DashboardPage from './Pages/DashboardPage.jsx'
import ForgetPassword from './Pages/ForgetPassword.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import OrdersPage from './Pages/OrdersPage.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import UpdateProfile from './Pages/UpdateProfile.jsx'
import WishlistPage from './Pages/WishlistPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import ProductPage from './Pages/ProductPage.jsx'
import TestimonialPage from './Pages/TestimonialPage.jsx'
import FeaturesPage from './Pages/FeaturesPage.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import AdminPage from './Pages/Admin/AdminPage.jsx'
import AdminCategoryPage from './Pages/Admin/Category/AdminCategoryPage.jsx'
import AdminCreateCategoryPage from './Pages/Admin/Category/AdminCreateCategoryPage.jsx'
import AdminUpdateCategoryPage from './Pages/Admin/Category/AdminUpdateCategoryPage.jsx'
import AdminSubCategoryPage from './Pages/Admin/SubCategory/AdminSubCategoryPage.jsx'
import AdminCreateSubCategory from './Pages/Admin/SubCategory/AdminCreateSubCategory.jsx'
import AdminUpdateSubCategory from './Pages/Admin/SubCategory/AdminUpdateSubCategory.jsx'
import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage.jsx'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage.jsx'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage.jsx'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage.jsx'
import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage.jsx'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage.jsx'
import AdminFAQPage from './Pages/Admin/FAQs/AdminFAQPage.jsx'
import AdminCreateFAQPage from './Pages/Admin/FAQs/AdminCreateFAQPage.jsx'
import AdminUpdateFAQPage from './Pages/Admin/FAQs/AdminUpdateFAQPage.jsx'
import AdminCreateProductPage from './Pages/Admin/Products/AdminCreateProductPage.jsx'
import AdminUpdateProductPage from './Pages/Admin/Products/AdminUpdateProductPage.jsx'
import AdminProductPage from './Pages/Admin/Products/AdminProductPage.jsx'
import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage.jsx'
import Signup from './Pages/Signup.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import OrderConfirmationPage from './Pages/OrderConfirmationPage.jsx'
import AdminContactUsPage from './Pages/Admin/Contact Us/AdminContactUsPage.jsx'
import AdminContactUsViewPage from './Pages/Admin/Contact Us/AdminContactUsViewPage.jsx'
import AdminOrdersPage from './Pages/Admin/Orders/AdminOrdersPage.jsx'
import AdminManageOrdersPage from './Pages/Admin/Orders/AdminManageOrdersPage.jsx'
import AdminManageNewsletterPage from './Pages/Admin/Newsletter/AdminManageNewsletterPage.jsx'
import AdminUsersPage from './Pages/Admin/Users/AdminUsersPage.jsx'
import AdminManageUsersPage from './Pages/Admin/Users/AdminManageUsersPage.jsx'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='https://sauravtiwari01.github.io/ecom-site/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/shop/products/:id' element={<ProductPage />} />
          <Route path='/testimonial' element={<TestimonialPage />} />
          <Route path='/features' element={<FeaturesPage />} />
          <Route path='/*' element={<ErrorPage />} />


          {/* Admin Routes */}
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/category' element={<AdminCategoryPage />} />
          <Route path='/admin/category/create-category' element={<AdminCreateCategoryPage />} />
          <Route path='admin/category/update/:id' element={<AdminUpdateCategoryPage />} />

          <Route path='/admin/sub-category' element={<AdminSubCategoryPage />} />
          <Route path='/admin/sub-category/create-sub-category' element={<AdminCreateSubCategory />} />
          <Route path='/admin/sub-category/update/:id' element={<AdminUpdateSubCategory />} />

          <Route path='/admin/brands' element={<AdminBrandPage />} />
          <Route path='/admin/brands/create-brand' element={<AdminCreateBrandPage />} />
          <Route path='/admin/brands/update/:id' element={<AdminUpdateBrandPage />} />

          <Route path='/admin/feature' element={<AdminFeaturePage />} />
          <Route path='/admin/feature/create-feature' element={<AdminCreateFeaturePage />} />
          <Route path='/admin/feature/update/:id' element={<AdminUpdateFeaturePage />} />

          <Route path='/admin/products' element={<AdminProductPage />} />
          <Route path='/admin/products/create-product' element={<AdminCreateProductPage/>} />
          <Route path='/admin/products/update/:id' element={<AdminUpdateProductPage/>} />

          <Route path='/admin/faq' element={<AdminFAQPage />} />
          <Route path='/admin/faq/create-faq' element={<AdminCreateFAQPage />} />
          <Route path='/admin/faq/update/:id' element={<AdminUpdateFAQPage />} />

          <Route path='/admin/settings' element={<AdminSettingPage/>}/>

          <Route path='/admin/contact-us' element={<AdminContactUsPage/>}/>
          <Route path='/admin/contact-us-view-message' element={<AdminContactUsViewPage/>}/>

          <Route path='/admin/orders' element={<AdminOrdersPage/>} />
          <Route path='/admin/orders/manage-orders/:id' element={<AdminManageOrdersPage/>} />

          <Route path='/admin/manage-newsletters' element={<AdminManageNewsletterPage/>} />
          
          <Route path='/admin/users' element={<AdminUsersPage/>} />
          <Route path='/admin/manage-users/:id' element={<AdminManageUsersPage/>} />
          {/* buyer routes */}
          <Route path='/address' element={<BuyerAddress />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/reset-password' element={<ForgetPassword />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/cart/checkout' element={<CheckoutPage/>} />
          <Route path='/checkout/order-confirmation' element={<OrderConfirmationPage/>} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
