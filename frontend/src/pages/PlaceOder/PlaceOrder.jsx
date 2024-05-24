import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Total amount including delivery fee
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };
  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder='First Name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder='Last Name'
          />
        </div>
        <input
          required
          type="email"
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          placeholder='Email address'
        />
        <input
          required
          type="text"
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          placeholder='Street'
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            placeholder='City'
          />
          <input
            required
            type="text"
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            placeholder='State'
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="number"
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder='Zip code'
          />
          <input
            required
            type="text"
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            placeholder='Country'
          />
        </div>
        <input
          required
          type="number"
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          placeholder='Phone'
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>$2.00</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${(getTotalCartAmount() + 2).toFixed(2)}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
