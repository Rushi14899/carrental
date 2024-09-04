// AdminPanel.js
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import an icon from react-icons

const AdminPanel = ({ bookings, onDeleteBooking, onAddNewVehicle, carData, onDeleteVehicle, onLogout }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [view, setView] = useState('bookings'); // State to manage view selection
  const initialVehicleState = {
    city: '',
    carName: '',
    description: '',
    image: '',
    pricePerDay: 0,
  };

  const [vehicleData, setVehicleData] = useState(initialVehicleState);

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: name === 'pricePerDay' ? parseFloat(value) : value,
    }));
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (vehicleData.city && vehicleData.carName) {
      onAddNewVehicle(vehicleData); // Use the prop function
      setVehicleData(initialVehicleState); // Reset the form
    } else {
      alert('Please fill all the fields');
    }
  };

  const handleDeleteVehicle = () => {
    if (selectedCity && selectedVehicle) {
      onDeleteVehicle(selectedCity, selectedVehicle);
    } else {
      alert('Please select a city and vehicle');
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <div className="admin-sidebar">
          <ul>
            <li>
              <button onClick={() => setView('bookings')} className="neumorphic-btn">
                Bookings
              </button>
            </li>
            <li>
              <button onClick={() => setView('addVehicle')} className="neumorphic-btn">
                Add Vehicle
              </button>
            </li>
            <li>
              <button onClick={() => setView('deleteVehicle')} className="neumorphic-btn">
                Delete Vehicle
              </button>
            </li>
            <li>
              <button onClick={onLogout} className="neumorphic-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-md-9">
        <div className="admin-panel">
          {view === 'bookings' && (
            <div>
              <h2 className="mb-4">Booking Data</h2>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Mobile Number</th>
                    <th>Alternate Mobile</th>
                    <th>Address</th>
                    <th>Car Name</th>
                    <th>Pickup Date</th>
                    <th>Return Date</th>
                    <th>Number of Days</th>
                    <th>Total Price</th>
                    <th>Payment Method</th>
                    <th>Adhar Card</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td data-label="Action">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDeleteBooking(index)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                      <td data-label="#">{index + 1}</td>
                      <td data-label="Full Name">{booking.fullName}</td>
                      <td data-label="Mobile Number">{booking.mobileNumber}</td>
                      <td data-label="Alternate Mobile">{booking.altMobileNumber}</td>
                      <td data-label="Address">{booking.address}</td>
                      <td data-label="Car Name">{booking.carName}</td>
                      <td data-label="Pickup Date">{booking.pickupDate}</td>
                      <td data-label="Return Date">{booking.returnDate}</td>
                      <td data-label="Number of Days">{booking.numberOfDays}</td>
                      <td data-label="Total Price">${booking.totalPrice}</td>
                      <td data-label="Payment Method">{booking.paymentMethod}</td>
                      <td data-label="Adhar Card">
                        <a href={booking.adharCardUrl} download={`${booking.fullName}_AdharCard`}>
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === 'addVehicle' && (
            <div>
              <h2>Add New Vehicle</h2>
              <form onSubmit={handleAddVehicle}>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    className="neumorphic-input"
                    value={vehicleData.city}
                    onChange={handleVehicleChange}
                  >
                   <option value="">Select a city</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Solapur">Solapur</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="carName">Car Name</label>
                  <input
                    type="text"
                    id="carName"
                    name="carName"
                    className="neumorphic-input"
                    value={vehicleData.carName}
                    onChange={handleVehicleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="neumorphic-input"
                    value={vehicleData.description}
                    onChange={handleVehicleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="neumorphic-input"
                    value={vehicleData.image}
                    onChange={handleVehicleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pricePerDay">Price Per Day</label>
                  <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    className="neumorphic-input"
                    value={vehicleData.pricePerDay}
                    onChange={handleVehicleChange}
                  />
                </div>
                <button type="submit" className="neumorphic-btn">
                  Add Vehicle
                </button>
              </form>
            </div>
          )}

          {view === 'deleteVehicle' && (
            <div>
              <h2>Delete Vehicle</h2>
              <div className="form-group">
                <label htmlFor="citySelect">Select City:</label>
                <select
                  className="neumorphic-input"
                  id="citySelect"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedVehicle(''); // Reset selected vehicle when changing city
                  }}
                >
                  <option value="">Select a city</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Solapur">Solapur</option>
                </select>
              </div>
              {selectedCity && (
                <div className="form-group">
                  <label htmlFor="vehicleSelect">Select Vehicle:</label>
                  <select
                    className="neumorphic-input"
                    id="vehicleSelect"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    <option value="">Select a vehicle</option>
                    {carData[selectedCity].map((car, index) => (
                      <option key={index} value={car.carName}>
                        {car.carName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button className="neumorphic-btn" onClick={handleDeleteVehicle}>
                Delete Vehicle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
