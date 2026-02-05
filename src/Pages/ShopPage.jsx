import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategory } from '../Redux/ActionCreators/CategoryActionCreator'
import { GetProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { GetBrand } from '../Redux/ActionCreators/BrandActionCreator'
import { GetSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreator'
import { Link, useSearchParams } from 'react-router-dom'
import db from "../data/data.json"
import ProductCard from '../Components/ProductCard'
export default function ShopPage() {
  let CategoryStateData = db.category
  let ProductStateData = db.products
  let SubCategoryStateData = db['sub-category']
  let brandStateData = db.brands
  let Dispatch = useDispatch()
  let [search, setSearch] = useState("")
  let [product, setProduct] = useState([])
  let [sortFilter, setSortFilter] = useState("1")
  let [selectedCategory, setSelectedCategory] = useState([])
  let [selectedSubCategory, setSelectedSubCategory] = useState([])
  let [selectedBrand, setSelectedBrand] = useState([])
  let [selectedColor, setSelectedColor] = useState([])
  let [selectedSize, setSelectedSize] = useState([])
  let [min, setMin] = useState(0)
  let [max, setMax] = useState(1000)
  let [flag, setFlag] = useState(false)
  let [searchParams] = useSearchParams()

  function searchFilter(e) {
    e.preventDefault()
    let searchInput = search.toLocaleLowerCase()
    let data = ProductStateData.filter(x => x.active && (
      x?.name?.toLocaleLowerCase().includes(searchInput)) ||
      x?.category?.toLocaleLowerCase() === searchInput ||
      x?.SubCategory?.toLocaleLowerCase() === searchInput ||
      x?.brand?.toLocaleLowerCase() === searchInput ||
      x?.color?.includes(searchInput)
    )
    if (sortFilter === "1")
      setProduct(data.sort((x, y) => y.id.localeCompare(x.id)))
    else if (sortFilter === "2")
      setProduct(data.sort((x, y) => y.discount - x.discount))
    else if (sortFilter === "3")
      setProduct(data.sort((x, y) => y.finalPrice - x.finalPrice))
    else
      setProduct(data.sort((x, y) => x.finalPrice - y.finalPrice))

    setSearch("")
  }
  function applySortFilter(option) {
    setSortFilter(option)
    if (option === "1")
      setProduct(product.sort((x, y) => y.id.localeCompare(x.id)))
    else if (option === "2")
      setProduct(product.sort((x, y) => y.discount - x.discount))
    else if (option === "3")
      setProduct(product.sort((x, y) => y.finalPrice - x.finalPrice))
    else
      setProduct(product.sort((x, y) => x.finalPrice - y.finalPrice))

  }

  function isInclude(arr1, arr2) {
    return arr1.some(item => arr2.includes(item))
  }


  function applyFilter(ct, st, br, color, size, min = -1, max = -1) {
    let data = ProductStateData.filter(x => x.active &&
      (ct.length === 0 || ct.includes(x.category)) &&
      (st.length === 0 || st.includes(x.SubCategory)) &&
      (br.length === 0 || br.includes(x.brand)) &&
      (color.length === 0 || isInclude(color, x.color)) &&
      (size.length === 0 || isInclude(size, x.size)) &&
      (min === -1 || (x.finalPrice >= min && x.finalPrice <= max))
    )

    if (sortFilter === "1")
      setProduct(data.sort((x, y) => y.id.localeCompare(x.id)))
    else if (sortFilter === "2")
      setProduct(data.sort((x, y) => y.discount - x.discount))
    else if (sortFilter === "3")
      setProduct(data.sort((x, y) => y.finalPrice - x.finalPrice))
    else
      setProduct(data.sort((x, y) => x.finalPrice - y.finalPrice))
  }

  function selectCollection(collection) {
    if (collection === "category")
      return selectedCategory
    else if (collection === "SubCategory")
      return selectedSubCategory
    else if (collection === "brand")
      return selectedBrand
    else if (collection === "color")
      return selectedColor
    else if (collection === "size")
      return selectedSize
  }

  function mainFilter(collection, value) {
    let data = selectCollection(collection)
    if (data.includes(value)) {
      let index = data.indexOf(value)
      data.splice(index, 1)
    }
    else
      data.push(value)

    setFlag(!flag)
    if (collection === "category") {
      setSelectedCategory(data)
      applyFilter(data, selectedSubCategory, selectedBrand, selectedColor, selectedSize)
    }
    else if (collection === "SubCategory") {
      setSelectedSubCategory(data)
      applyFilter(selectedCategory, data, selectedBrand, selectedColor, selectedSize)
    }
    else if (collection === "brand") {
      setSelectedBrand(data)
      applyFilter(selectedCategory, selectedSubCategory, data, selectedColor, selectedSize)
    }
    else if (collection === "color") {
      setSelectedColor(data)
      applyFilter(selectedCategory, selectedSubCategory, selectedBrand, data, selectedSize)
    }
    else if (collection === "size") {
      setSelectedSize(data)
      applyFilter(selectedCategory, selectedSubCategory, selectedBrand, selectedColor, data)
    }

  }

  useEffect(() => { (() => { Dispatch(GetCategory()) })() }, [CategoryStateData.length])
  useEffect(() => { (() => { Dispatch(GetSubCategory()) })() }, [SubCategoryStateData.length])
  useEffect(() => { (() => { Dispatch(GetBrand()) })() }, [brandStateData.length])
  useEffect(() => { Dispatch(GetProduct()) }, [])
  useEffect(() => {
    const ct = searchParams.get("cg") ? [searchParams.get("cg")] : []
    const st = searchParams.get("sc") ? [searchParams.get("sc")] : []
    const br = searchParams.get("br") ? [searchParams.get("br")] : []

    setSelectedCategory(ct)
    setSelectedSubCategory(st)
    setSelectedBrand(br)
    console.log(ct,st,br);
    
  }, [searchParams.toString()])

  useEffect(() => {
    if (ProductStateData.length) {
      applyFilter(
        selectedCategory,
        selectedSubCategory,
        selectedBrand,
        selectedColor,
        selectedSize
      )
    }
  }, [
    ProductStateData.length,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedColor,
    selectedSize
  ])

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Shop" />
        {/*start product grid*/}
        <section className="section-padding">
          <h5 className="mb-0 fw-bold d-none">Product Grid</h5>
          <div className="container">
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-funnel me-1" /> Filters
              </span>
            </div>
            <div className="row">
              {/* FILTER */}
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Filters
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <div className="filter-sidebar">
                        <div className="card rounded-0">
                          <div className="card-header d-none d-xl-block bg-transparent">
                            <h5 className="mb-0 fw-bold">Filters</h5>
                          </div>
                          <div className="card-body">
                            <h6 className="p-1 fw-bold bg-light">Categories</h6>
                            <div className="categories">
                              <div className="categories-wrapper height-1 p-1">
                                {CategoryStateData.map(item => {
                                  return <div key={item.id} className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={item.name}
                                      checked={selectedCategory.includes(item.name)}
                                      onChange={() => mainFilter("category", item.name)}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={item.name}
                                    >
                                      <span>{item.name}</span>
                                      <span className="product-number">({ProductStateData.filter(x => x.category === item.name).length})</span>
                                    </label>
                                  </div>
                                })}



                              </div>
                            </div>
                            <hr />

                            <h6 className="p-1 fw-bold bg-light">Sub Categories</h6>
                            <div className="categories">
                              <div className="categories-wrapper height-1 p-1">
                                {SubCategoryStateData.map(item => {
                                  return <div key={item.id} className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={item.name}
                                      checked={selectedSubCategory.includes(item.name)}
                                      onChange={() => mainFilter("SubCategory", item.name)}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={item.name}
                                    >
                                      <span>{item.name}</span>
                                      <span className="product-number">({ProductStateData.filter(x => x.SubCategory === item.name).length})</span>
                                    </label>
                                  </div>
                                })}



                              </div>
                            </div>
                            <hr />
                            <h6 className="p-1 fw-bold bg-light">Brands</h6>
                            <div className="categories">
                              <div className="categories-wrapper height-1 p-1">
                                {brandStateData.map(item => {
                                  return <div key={item.id} className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={item.name}
                                      checked={selectedBrand.includes(item.name)}
                                      onChange={() => mainFilter("brand", item.name)}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={item.name}
                                    >
                                      <span>{item.name}</span>
                                      <span className="product-number">({ProductStateData.filter(x => x.brand === item.name).length})</span>
                                    </label>
                                  </div>
                                })}


                              </div>
                            </div>
                            <hr />
                            <div className="Price">
                              <h6 className="p-1 fw-bold bg-light">Price</h6>
                              <div className="Price-wrapper p-1">
                                <div className="input-group">
                                  <input
                                    type="number"
                                    className="form-control rounded-0"
                                    onChange={(e) => setMin(e.target.value)}
                                    value={min}
                                    name='min'
                                    placeholder="min"
                                  />
                                  <span className="input-group-text bg-section-1 border-0">
                                    -
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control rounded-0"

                                    onChange={(e) => setMax(e.target.value)}
                                    value={max}
                                    name='max'
                                    placeholder="max"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-dark rounded-0 ms-2"
                                    onClick={() => applyFilter(selectedCategory, selectedSubCategory, selectedBrand, selectedColor, selectedSize, min, max)}
                                  >
                                    <i className="bi bi-chevron-right" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="colors">
                              <h6 className="p-1 fw-bold bg-light">Colors</h6>
                              <div className="color-wrapper height-1 p-1">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="red"
                                    checked={selectedColor.includes("red")}
                                    onChange={() => mainFilter("color", "red")}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="red"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-danger" />
                                    <span>Red</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("red")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedColor.includes("blue")}
                                    onChange={() => mainFilter("color", "blue")}
                                    id="blue"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="blue"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-primary" />
                                    <span>Blue</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("blue")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedColor.includes("pink")}
                                    onChange={() => mainFilter("color", "pink")}
                                    id="pink"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="pink"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-pink" />
                                    <span>Pink</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("pink")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("black")}
                                    onChange={() => mainFilter("color", "black")}
                                    id="black"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="black"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-dark" />
                                    <span>Black</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("black")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("white")}
                                    onChange={() => mainFilter("color", "white")}
                                    id="white"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="white"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-light" />
                                    <span>White</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("white")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("wine")}
                                    onChange={() => mainFilter("color", "wine")}
                                    id="wine"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="wine"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-wine" />
                                    <span>Wine</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("wine")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("violet")}
                                    onChange={() => mainFilter("color", "violet")}
                                    id="violet"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="violet"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-violet" />
                                    <span>Violet</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("violet")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("green")}
                                    onChange={() => mainFilter("color", "green")}
                                    id="green"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="green"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-success" />
                                    <span>Green</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("green")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("brown")}
                                    onChange={() => mainFilter("color", "brown")}
                                    id="brown"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="brown"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-brown" />
                                    <span>Brown</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("brown")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("grey")}
                                    onChange={() => mainFilter("color", "grey")}
                                    id="blue"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="blue"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-gray" />
                                    <span>Grey</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("grey")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("yellow")}
                                    onChange={() => mainFilter("color", "yellow")}
                                    id="yellow"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="yellow"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-warning" />
                                    <span>Yellow</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("yellow")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedColor.includes("beige")}
                                    onChange={() => mainFilter("color", "beige")}
                                    id="beige"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="beige"
                                  >
                                    <i className="bi bi-circle-fill me-1 text-beige" />
                                    <span>Beige</span>
                                    <span className="product-number">({ProductStateData.filter(c => c.color.includes("beige")).length})</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="colors"> {/*size */}
                              <h6 className="p-1 fw-bold bg-light">Size</h6>
                              <div className="color-wrapper height-1 p-1">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("xs")}
                                    onChange={() => mainFilter("size", "xs")}
                                    id="xs"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="xs"
                                  >
                                    <span>XS</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("xs")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("s")}
                                    onChange={() => mainFilter("size", "s")}
                                    id="s"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="s"
                                  >
                                    <span>S</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("s")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("m")}
                                    onChange={() => mainFilter("size", "m")}
                                    id="m"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="m"
                                  >
                                    <span>M</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("m")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("l")}
                                    onChange={() => mainFilter("size", "l")}
                                    id="l"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="l"
                                  >
                                    <span>L</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("l")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("xl")}
                                    onChange={() => mainFilter("size", "xl")}
                                    id="xl"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="xl"
                                  >
                                    <span>XL</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("xl")).length})</span>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox" checked={selectedSize.includes("xxl")}
                                    onChange={() => mainFilter("size", "xxl")}
                                    id="xxl"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="xxl"
                                  >
                                    <span>XXL</span>
                                    <span className="product-number">({product.filter(c => c.size.includes("xxl")).length})</span>
                                  </label>
                                </div>

                              </div>
                            </div>
                            <hr />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-9">
                <div className="shop-right-sidebar">
                  <div className="card rounded-0">
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center justify-content-between bg-light p-2">
                        <form onSubmit={searchFilter}>
                          <div className='btn-group'>
                            <input type="search" className='form-control' name="search" onChange={(e) => setSearch(e.target.value)} value={search} />
                            <button type='submit' className='btn btn-dark ' >Search</button>
                          </div></form>
                        <div className="product-count mx-3">{product.length} Items Found</div>

                        <form>
                          {/* SORT */}
                          <div className="input-group">
                            <span className="input-group-text bg-transparent rounded-0 border-0">
                              Sort By
                            </span>
                            <select value={sortFilter} onChange={(e) => applySortFilter(e.target.value)} className="form-select rounded-0">
                              <option value="1">Whats'New</option>
                              <option value="2">Better Discount</option>
                              <option value="3">Price : High to Low</option>
                              <option value="4">Price : Low to High</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="product-grid mt-4">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      {product.map(item => {
                        {
                          return <div key={item.id} className="col">
                            <ProductCard item={item} />
                          </div>
                        }
                      })}



                    </div>
                    {/*end row*/}
                  </div>
                  <hr className="my-4" />
                  <div className="product-pagination">
                    <nav>
                      <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                          <a className="page-link">Previous</a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="javascript:;">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:;">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:;">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="javascript:;">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>

  )
}
