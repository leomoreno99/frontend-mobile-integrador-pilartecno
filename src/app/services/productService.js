import api from "../clients/api"
import routes from "../routes/apiPlacesRoutes"

export const getAllPlaces = async () => {
    return api.get(routes.getAllPlaces())
}

export const getPlaceById = async (idPlace) => {
    return api.get(routes.getPlaceById(idPlace))
}

export const createPlace = async (place) => {
    return api.post(routes.createPlace(), place)
}

export const updatePlace = async (idPlace, place) => {
    return api.patch(routes.updatePlace(idPlace), place)
}

export const deletePlace = async (idPlace) => {
    return api.delete(routes.deletePlace(idPlace))
}
