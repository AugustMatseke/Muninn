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

//need listeners since user can change radius during run
document.getElementById("radius").addEventListener("change", displayLocation);
window.addEventListener("DOMContentLoaded", displayLocation);
