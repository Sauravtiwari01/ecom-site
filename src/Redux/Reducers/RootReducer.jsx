import { combineReducers } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryReducer";
import SubCategoryReducer from "./SubCategoryReducer";
import BrandReducer from "./BrandReducer";
import FeatureReducer from "./FeatureReducer";
import FAQReducer from "./FAQReducer";
import ProductReducer from "./ProductReducer";
import SettingReducer from "./SettingReducer";
import TestimonialReducer from "./TestimonialReducer";
import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import NewsletterReducer from "./NewsletterReducer";
import AddressReducer from "./AddressReducer";
import OrderReducer from "./OrderReducer";
import UserReducer from "./UserReducer";
import ContactUSReducer from "./ContactUsReducer";

export default combineReducers(
    {
       CategoryStateData: CategoryReducer,
       SubCategoryStateData:SubCategoryReducer,
       brandStateData:BrandReducer,
       FeatureStateData:FeatureReducer,
       FAQStateData:FAQReducer,
       ProductStateData:ProductReducer,
       settingStateData:SettingReducer,
       testimonialStateData:TestimonialReducer,
       cartStateData:CartReducer,
       wishlistStateData:WishlistReducer,
       newsletterStateData:NewsletterReducer,
       addressStateData:AddressReducer,
       orderStateData:OrderReducer,
       userStateData:UserReducer,
       contactUsStateData:ContactUSReducer
    }
)