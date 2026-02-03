export default function ImageValidators(e) {
  if(e.target.files[0] && e.target.files.length===1){
    let pic = e.target.files[0]
    if(!["image/jpeg","image/png","image/jpg","image/webp"].includes(pic.type)){
        return "Format Not Supported. Only JPEG, JPG, WEBP, & PNG"
    }else if(pic.size>1048576){
        return "Please upload less than 1MB"
    }else{
        return ""
    }
  }else{
    
  }
}
