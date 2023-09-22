import React, { useEffect, useState } from 'react';

function Map({ start, destination, onEstimatedTimeUpdate }) {
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 7.8731, lng: 80.7718 },
      zoom: 7,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    if (start && destination) {
      directionsService.route(
        {
          origin: start,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            const route = result.routes[0];
            if (route && route.legs && route.legs.length > 0) {
              const leg = route.legs[0];
              setEstimatedTime(leg.duration.text);
              onEstimatedTimeUpdate(leg.duration.text);

              // Store route details for rendering
              setRouteDetails(leg.steps);
            } else {
              setEstimatedTime('N/A');
              onEstimatedTimeUpdate('N/A');
              setRouteDetails(null);
            }
          } else {
            console.error(`Error fetching directions: ${status}`);
            setEstimatedTime('N/A');
            onEstimatedTimeUpdate('N/A');
            setRouteDetails(null);
          }
        }
      );
    }
  }, [start, destination, onEstimatedTimeUpdate]);

  console.log(estimatedTime)

  return (
    <div  style={{ margin: '20px' }}>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {/* {estimatedTime && <p>Estimated Time: {estimatedTime}</p>} */}
      {routeDetails && (
        <div>
          
           <h3 style={{paddingTop :'20px'}}>Directions</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '10px 0' }}>
            {routeDetails.map((step, index) => (
              <li key={index} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px', borderRadius: '5px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{step.instructions.replace(/<\/?[^>]+(>|$)/g, '')}</div>
                <div style={{ color: '#666' }}>Distance: {step.distance.text}</div>
                <div style={{ color: '#666' }}>Duration: {step.duration.text}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default Map;
