import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import GridItem from '../GridItem/GridItem';
import './GridView.scss';

const GridView = () => {
  const [products,setProducts] = useState([]);
  const [product,setProduct] = useState({});
  console.log(products);

  useEffect(() => {
    fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  },[])

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newProduct = {...product};
    newProduct[field] = value;
    console.log(newProduct);
    setProduct(newProduct);
 }

const handleAddProduct = (e) => {
  e.preventDefault();

  // collect data
  const addproduct = {...product};
  console.log(addproduct);

  //send to server
  fetch('http://localhost:5000/products',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addproduct)
  })
  .then(res => res.json())
  .then(data => {
    if(data.insertedId){
      // field clear
      e.target.reset();

      Swal.fire(
        'Done!',
        'You have added product successfully!',
        'success'
      )
      window.location.reload();
    }
  })
}

    return (
        <>
        <div className='dashboard'>
          <Sidebar/>
          <div className="dashboard-container mt-5">
          <div className='mt-5 view'>
        <div className='products'>
          <button type="" className='btn btn-outline-primary mt-5 add-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@getbootstrap">Add Product</button>
          <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content modal-custom">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleAddProduct}>
                  <div className="mb-3">
                    <label for="product-name" className="col-form-label">Product Name:</label>
                    <input onBlur={handleOnBlur} type="text" name='product_name' className="form-control" id="product-name"/>
                  </div>
                  <div className="mb-3">
                    <label for="product-sku" className="col-form-label">Product SKU:</label>
                    <input onBlur={handleOnBlur} type="text" name='id' className="form-control" id="product-sku"/>
                  </div>
                  <div className="mb-3">
                    <label for="price" className="col-form-label">Price:</label>
                    <input onBlur={handleOnBlur} type="text" name='price' className="form-control" id="price"/>
                  </div>
                  <div className="mb-3">
                    <label for="product-image" className="col-form-label">Product Image Url:</label>
                    <input onBlur={handleOnBlur} accept='image/*' type="text" name='image' className="form-control" id="product-image"/>
                  </div>
                  <div className="mb-3">
                    <label for="quantity" className="col-form-label">Quantity:</label>
                    <input onBlur={handleOnBlur} type="number" name='quantity' className="form-control" id="quantity"/>
                  </div>
                  <div className="mb-3">
                    <input className='btn btn-outline-primary' type="submit" value='Submit'/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className='grid-tabular-wrapper'>
          <div className='grid'>
            <Link to="/gridview" className='btn btn-outline-primary mt-5'><i className="fa-solid fa-border-all"></i> Grid View</Link>
          </div>
          <div className='tabular'>
            <Link to='/tabularview' className='btn btn-outline-primary mt-5'><i className="fa-solid fa-bars"></i> Tabular View</Link>
          </div>
        </div>
        </div>
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {
                  products.map(product => <GridItem
                  
                  key={product.id}
                  product={product}  
                  ></GridItem>)
                }
          </div>
        </div>
      </div>
    </div>   
    </>
    );
};

export default GridView;