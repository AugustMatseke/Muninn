const script = document.createElement('script');
script.textContent = `(${injectedCode})();`;
document.documentElement.appendChild(script);
script.remove();

function injectedCode() {
    //Temp hardcoded
  const spoofedLatitude = 60.4;
  const spoofedLongitude = 12.8;
  const spoofedAccuracy = 1000;

  navigator.geolocation.getCurrentPosition = function(success, error, options) {
    success({
      coords: {
        latitude: spoofedLatitude,
        longitude: spoofedLongitude,
        accuracy: spoofedAccuracy,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    });
  };

  navigator.geolocation.watchPosition = function(success, error, options) {
    const id = Math.floor(Math.random() * 10000);
    success({
      coords: {
        latitude: spoofedLatitude,
        longitude: spoofedLongitude,
        accuracy: spoofedAccuracy,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: Date.now()
    });
    return id;
  };
}
