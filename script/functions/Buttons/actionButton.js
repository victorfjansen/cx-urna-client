import { store } from "../../context/configureStore/index.js";
import getState from "../../utils/getState.js";
import { emailInput, fimImage } from "../../variables/formVariables.js";

//funcao de post na api
async function POST_VOTE (variables) {
    const response = await fetch("https://cx-urna.herokuapp.com/votos",  {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(variables)
    }) 
    if(!response.ok) throw new Error("Ops, você só pode votar uma vez!")
}

function verifyCounter() {
    if(getState("voteCounter") <= 6) {
        store.dispatch({type: "UPDATE_SOUNDURL", payload: "https://res.cloudinary.com/dibnenfot/video/upload/v1653441169/Som_de_Urna_Eletr%C3%B4nica_ma2cfz.mp3"})
    } else {
        store.dispatch({type: "UPDATE_SOUNDURL", payload: "https://res.cloudinary.com/dibnenfot/video/upload/v1654017884/urna-mateus_lwvxdj.mp4"})
        store.dispatch({type: "RESET_COUNTER"})
    }
}

//Main function to put in  form eventListener 
async function handleActionButton() { 
    if(!!emailInput.value && !!getState("vote")) {
        try {
            await POST_VOTE({
                email: emailInput.value,
                nome_da_plataforma: getState("vote")
            })
            verifyCounter()
            const sound = new Howl({
                src: getState("soundUrl"),
                volume: 1.0
            });
            sound.play()
            store.dispatch({type: "UPDATE_COUNTER"})
            fimImage.style.display = "block"
        } catch(e) {
            if(e == "TypeError: Failed to fetch") alert("Estamos com problemas no nosso servidor 😢 Aguarde alguns segundos e tente novamente!")
            if(e == "Error: Ops, você só pode votar uma vez!") alert("Você já votou uma vez!")
        }
    } else alert("Preencha todos os dados corretamente!")
}

export default handleActionButton
 