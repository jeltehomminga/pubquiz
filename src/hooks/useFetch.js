import axios from "axios";
import { useEffect, useReducer } from "react";

const fetchReducer = (state, { type, payload }) => {
  switch (type) {
    case "pending":
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    case "succes":
      return {
        ...state,
        data: payload,
        isError: false,
        isLoading: false
      };
    case "error":
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    case "cancel":
      return {
        ...state,
        isLoading: false
      };
    default:
      throw new Error("unknown action type");
  }
};

const initialState = {
  isError: false,
  // Although there are discussions going on to not use Boolean 
  // values for isLoading I think for this project it is still suitable, 
  // since I don't want to show previous data when fetching is not succesfull
  // otherwise a status as string would be better (finite state matchine)
  isLoading: true,
  data: {}
};

const useFetch = (url, changeDataCallback) => {
  // Because multiple state updates need to be done as part of one action useReducer 
  // is used to reduce the updates to one update and return state object
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "pending" });
      try {
        let { data } = await axios(url);
        // The data is not always received in the way that is best for the use in UI,
        // therefor I added the option to optionally pass a callback to change the data 
        // before setting the data in the state
        if (changeDataCallback) data = changeDataCallback(data);
        !didCancel
          ? dispatch({ type: "succes", payload: data })
          : dispatch({ type: "cancel" });
      } catch (error) {
        dispatch({ type: "error" });
        console.error(error);
      }
    };

    fetchData();

    // If the component is unmounted when the fetch is still pending there is not need to set the state anymore
    // therefor didcancel is set to true tp prevent this
    return () => (didCancel = true);
  }, [changeDataCallback, url]);

  return state;
};

export default useFetch;
