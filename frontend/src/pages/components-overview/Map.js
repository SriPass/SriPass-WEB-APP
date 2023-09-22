import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // Set initial center coordinates
      zoom: 10, // Set the initial zoom level
    });

    // Create a DirectionsService object
    const directionsService = new window.google.maps.DirectionsService();

    // Define the start and end points
    const start = 'Matara';
    const destination = 'Colombo';

    // Create a DirectionsRenderer object to display the route
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    // Set the map for the DirectionsRenderer
    directionsRenderer.setMap(map);

    // Request directions from DirectionsService
    directionsService.route(
      {
        origin: start,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Display the route on the map
          directionsRenderer.setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, []); // Empty dependency array to run this effect only once

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default Map;
