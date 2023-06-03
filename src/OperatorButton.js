import { ACTIONS} from "./App"

export default function OperatorButton({operator, dispatch}){

    return(
        <button onClick={()=> dispatch({type: ACTIONS.ADD_OPERATOR, payload: {operator} })}>{operator}</button>
    )
}