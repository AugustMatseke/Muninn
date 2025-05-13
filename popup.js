navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords;
    document.getElementById("output").textContent =
      `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy} meters`;
  },
  (error) => {
    document.getElementById("output").textContent = `Error: ${error.message}`;
  }
);
