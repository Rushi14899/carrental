// Home.js
import React, { useState } from 'react';
import CarCard from './CarCard'; // Import the CarCard component
import BookingModal from './BookingModal'; // Import the BookingModal component
import AdminLoginModal from './AdminLoginModal'; // Import the AdminLoginModal component
import AdminPanel from './AdminPanel'; // Import the AdminPanel component
import Nabar1 from './Nabar1'; // Import the Navbar1 component
import './Home.css'; // Import the neumorphism styles
import ertiga from './ertiga.jpg';
import swift from './swift.webp'
import verna from './verna.webp'
import harrier from './harrier.avif'
import swift_desire from './swift_desire.jpg'
import tigor from './tigor.avif'
import inova from './inova.webp'

const Home = () => {
  const [city, setCity] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showCards, setShowCards] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedPricePerDay, setSelectedPricePerDay] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [bookedCars, setBookedCars] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [carData, setCarData] = useState({
    Pune: [
      {
        carName: 'Maruti Swift',
        description: 'A comfortable city car perfect for urban driving.',
        image: swift,
        pricePerDay: 30,
      },
      {
        carName: 'Hundai Verna',
        description: 'An eco-friendly electric vehicle for city commutes.',
        image: verna,
        pricePerDay: 35,
      },
      {
        carName: 'Tata Harrier',
        description: 'A sporty hatchback for a fun ride around town.',
        image: harrier,
        pricePerDay: 40,
      },
      {
        carName: 'Maruti Swift Desire',
        description: 'A family-friendly van with plenty of space.',
        image: swift_desire,
        pricePerDay: 40,
      },
    ],
    Mumbai: [
      {
        carName: 'Tata Tigor',
        description: 'A spacious SUV for your family adventures.',
        image: tigor,
        pricePerDay: 50,
      },
      {
        carName: 'tata harrier',
        description: 'A luxury SUV with top-notch features.',
        image: harrier,
        pricePerDay: 55,
      },
      {
        carName: 'Swift Desire',
        description: 'A compact SUV perfect for city and off-road.',
        image: swift_desire,
        pricePerDay: 45,
      },
      {
        carName: 'Ertiga',
        description: 'A hybrid SUV with excellent fuel efficiency.',
        image: ertiga,
        pricePerDay: 60,
      },
    ],
    Solapur: [
      {
        carName: 'Ertiga',
        description: 'A stylish sedan with great fuel efficiency.',
        image:ertiga,
        pricePerDay: 28,
      },
      {
        carName: 'Verna',
        description: 'A luxury sedan with a smooth ride.',
        image: verna,
        pricePerDay: 33,
      },
      {
        carName: 'Swift Desire',
        description: 'A compact sedan with excellent handling.',
        image: swift_desire,
        pricePerDay: 27,
      },
      {
        carName: 'Inova crysta',
        description: 'A high-performance sedan with sporty features.',
        image:inova ,
        pricePerDay: 38,
      },
    ],
  });

  const handleSearch = () => {
    if (city && pickupDate && returnDate) {
      setShowCards(true);
    } else {
      alert('Please select a city and dates!');
    }
  };

  const handleBookCar = (carName, pricePerDay) => {
    if (bookedCars.includes(carName)) {
      alert('This car is already booked.');
      return;
    }
    setSelectedCar(carName);
    setSelectedPricePerDay(pricePerDay);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookingSubmit = (bookingData) => {
    setBookings((prevBookings) => [...prevBookings, bookingData]);
    setBookedCars((prevBookedCars) => [...prevBookedCars, bookingData.carName]);
    window.alert('Your car booking was successful!');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLoginModal(false);
  };

  const handleDeleteBooking = (index) => {
    const carNameToDelete = bookings[index].carName;
    const updatedBookings = bookings.filter((_, i) => i !== index);
    const updatedBookedCars = bookedCars.filter((carName) => carName !== carNameToDelete);
    setBookings(updatedBookings);
    setBookedCars(updatedBookedCars);
  };

  const handleAddNewVehicle = (newVehicle) => {
    setCarData((prevCarData) => ({
      ...prevCarData,
      [newVehicle.city]: [...prevCarData[newVehicle.city], newVehicle],
    }));
    window.alert('Vehicle added successfully!');
  };

  const handleDeleteVehicle = (city, carName) => {
    setCarData((prevCarData) => ({
      ...prevCarData,
      [city]: prevCarData[city].filter((car) => car.carName !== carName),
    }));
    window.alert('Vehicle deleted successfully!');
  };

  return (
    <div>
      <Nabar1
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="container mt-5">
        {/* Main content inside container */}
        {isLoggedIn ? (
          <AdminPanel
            bookings={bookings}
            onDeleteBooking={handleDeleteBooking}
            onAddNewVehicle={handleAddNewVehicle}
            carData={carData}
            onDeleteVehicle={handleDeleteVehicle}
            onLogout={handleLogout}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Car Rental Search</h1>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="citySelect">Select City:</label>
                  <select
                    className="neumorphic-input"
                    id="citySelect"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Solapur">SOlapur</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="pickupDate">Pickup Date:</label>
                  <input
                    type="date"
                    className="neumorphic-input"
                    id="pickupDate"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="returnDate">Return Date:</label>
                  <input
                    type="date"
                    className="neumorphic-input"
                    id="returnDate"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4 offset-md-4">
                <button className="neumorphic-btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>

            {showCards && city && (
              <div className="row">
                {carData[city].map((car, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <CarCard
                      carName={car.carName}
                      description={car.description}
                      image={car.image}
                      pricePerDay={car.pricePerDay}
                      onBook={() => handleBookCar(car.carName, car.pricePerDay)}
                    />
                  </div>
                ))}
              </div>
            )}

            <BookingModal
              showModal={showModal}
              handleClose={handleCloseModal}
              carName={selectedCar}
              pickupDate={pickupDate}
              returnDate={returnDate}
              pricePerDay={selectedPricePerDay}
              onSubmit={handleBookingSubmit}
            />
          </>
        )}

        <AdminLoginModal
          show={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default Home;
