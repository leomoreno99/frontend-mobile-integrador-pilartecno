import { deletePlace, getAllPlaces, createPlace, getPlaceById, updatePlace } from "../app/services/productService"

const GET_ALL_PLACES = "GET_ALL_PLACES"
const GET_PLACE_BY_ID = "GET_PLACE_BY_ID"
const DELETE_PLACE = "DELETE_PLACE"

const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"
const CREATE_NOTIFICATION = "CREATE_NOTIFICATION"
const EDIT_NOTIFICATION = "EDIT_NOTIFICATION"

const CREATE_OR_EDIT_PLACE_CLICK = "CREATE_OR_EDIT_PLACE_CLICK"

const initialStatePlaces = {
  places: [],
  place: {}
};

const initialStateNotifications = {
  flagDeleteNotification: 0,
  flagCreateNotification: 0,
  flagEditNotification: 0
};

const initialStateFunctionalities = {
  flagCreateOrEdit: 0,
}

//Reducers
export const placesReducer = (state = initialStatePlaces, {type, payload}) => {
  switch (type) {
    case GET_ALL_PLACES:
      return {...state, places: payload};
    case GET_PLACE_BY_ID:
      return {...state, place: payload};
    case DELETE_PLACE:
      return {...state, places: payload};    
    default:
      return state;
  }
};

export const notificationsReducer = (state = initialStateNotifications, {type, payload}) => {
  switch (type) {
    case DELETE_NOTIFICATION:
      return {...state, flagDeleteNotification: payload};
    case CREATE_NOTIFICATION:
      return {...state, flagCreateNotification: payload}; 
    case EDIT_NOTIFICATION:
      return {...state, flagEditNotification: payload};   
    default:
      return state;
  }
};

export const functionalitiesReducer = (state = initialStateFunctionalities, {type, payload}) => {
  // console.log('payload: ', payload, 'Type: ', type)
  switch (type) {
    case CREATE_OR_EDIT_PLACE_CLICK:
      return {...state, flagCreateOrEdit: payload}; 
    default:
      return state;
  }
};

//Actions
export const changeDeleteNotification = number => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: number
    });
  }
}

export const changeCreateNotification = number => {
  return dispatch => {
    dispatch({
      type: CREATE_NOTIFICATION,
      payload: number
    });
  }
}

export const changeEditNotification = number => {
  return dispatch => {
    dispatch({
      type: EDIT_NOTIFICATION,
      payload: number
    });
  }
}

export const changeFlagCreateOrEdit = number => {
  // console.log('number: ', number)
  return dispatch => {
    dispatch({
      type: CREATE_OR_EDIT_PLACE_CLICK,
      payload: number
    });
  }
}



const getAllPlacesAction = (places) => ({
  type: GET_ALL_PLACES,
  payload: places,
});

const getPlaceByIdAction = (places) => ({
  type: GET_PLACE_BY_ID,
  payload: places,
});

const deletePlaceAction = (places) => ({
  type: DELETE_PLACE,
  payload: places,
});

export const allPlaces = () => {
  return async (dispatch) => {
    try {
      const places = await getAllPlaces();
      dispatch(getAllPlacesAction(places));
    } catch (e) {
      console.log(e);
    }
  };
};

export const placeById = (id) => {
  return async (dispatch) => {
    try {
      const place = await getPlaceById(id);
      dispatch(getPlaceByIdAction(place));
    } catch (e) {
      console.log(e);
    }
  };
};

  export const creatPlace = (place) => {
    return async (dispatch) => {
      try {
        const response = await createPlace(place)
        if(response.code === 'OK'){
          allPlaces()
          dispatch(changeCreateNotification(1))
        }
      } catch (e) {
        dispatch(changeCreateNotification(2))
        console.log(e);
      }
    };
  }

  export const editPlace = (id, place) => {
    return async (dispatch) => {
      try {
        const response = await updatePlace(id, place)
        if(response.code === 'OK'){
          allPlaces()
          dispatch(changeEditNotification(1))
        }
      } catch (e) {
        dispatch(changeEditNotification(2))
        console.log(e);
      }
    };
  }

  export const delPlace = (id) => {
    return async (dispatch, getState) => {
      try {
        const response = await deletePlace(id)
        if(response.code === 'OK'){
          const state = getState();
          const { places } = state.placesReducer;
          const update = places.filter( place => place._id !== id )
          dispatch(changeDeleteNotification(1))
          dispatch(deletePlaceAction(update))
        }
      } catch (e) {
        dispatch(changeDeleteNotification(2))
        console.log(e)
      }
  }}

  
