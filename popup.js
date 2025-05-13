function distortCoords(lat, lon, radiusMeters) {
  let r = radiusMeters / 111111; //deg per meter, roughly 111,111 m/deg
  let angle = 2 * Math.PI * Math.random(); //Some random angle 
  let dx = r * Math.cos(angle); 
  let dy = r * Math.sin(angle);
  return [lat + dx, lon + dy];
}

function getSpoofRadius() { //Fetches from input in popup.html
  let rad = document.getElementById("radius");
  return parseInt(rad.value, 10);
}

function displayLocation() {
  let radius = getSpoofRadius(); //TODO, maybe make this a slider?

  navigator.geolocation.getCurrentPosition(
    function success(position) {//API needs these werid success/error functions

      let {latitude, longitude} = position.coords;
      let {spoofLat, spoofLon} = [latitude, longitude];

      if (radius > 0) {
        [spoofLat, spoofLon] = distortCoords(latitude, longitude, radius);
      }
      else { //TODO: Not sure this works as intended
        spoofLat = latitude;
        spoofLon = longitude;
      }
        
      //"output" overwrites the fetching... text from popup.html 
      document.getElementById("output").textContent = 
        `Original:\n  Lat: ${latitude}\n  Lon: ${longitude}\n\n` +
        `Spoofed (~${radius/1000}km):\n  Lat: ${spoofLat.toFixed(6)}\n  Lon: ${spoofLon.toFixed(6)}`;
    },
    function error(err) {
      document.getElementById("output").textContent = `Error: ${err.message}`;
    }
    
  );
}

// Alternative, taken from https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/cookbook.geolocation-popup/popup.js
// navigator.geolocation.getCurrentPosition(
//   (loc) => {
//     const { coords } = loc;
//     let { latitude, longitude } = coords;
//     latitude = generateDMS(latitude, true);
//     longitude = generateDMS(longitude);

//     header.innerText = `position: ${latitude}, ${longitude}`;
//   },
//   (err) => {
//     header.innerText = 'error (check console)';
//     console.error(err);
//   }
// );

//need listeners since user can change radius during run
document.getElementById("radius").addEventListener("change", displayLocation);
window.addEventListener("DOMContentLoaded", displayLocation);
