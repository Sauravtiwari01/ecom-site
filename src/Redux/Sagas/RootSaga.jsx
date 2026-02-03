import { all } from "redux-saga/effects";
import { CategorySaga } from "./CategorySaga";
import { SubCategorySaga } from "./SubCategorySaga";
import { BrandSaga } from "./BrandSaga";
import { FeatureSaga } from "./FeatureSaga";
import { FAQSaga } from "./FAQSaga";
import { ProductSaga } from "./ProductSaga";
import { SettingSaga } from "./SettingSaga";
import { TestimonialSaga } from "./TestimonialSaga";
import { CartSaga } from "./CartSaga";
import { WishlistSaga } from "./WishlistSaga";
import { NewsletterSaga } from "./NewsletterSaga";
import { AddressSaga } from "./AddressSaga";
import { OrderSaga } from "./OrderSaga";
import { UserSaga } from "./UserSaga";
import { ContactusSaga } from "./ContactUsSaga";

export default function* RootSaga() {
    yield all([
        CategorySaga(),
        SubCategorySaga(),
        BrandSaga(),
        FeatureSaga(),
        FAQSaga(),
        ProductSaga(),
        SettingSaga(),
        TestimonialSaga(),
        CartSaga(),
        WishlistSaga(),
        NewsletterSaga(),
        AddressSaga(),
        OrderSaga(),
        UserSaga(),
        ContactusSaga()

    ])
}