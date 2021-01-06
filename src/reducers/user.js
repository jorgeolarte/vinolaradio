import { makeType, mac } from "../utils/Reducers";

const initialState = {
  userUid: null,
  expoToken: null,
};

const t = makeType("USER");

const SIGN_IN = t("SIGN_IN");
const SIGN_OUT = t("SIGN_OUT");
const SET_EXPOTOKEN = t("SET_EXPOTOKEN");

export const signIn = mac(SIGN_IN, "payload");
export const signOut = mac(SIGN_OUT);
export const setExpoToken = mac(SET_EXPOTOKEN, "payload");

export default (state = initialState, action) => {
  //   console.log(action.type);
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userUid: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        userUid: null,
        expoToken: null,
      };
    case SET_EXPOTOKEN:
      return {
        ...state,
        expoToken: action.payload,
      };
    default:
      return state;
  }
};
