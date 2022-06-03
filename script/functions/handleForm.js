import { store } from "../context/configureStore/index.js";
import { candidateOptions, emailInput } from "../variables/formVariables.js";

//Constructor de objeto que define o som que vai tocar
const sound = new Howl({
    src: [store.getState().soundUrl],
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

//Main function to put in  form eventListener 
export default async function handleForm(event) {
    event.preventDefault()
    if(!!candidateOptions.value && !!emailInput.value) {
        try {
            await POST_VOTE({
                email: emailInput.value,
                nome_da_plataforma: candidateOptions.value
            })
            sound.play()
            alert("Dados enviados com Sucesso!")
        } catch(e) {
            alert("Algo deu errado! Tente novamente mais tarde")
        }
    } else alert("Preencha os dados corretamente")
}
