let SPOOF_RADIUS_METERS = 100000;
// TODO: Replace this with UI input


function distortCoords(lat, lon, radiusMeters) {
  //NB, 1 deg = 111 111 meters 
  const r = radiusMeters / 111111; // degrees per meter
  const angle = 2 * Math.PI * Math.random();
  const dx = r * Math.cos(angle);
  const dy = r * Math.sin(angle);
  return [lat + dx, lon + dy];
}


navigator.geolocation.getCurrentPosition(
  function success(position) {
    const { latitude, longitude, _ } = position.coords;
    const [spoofLat, spoofLon] = distortCoords(latitude, longitude, SPOOF_RADIUS_METERS);

    document.getElementById("output").textContent =
      `Original:\n  Lat: ${latitude}\n  Lon: ${longitude}\n\n` +
      `Spoofed (~${SPOOF_RADIUS_METERS}m radius):\n  Lat: ${spoofLat.toFixed(6)}\n  Lon: ${spoofLon.toFixed(6)}`;
  },
  function error(err) {
    document.getElementById("output").textContent = `Error: ${err.message}`;
  }
);
