import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../../../Components/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import FormValidators from '../../../Validators/FormValidators'
import { useDispatch, useSelector } from 'react-redux'
import { GetProduct, UpdateProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { GetCategory } from '../../../Redux/ActionCreators/CategoryActionCreator'
import { GetBrand } from '../../../Redux/ActionCreators/BrandActionCreator'
import { GetSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'

var rte;
export default function AdminUpdateProductPage() {

    var refdiv = useRef(null);
    let [data, setData] = useState({
        name: "",
        category: "",
        SubCategory: "",
        brand: "",
        color: [],
        size: [],
        stockQuantity: 1,
        stock: true,
        basePrice: 0,
        finalPrice: 0,
        discount: 0,
        productDescription: "",
        pic: [],
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
        // color: "",
        stockQuantity: "",
        basePrice: "",
        discount: "",
        productDescription: "",
    })
    let ProductStateData = useSelector(state => state.ProductStateData)
    let CategoryStateData = useSelector(state => state.CategoryStateData)
    let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
    let brandStateData = useSelector(state => state.brandStateData)
    let [show, setShow] = useState(false)
    let { id } = useParams()
    function GetInputData(e) {
        let name = e.target.name
        let value = e.target.files && e.target.files.length ? data.pic.concat(Array.from(e.target.files).map((x => "/products/" + x.name))) : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidators(e) : FormValidators(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value,
                [name]: name === "stock" ? (value === "1" ? true : false) : value

            }
        })
    }
    let navigate = useNavigate()
    function postData(e) {
        e.preventDefault(e)
        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let stockQty = parseInt(data.stockQuantity)
        let fp = Math.round(bp - bp * d / 100)
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            Dispatch(UpdateProduct({
                ...data,
                basePrice: bp,
                finalPrice: fp,
                discount: d,
                stockQuantity: stockQty,
                category: data.category ? data.category : "None",
                SubCategory: data.SubCategory ? data.SubCategory : "None",
                brand: data.brand ? data.brand : "None",
                productDescription: rte.getHTMLCode()
            }))
            navigate('/admin/products')

        }
    }

    function GetColor(e, field) {
        let name = e.target.name
        if (field === "color") {
            setData(old => ({
                ...old,
                color: old.color.includes(name)
                    ? old.color.filter(c => c !== name)  // remove if already selected
                    : [...old.color, name]               // add if not selected
            }));
        } else {
            if (field === "size") {
                setData((old)=>{return{
                    ...old,
                    size:old.size.includes(name)?old.size.filter(s=>s!==name):[...old.size,name]
                }})
            }
        }
        // setFlag(!flag)
    }
    let Dispatch = useDispatch()
    function GetApiData() {
        Dispatch(GetProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item) {
                setData({ ...data, ...item })
            }
            else {
                navigate("/admin/products")
            }
        }



    }
    useEffect(() => { GetApiData() }, [ProductStateData.length])
    useEffect(() => { Dispatch(GetCategory()) }, [CategoryStateData.length])
    useEffect(() => { Dispatch(GetBrand()) }, [brandStateData.length])
    useEffect(() => { Dispatch(GetSubCategory()) }, [SubCategoryStateData.length])

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])
    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-4">
                    <div className="row">
                        <div className="col-md-2"><AdminSidebar /></div>
                        <div className="col-md-10">
                            <h5 className='bg-dark text-light text-center py-2 px-2'> Update Product <Link to="/admin/products"><i className='bi bi-arrow-left text-light float-end'></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label htmlFor="CName">Product Name*</label>
                                        <input type="text" value={data.name} name="name" id="name" placeholder=' Product Name' onChange={GetInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="category">Category*</label>
                                            <select name="category" value={data.category} id="" className='form-select' onChange={GetInputData}>
                                                <option value="None">Select</option>
                                                {CategoryStateData.map((item) => {
                                                    return <option key={item.id}>{item.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3"><label htmlFor="SubCategory">Sub Category*</label>
                                            <select name="SubCategory" value={data.SubCategory} id="" className='form-select' onChange={GetInputData}>
                                                <option value="None">Select</option>{SubCategoryStateData.map((item) => {
                                                    return <option key={item.id}>{item.name}</option>
                                                })}
                                            </select></div>
                                        <div className="col-md-3 mb-3"><label htmlFor="brand">Brand*</label>
                                            <select name="brand" id="" value={data.brand} className='form-select' onChange={GetInputData}>
                                                {brandStateData.map((item) => {
                                                    return <option key={item.id}>{item.name}</option>
                                                })}
                                            </select></div>
                                        <div className="col-md-3 mb-3"><label htmlFor="stock">Stock*</label>
                                            <select name="stock" id="" value={data.stock} className='form-select' onChange={GetInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>

                                            </select></div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4"><label htmlFor="bp">Base Price*</label>
                                            <input type="text" value={data.basePrice} name="basePrice" id="bp" placeholder=' Base Price' onChange={GetInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}</div>
                                        <div className="col-md-4"><label htmlFor="discount">Discount(%)*</label>
                                            <input type="text" value={data.discount} name="discount" id="discount" placeholder=' Discount' onChange={GetInputData} className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}</div>
                                        <div className="col-md-4"><label htmlFor="fp">Final Price*</label>
                                            <input type="text" name="finalPrice" placeholder=' Final Price' onChange={GetInputData} className={`form-control ${show && errorMessage.finalPrice ? 'border-danger' : 'border-dark'}`} value={Math.floor(parseInt(data.basePrice) - parseInt(data.basePrice) * parseInt(data.discount) / 100)} readOnly />
                                            {show && errorMessage.finalPrice ? <p className='text-danger'>{errorMessage.finalPrice}</p> : null}</div>
                                    </div>
                                    <legend>Colors*</legend>
                                    <div className="row mb-3">
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="red" checked={data.color.includes("red")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Redcolor">Red</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="blue" checked={data.color.includes("blue")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Bluecolor">Blue</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="pink" checked={data.color.includes("pink")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Pinkcolor">Pink</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="black" checked={data.color.includes("black")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Blackcolor">Black</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="white" checked={data.color.includes("white")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Whitecolor">White</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="wine" checked={data.color.includes("wine")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Winecolor">Wine</label>
                                        </div>

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="violet" checked={data.color.includes("violet")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Violetcolor">Violet</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="green" checked={data.color.includes("green")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Greencolor">Green</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="brown" checked={data.color.includes("brown")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Browncolor">Brown</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="grey" checked={data.color.includes("grey")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Greycolor">Grey</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="yellow" checked={data.color.includes("yellow")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Yellowcolor">Yellow</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" name="beige" checked={data.color.includes("beige")} onChange={(e) => { GetColor(e, "color") }} />
                                            <label htmlFor="Beigecolor">Beige</label>
                                        </div>

                                    </div>
                                    <legend>Size*</legend>
                                    <div className="row mb-3   ">
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("xs")} name="xs" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Redcolor">XS</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("s")} name="s" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Bluecolor">S</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("m")} name="m" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Pinkcolor">M</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("l")} name="l" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Blackcolor">L</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("xl")} name="xl" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Whitecolor">XL</label>
                                        </div>
                                        <div className="col-md-2 ">
                                            <input type="checkbox" checked={data.size.includes("xxl")} name="xxl" onChange={(e) => { GetColor(e, "size") }} />
                                            <label htmlFor="Winecolor">XXL</label>
                                        </div>

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <label htmlFor="desc">Product Description*</label>
                                            <div ref={refdiv} ></div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="pic">Stock Quantity*</label>
                                            <input type="text" value={data.stockQuantity} name="stockQuantity" id="stockQuantity" onChange={GetInputData} className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="active">Active</label>
                                            <select name="active" value={data.active} className='form-select' onChange={GetInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3">

                                            <label htmlFor="pic">Product Picture*</label>
                                            <input type="file" multiple name="pic" id="pic" onChange={GetInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                        </div>

                                        <div className="col-md-6 mb-3"> <label htmlFor="pic">Click the Product Picture to remove*</label>
                                            <div> {data.pic?.map((item, index) => {
                                                return <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item}`} onClick={() => {
                                                    // data.pic.splice(index, 1)
                                                    setData((old)=>{return{
                                                        ...old,
                                                        pic:old.pic.filter(p=>p!== item)
                                                    }})
                                                    // setFlag1(!flag1)
                                                }} key={index} width={60} className='mx-1' height={60} />
                                            })}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className='my-3 btn btn-dark'>Update Product</button>
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
