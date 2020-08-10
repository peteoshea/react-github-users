import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = (props) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`https://api.github.com/users/${username}`).then(async (resp) => {
      props.onSubmit(resp.data);
      setUsername('');
    });
  };

  useEffect(() => {
    function getPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.error('Error trying to get current position: ' + error);
        },
        {
          timeout: 1000,
          maximumAge: 10000,
          enableHighAccuracy: false,
        }
      );
    }
    getPosition();
  }, []); // Add empty array as second parameter so it only runs once

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="mt-10 flex">
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="GitHub username"
          className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150"
          required
        />
        <button
          type="submit"
          className="ml-2 py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        >
          Search
        </button>
      </div>
      <div className="mt-2 text-center">
        <span className="block">Latitude: {location.latitude}</span>
        <span className="block">Longitude: {location.longitude}</span>
      </div>
    </form>
  );
};

export default Form;
