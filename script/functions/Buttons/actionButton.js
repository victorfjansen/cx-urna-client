import { store } from "../../context/configureStore/index.js";
import getState from "../../utils/getState.js";
import { emailInput } from "../../variables/formVariables.js";

//Constructor de objeto que define o som que vai tocar
const sound = new Howl({
    src: getState("soundUrl"),
    volume: 1.0
});

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
        console.log(store.getState().voteCounter)
        return getState("soundUrl")
    } else {
        store.dispatch({type: "UPDATE_SOUNDURL", payload: "https://res.cloudinary.com/dibnenfot/video/upload/v1654017884/urna-mateus_lwvxdj.mp4"})
        store.dispatch({type: "RESET_COUNTER"})
        return getState("soundUrl")
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
            sound.play()
            alert("Dados enviados com Sucesso!")
            store.dispatch({type: "UPDATE_COUNTER"})
        } catch(e) {
            alert("Algo deu errado! Tente novamente mais tarde")
        }
    } else alert("Preencha todos os dados corretamente!")
}

export default handleActionButton
