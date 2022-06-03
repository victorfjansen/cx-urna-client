import { buttonList } from "../../utils/buttonList.js"

const initialState = {
    vote: '',
    buttonList,
    voteCounter: 0,
    soundUrl: "https://res.cloudinary.com/dibnenfot/video/upload/v1653441169/Som_de_Urna_Eletr%C3%B4nica_ma2cfz.mp3"
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_VOTE":
            return { ...state, vote: action.payload}
        case "UPDATE_COUNTER":
            return {...state, voteCounter: state.voteCounter + 1}
        case "RESET_COUNTER":
            return {...state, voteCounter: 0}
        case "UPDATE_SOUNDURL":
            return {...state, soundUrl: action.payload}
        default:
            return state
    }
}