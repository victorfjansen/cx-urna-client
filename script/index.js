import { sendButton } from "./variables/formVariables.js"
import handleButtons from "./functions/Buttons/handleButtons.js"
import handleActionButton from "./functions/Buttons/actionButton.js"


handleButtons()
sendButton.addEventListener('click', handleActionButton)

