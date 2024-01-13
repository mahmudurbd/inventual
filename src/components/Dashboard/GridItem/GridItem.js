import React, { useState } from 'react';
import './GridItem.scss';
import Swal from 'sweetalert2';

const GridItem = (props) => {
    const {product_name,image,price,quantity,_id} = props.product;
    const [products, setProducts] = useState([]);
    const handleDelete = (id) => {
      fetch(`https://inventual-server.vercel.app/products/${id}`,{
      method: 'DELETE'

    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        Swal.fire(
          'Done!',
          'You have deleted successfully!',
          'success'
        )
        setProducts(products.filter(item => item.id !== id));
        window.location.reload();
      }
    })
  }

    return (
        <div className="col">
    <div className="card h-100 shadow">
      <img src={image} className="card-img-top p-3" alt="Hollywood Sign on The Hill" height="250"/>
      <div className="card-body">
        <h5 className="card-title">{product_name}</h5>
        <p className="card-text">
          This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
        <div className='d-flex justify-content-between'>
            <h6 className='fw-bold'>Price: {price}</h6>
            <h6 className='fw-bold'>Quantity: {quantity}</h6>
        </div>
        <div className='d-flex justify-content-center'>
            {/* <button className='view-btn'>View</button> */}
            <button onClick={()=> handleDelete(_id)} className='grid-delete-btn w-100 mt-2'>Delete</button>
        </div>
      </div>
    </div>
  </div>
    );
};

export default GridItem;