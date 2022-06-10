import {store} from "../../context/configureStore/index.js"
import { UPDATE_VOTE } from "../../context/functions/reducer.js"
import getState from "../../utils/getState.js"
import { voteText } from "../../variables/formVariables.js"

function render() {
    voteText.innerText = getState("vote")
}

function removeClass(){
    Object.values(getState("buttonList")).forEach((item) => {
        const button = document.getElementById(item.id)
        button.classList.remove("active")
    })
}

function addClass(button) {
    const selectedButton = document.getElementById(button.id)
    selectedButton.classList.add("active")
}


function handleProcessButton(button){
    removeClass()
    store.subscribe(render)
    store.dispatch(UPDATE_VOTE(button.value))
    addClass(button)
}

export default function handleButtons() {
    Object.values(getState("buttonList")).forEach((button) => {
        const selectedButton = document.getElementById(button.id)
        const selectedNumber = document.getElementById(button.numberClass)
        selectedButton.addEventListener("click", function() {
            handleProcessButton(button)
        })
        selectedNumber.addEventListener("click", function() {
            handleProcessButton(button)
        })
    })
}

