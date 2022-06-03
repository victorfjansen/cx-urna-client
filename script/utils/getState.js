import { store } from "../context/configureStore/index.js"

export default function getState(option) {
    return store.getState()[option]
}