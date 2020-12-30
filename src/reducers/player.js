import { Audio } from "expo-av";
import { makeType, mac } from '../utils/Reducers';

const initialState = {
  // sound: new Audio.Sound(),
  statusPlaying: "nosound",
  isMuted: false,
};

const t = makeType("PLAYER");

const SET_SOUND = t("SET_SOUND");
const CHANGE_PLAYER = t("CHANGE_PLAYER");
const ERROR_PLAYER = t("ERROR_PLAYER");
const CHANGE_MUTED = t("CHANGE_MUTED");

export const setSound = mac(SET_SOUND, "payload");
export const changePlayer = mac(CHANGE_PLAYER, "payload");
export const errorPlayer = mac(ERROR_PLAYER, "payload", "error");
export const changeMuted = mac(CHANGE_MUTED, "payload");

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOUND:
      return { ...state, sound: action.payload };
    case CHANGE_PLAYER:
      return { ...state, statusPlaying: action.payload };
    case ERROR_PLAYER:
      return { ...state, statusPlaying: action.payload, error: action.error };
    case CHANGE_MUTED:
      return { ...state, isMuted: action.payload };
    default:
      return state;
  }
};

export const mute = () => async (dispatch, getState) => {
  const state = getState();
  try {
    dispatch(changeMuted(!state.player.isMuted));
  } catch (err) {
    // dispatch(errorPlayer(status, error));
  }
};

export const dispatchPlayer = (status) => async (dispatch) => {
  try {
    dispatch(changePlayer(status));
  } catch (err) {
    dispatch(errorPlayer(status, error));
  }
};
