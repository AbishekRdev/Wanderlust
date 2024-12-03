



maptilersdk.config.apiKey = mapApiKey;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center:coordinates, // starting position [lng, lat]
  zoom: 14 // starting zoom
});




  const marker = new maptilersdk.Marker()
  .setLngLat(coordinates)
  .addTo(map);
  
  //   // Create a popup content
  //   var popupContent = `
  //     <h4> you will be here</h4>
  // `;

  //   // Create a popup
  //   var popup = new maptilersdk.Popup({ offset: 25 })
  //     .setLngLat(coordinates)  // Popup position (same as marker)
  //     .setHTML(popupContent)  // Set the HTML content of the popup
  //     .addTo(map);  // Add the popup to the map

  //   // Attach the popup to the marker
  //   marker.setPopup(popup);
 

