import PasswordValidator from 'password-validator';
// Create a schema
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



export default function FormValidators(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "icon":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 4 || value.length > 50) {
                return "Length should be between 4 - 50"
            }
            else {
                return ""
            }

        case "userName":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 4 || value.length > 20) {
                return "Length should be between 4 - 20"
            }
            else {
                return ""
            }

        case "mobile":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length !== 10) {
                return "Enter valid mobile number"
            }
            else {
                return ""
            }

        case "email":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            } else if (!value.includes("@")) {
                return "Enter Valid Email"
            }
            else if (value.length < 12 || value.length > 50) {
                return "Length should be between 12 - 50"
            }
            else {
                return ""
            }

        case "pwd":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (!schema.validate(value)) {
                return "Invalid  Password,It must contain max 20 characters,atleast  1 uppercase,1 lowercase,No spaces,1 digit"
            }
            else {
                return ""
            }
        case "pincode":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length !== 6) {
                return "Invalid Pincode"
            }
            else {
                return ""
            }
        case "locality":
        case "district":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 3 || value.length > 20) {
                return "enter Locality"
            }
            else {
                return ""
            }

        case "description":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 10 || value.length > 550) {
                return "Length should be between 50 - 550"
            }
            else {
                return ""
            }
        case "message":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 5 || value.length > 550) {
                return "Length should be between 5 - 550"
            }
            else {
                return ""
            }
        case "color":
            if (!value || value.length === 0) {
                return "Please Select Color"
            }
            else {
                return ""
            }
        case "size":
            if (!value || value.length === 0) {
                return "Please Select Size"
            }
            else {
                return ""
            }
        case "question":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 5 || value.length > 100) {
                return "Length should be between 5 - 100"
            }
            else {
                return ""
            }
        case "review":
            if (!value || value.length === 0) {
                return "Can't leave blank"
            }
            else if (value.length < 3 || value.length > 500) {
                return "Length should be between 3 - 500"
            }
            else {
                return ""
            }
        case "answer":
            if (!value || value.length === 0) {
                return "Field is Mandatory"
            }
            else if (value.length < 5 || value.length > 200) {
                return "Length should be between 5 - 200"
            }
            else {
                return ""
            }
        case "basePrice":
            if (!value || value.length === 0) {
                return "Base Price is Mandatory"
            }
            else if (value.length < 0 || value.length > 1000000) {
                return "price should be more than 1"
            }
            else {
                return ""
            }
        case "discount":
            if (!value || value.length === 0) {
                return "discount is Mandatory"
            }
            else if (value.length < 0 || value.length > 100) {
                return "discount should be between 0 - 100"
            }
            else {
                return ""
            }
        default:
            return ""
    }

}
