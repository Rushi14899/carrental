// BookingModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BookingModal = ({ showModal, handleClose, carName, pickupDate, returnDate, pricePerDay, onSubmit }) => {
  const initialFormState = {
    fullName: '',
    mobileNumber: '',
    altMobileNumber: '',
    address: '',
    adharCard: null,
    paymentMethod: 'creditCard',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
      setTotalPrice(diffDays * pricePerDay);
    }
  }, [pickupDate, returnDate, pricePerDay]);

  // Reset form data when modal opens
  useEffect(() => {
    if (showModal) {
      setFormData(initialFormState);
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.adharCard) {
      alert('Please upload your Adhar Card.');
      return;
    }
    // Pass the data back to the parent component
    onSubmit({
      ...formData,
      carName,
      pickupDate,
      returnDate,
      numberOfDays,
      totalPrice,
      adharCardUrl: URL.createObjectURL(formData.adharCard), // Create a URL for the uploaded file
    });
    handleClose(); // Close modal after submission
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Car: {carName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="altMobileNumber">Alternate Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="altMobileNumber"
              name="altMobileNumber"
              placeholder="Enter alternate mobile number"
              value={formData.altMobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="2"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="adharCard">Upload Adhar Card</label>
            <input
              type="file"
              className="form-control-file"
              id="adharCard"
              name="adharCard"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carName">Car Name</label>
            <input type="text" className="form-control" id="carName" value={carName} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input type="date" className="form-control" id="pickupDate" value={pickupDate} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input type="date" className="form-control" id="returnDate" value={returnDate} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfDays">Number of Days</label>
            <input
              type="text"
              className="form-control"
              id="numberOfDays"
              value={`${numberOfDays} days`}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              className="form-control"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="text"
              className="form-control"
              id="totalPrice"
              value={`$${totalPrice}`}
              readOnly
            />
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
