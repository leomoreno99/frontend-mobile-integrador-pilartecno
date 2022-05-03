const baseUrl = 'http://192.168.0.2:4000'
const placesUrl = `${baseUrl}/places/places`;

const routes = {
  getAllPlaces: () => placesUrl,
  getPlaceById: (idPlace) => `${placesUrl}/${idPlace}`,
  createPlace: () => placesUrl,
  updatePlace: (idPlace) => `${placesUrl}/${idPlace}`,
  deletePlace: (idPlace) => `${placesUrl}/${idPlace}`,
};

export default routes;
