const initialState = {
  artist: "",
  track: "",
  coverArt:
    "https://vinolaserver.jorgeolarte.vercel.app/assets/vinola-radio.jpg",
};

const makeType = (mod) => (type) => `${mod}/${type}`;

// makeActionCreator
const mac = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

const t = makeType("SONG");

const ADD_SONG = t("ADD_SONG");
const ADD_ARTIST = t("ADD_ARTIST");
const ADD_TRACK = t("ADD_TRACK");
// const ADD_COVER = t("ADD_COVER");

const addSong = mac(ADD_SONG, "artist", "track", "coverArt");
const addArtist = mac(ADD_ARTIST, "payload");
const addTrack = mac(ADD_TRACK, "payload");
// const addCover = mac(ADD_COVER, "payload");

export default (state = initialState, action) => {
  //   console.log(action.type);
  switch (action.type) {
    case ADD_SONG:
      return {
        ...state,
        artist: state.artist === action.artist ? state.artist : action.artist,
        track: state.track === action.track ? state.track : action.track,
        coverArt:
          state.coverArt === action.coverArt ? state.coverArt : action.coverArt,
      };
    case ADD_ARTIST:
      return {
        ...state,
        artist: state.artist === action.payload ? state.artist : action.payload,
      };
    case ADD_TRACK:
      return {
        ...state,
        track: state.track === action.payload ? state.track : action.payload,
      };
    // case ADD_COVER:
    //   return {
    //     ...state,
    //     coverArt: state.cover === action.payload ? state.cover : action.payload,
    //   };
    default:
      return state;
  }
};

export const loadSong = () => async (dispatch) => {
  try {
    const url = `https://vinolaserver.vercel.app/api/playings/`;

    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let url = `https://vinolaserver.vercel.app/api/lists/${res.artist}/${res.track}`;
        fetch(url)
          .then((res2) => res2.json())
          .then((res2) => {
            let cover =
              typeof res2.coverArt === "undefined"
                ? "https://vinolaserver.jorgeolarte.vercel.app/assets/vinola-radio.jpg"
                : res2.coverArt;
            // console.log("res2: ", res2);
            dispatch(addSong(res2.artist, res2.track, cover));
          });
      });
  } catch (err) {
    console.log("Error: ", err);
    dispatch(addSong("Vinola Radio", "undefined"));
  }
};
