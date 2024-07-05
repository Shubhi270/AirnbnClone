import React, { useEffect } from 'react'
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useState } from 'react';
import axios from 'axios';
import AccountNavigation from '../AccountNavigation';
import { Navigate, useParams } from 'react-router';
const PlacesForm = () => {
  const {id} =useParams();
  
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState(0);
  const [checkOut, setCheckOut] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
 
const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    if(!id){
      return;
    }

    axios.get('/places/' +id).then(response =>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      console.log(data);
    });
  }, [id])
  
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    
    if(id){
      //update
      await axios.put('/places', {
        id, ...placeData
      });
      
    } else{
      console.log({ placeData });
      //new place
    await axios.post("/places", {placeData});  
    }
    
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNavigation></AccountNavigation>
      <div>
        <form onSubmit={(ev) => savePlace(ev)}>
          {preInput("Title", "Title for your place")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="w-full border my-2 p-2"
            placeholder="Title, for example: My lovely apartment"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className="w-full border my-2 p-2"
            placeholder="Address"
          />
          <PhotosUploader
            addedPhotos={addedPhotos}
            onChange={setAddedPhotos}
          ></PhotosUploader>
          {preInput("Description", "Description of the place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="w-full border my-2 p-2"
            rows="4"
          ></textarea>
          {preInput("Perks", "Select the perks of your place")}
          <Perks selected={perks} onChange={setPerks}></Perks>
          <h2 className="text-2xl mt-4">Extra info</h2>
          <p className="text-gray-500 text-sm">House rules, etc...</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
            className="w-full border my-2 p-2"
            rows="4"
          ></textarea>
          {preInput(
            "Check in & Check out, Max guests",
            "Remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid gap-2 grid-cols-2 md:gap-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="number"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="w-full border my-2 p-2"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="number"
                placeholder="11"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="w-full border my-2 p-2"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                className="w-full border my-2 p-2"
              />
            </div>

            <div>
              <h3 className="mt-2 -mb-1">Price per Night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                className="w-full border my-2 p-2"
              />
            </div>
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded-full my-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PlacesForm