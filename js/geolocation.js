function geolocationSupport() {
  // if ('geolocation' in navigator) {
  //     return true
  // }
  // return false

  //same

  return "geolocation" in navigator;
}

const defaultOptions = {
  //position option geolocation docs
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
};
export function getCurrentPosition(options = defaultOptions) {
  if (!geolocationSupport())
    throw new Error("Your browser does not suppor geolocation");
  //si hay irá a la siguiente linea

  return new Promise((resolve, reject) => {
    //callback
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        resolve(position);
      },() => {
        reject("No geolocation available");
      }, options);
  });
}

export async function getLatLon(options = defaultOptions) {
  try {
    const {
      coords: { latitude: lat, longitude: lon },
    } = await getCurrentPosition(options); //desestructurar objeto gigante, renomrbar con otros valores de variable con los :
    return { lat, lon, isError: false };
  } catch {
    return { isError: true, lat: null, lon: null };
  }
}