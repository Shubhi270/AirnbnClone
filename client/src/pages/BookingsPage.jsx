import React from 'react'
import AccountNavigation from '../AccountNavigation';
import PlaceImg from './PlaceImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingDates from './BookingDates';
const BookingsPage = () => {
const [bookings, setBookings] = useState([]);
useEffect(() => {
  axios.get("/bookings").then((response) => {
    setBookings(response.data);
  });
}, []);
return (
  <>
    <AccountNavigation></AccountNavigation>
    <div>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 items-center bg-gray-200 rounded-2xl overflow-hidden">
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
              <BookingDates booking ={booking}/>
              
            </div>
          </Link>
        ))}
    </div>
  </>
);
}

export default BookingsPage;