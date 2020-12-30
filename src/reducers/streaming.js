import { makeType, mac } from "../utils/Reducers";

const initialState = {
  streamStatus: false,
};

const t = makeType("STREAMING");

const START_STREAMING = t("START_STREAMING");
const STOP_STREAMING = t("STOP_STREAMING");
const CHANGE_STREAMING = t("CHANGE_STREAMING");
const ERROR_STREAMING = t("ERROR_STREAMING");

export const startStreaming = mac(START_STREAMING);
export const stopStreaming = mac(STOP_STREAMING);
export const changeStreaming = mac(CHANGE_STREAMING, "payload");
export const errorStreaming = mac(ERROR_STREAMING, "error");

export default (state = initialState, action) => {
  //   console.log(action.type);
  switch (action.type) {
    case START_STREAMING:
      return { ...state, streamStatus: true };
    case STOP_STREAMING:
      return { ...state, streamStatus: false };
    case CHANGE_STREAMING:
      return { ...state, streamStatus: action.payload };
    case ERROR_STREAMING:
      return { ...state, streamStatus: false, error: action.error };
    default:
      return state;
  }
};

export const loadStream = () => async (dispatch) => {
  dispatch(startStreaming());
  try {
    const url = `https://vinolaserver.vercel.app/api/playings/`;

    const response = await fetch(url);
    const data = await response.json();

    dispatch(changeStreaming(Boolean(data.streamStatus)));
  } catch (err) {
    console.log("Error: ", err);
    dispatch(errorStreaming(err));
  }
};
