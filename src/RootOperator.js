import { ACTIONS} from "./App"

export default function RootOperator({root, dispatch}){

    return(
        <button onClick={()=> dispatch({type: ACTIONS.ADD_ROOT, payload: {root} })}>{root}</button>
    )
}