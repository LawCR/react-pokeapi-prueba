import { toogleMode } from "../slices/ui"
import { AppDispatch } from "../store"

export const toogleModeAction = () => async(dispatch: AppDispatch) => {
    try {
        dispatch(toogleMode())
    } catch (error) {
        console.log(error)
    }
}