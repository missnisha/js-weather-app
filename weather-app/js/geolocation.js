
function geolocationSupport() {

    // if ('geolocation' in navigator) {
    //     return true
    // }
    // return false

    //same 

    return 'geolocation' in navigator;

}

export function getCurrentPosition() {
  if (!geolocationSupport())
    throw new Error("Your browser does not suppor geolocation");
  //si hay irá a la siguiente linea

  return new Promise((resolve, reject) => {
    //callback
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    resolve({
        lat,
        lon
    })
    }, ()=> {
        reject('No geolocation available')
    }, {});
  });
}