function distortCoords(lat, lon, radiusMeters = 1000) {
  const r = radiusMeters / 111300;
  const angle = 2 * Math.PI * Math.random();
  const dx = r * Math.cos(angle);
  const dy = r * Math.sin(angle);
  return [lat + dx, lon + dy];
}

navigator.geolocation.getCurrentPosition = function(success, error, options) {
  chrome.storage.sync.get(["accuracy"], (res) => {
    navigator.geolocation.__proto__.getCurrentPosition.call(navigator.geolocation, (realPos) => {
      let { latitude, longitude } = realPos.coords;
      const acc = res.accuracy || "exact";

      if (acc === "radius") [latitude, longitude] = distortCoords(latitude, longitude);
      else if (acc === "city") { latitude = 57.7089; longitude = 11.9746; } // Gothenburg example
      else if (acc === "country") { latitude = 60.1282; longitude = 18.6435; } // Sweden center

      success({
        coords: {
          latitude,
          longitude,
          accuracy: 1000
        },
        timestamp: Date.now()
      });
    }, error, options);
  });
};
