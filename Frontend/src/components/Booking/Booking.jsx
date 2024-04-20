import React, { useContext, useState } from "react";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./booking.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "./../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const {user}=useContext(AuthContext)
  const navigater=useNavigate()

    const { price, reviews,title } = tour;
    const [booking, setBooking] = useState({
      userId: user ? user.data._id : "",
      userEmail: user ? user.data.email : "",
      tourName: title,
      fullName: "",
      phone: "",
      guestSize: 1,
      bookAt: ""
    });

    

    const serviceFee=10 
    const totalAmount=Number(price)*Number(booking.guestSize)+Number(serviceFee)

    const handleChange = e=>{
      setBooking((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    

    const handleClick= async e=>{
      e.preventDefault()

      console.log(booking)
      try {
        if (!user || user === undefined || user === null) {
         return  alert("You must be logged in to submit a review");
        }
  
        const res = await fetch(`${BASE_URL}/booking`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(booking),
          }
        );
        const result = await res.json();
        
        if(!res.ok){
          return alert(result.massage);
      
        } 
        navigater("/thank-you");
    
      } catch (e) {
        alert(e.massage);
      }
    
      
    }
 
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* ---------------------------booking end------------ */}

      {/* ---------------------------booking bottom------------ */}

      <div className="booking__bottom">
        <h5>Payment</h5>
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-line"> </i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="total border-0 px-0 ">
            <h5>Total </h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button  className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
