import { buttonList } from "../../utils/buttonList.js"

//actions ---------------------------------------------------------------------------
function UPDATE_SOUNDURL(soundUrl) {
    return {type: "UPDATE_SOUNDURL", payload: soundUrl}
}

function UPDATE_COUNTER() {
    return{type: "UPDATE_COUNTER"}
}

function RESET_COUNTER() {
    return {type: "RESET_COUNTER"}
}

function UPDATE_VOTE(payload) {
    return {type: "UPDATE_VOTE", payload}
}

export {UPDATE_VOTE, UPDATE_COUNTER, UPDATE_SOUNDURL, RESET_COUNTER}

//initial state -----------------------------------------------------------------

const initialState = {
    vote: '',
    buttonList,
    voteCounter: 6,
    soundUrl: "https://res.cloudinary.com/dibnenfot/video/upload/v1653441169/Som_de_Urna_Eletr%C3%B4nica_ma2cfz.mp3"
}

//reducer -----------------------------------------------------------------------

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