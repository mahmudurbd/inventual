import React, { useEffect, useState } from 'react';
import './Products.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DeleteOutlined} from '@ant-design/icons';
import Swal from 'sweetalert2';
import Search from 'antd/lib/transfer/search';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [product,setProduct] = useState({});
  console.log(products);

  useEffect( ()=> {
    fetch('https://inventual-server.vercel.app/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  },[])

  
  // search item
  const [searchTerm,setSearchTerm] = useState('');
  console.log(searchTerm);

  /* products.map(item => {
    if(item.product_name.toLowerCase().includes(searchTerm).toLowerCase()){
      return item;
    }
  }) */


  // handle
  const handleDelete = (id) => {
    fetch(`https://inventual-server.vercel.app/products/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Deleted successfully'
        })
        window.location.reload();
      }
    })
  }

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

    //send to server data
    fetch('https://inventual-server.vercel.app/products',{
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

const columns = [
    { field: 'id', headerName: 'Product SKU', width: 100 },
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => {
      return(
        <div className='product-image '>
          <img className='img-fluid' src={params.row.image} alt="" />
        </div>
      )
    } },
    { field: 'product_name', headerName: 'Product Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 200 },
    { field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
      return(
      <div className='product-action'>
       {/*  <Link to={"/product/"+ params.row.id}>
          <EditOutlined className='edit-btn' />
        </Link> */}
        <DeleteOutlined className='delete-btn' onClick={() => handleDelete(params.row._id)}/>
      </div>
      )
    } },
  ];
  
    return (
      <>
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
                    <label for="product-id" className="col-form-label">Product SKU:</label>
                    <input onBlur={handleOnBlur} type="text" name='id' className="form-control" id="product-id"/>
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
        <div className='products-table shadow-lg p-5'>
          
        <Search onChange={(e) => setSearchTerm(e.target.value)} placeholder="input search text"  enterButton />
        
            <DataGrid
                rows={products}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
            
    </div>
    </>
    );
};

export default Products;