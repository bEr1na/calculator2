import { useReducer } from 'react';
import './style.css'
import DigitButton from './DigitButton';
import OperatorButton from './OperatorButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit', 
  ADD_OPERATOR: 'add-operator', 
  ALL_CLEAR: 'all-clear', 
  DELETE_DIGIT: 'delete-digit', 
  EVALUATE: 'evaluate'
}

export function reducer(state, {type, payload}){
  switch(type){

    case ACTIONS.ADD_DIGIT:
      if(state.overwrite)
      return{
        ...state, 
        overwrite:false,
        currentOperand: payload.digit
      }
     if(state.currentOperand === '0' && payload.digit === '0') return state 
     if(state.currentOperand == null && payload.digit === '.') return state
     if( payload.digit === '.' && state.currentOperand.includes('.') ) return state
    return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.ADD_OPERATOR:
      if(state.currentOperand == null && state.previousOperand == null) return state
      if(state.currentOperand == null){
        return{
          ...state,
          operator: payload.operator, 
        }
      }
      if(state.previousOperand == null){
        return{
          previousOperand: state.currentOperand,
          operator: payload.operator,
          currentOperand: null
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operator: payload.operator, 
        currentOperand: null
      }
    case ACTIONS.ALL_CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if(state.previousOperand != null && state.currentOperand != null)
      return {
        ...state,
        overwrite: true,
        previousOperand: null, 
        operator: null,
        currentOperand: evaluate(state)
      }
      return state

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) 
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      if(state.currentOperand == null) return state

      if(state.currentOperand.length === 1)
      return{
        ...state,
        currentOperand: null
      }
  
      return {
        ...state, 
        currentOperand: state.currentOperand.slice(0, -1)
      }
}
}

function evaluate({currentOperand, previousOperand, operator}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  switch(operator) {
    case '+':
      computation = prev + current
      break
    case '-':
        computation = prev - current
        break
    case '*':
          computation = prev * current
          break
     case '÷':
            computation = prev / current
            break
  }
  return computation.toString()
}

function App() {

  const [{previousOperand, currentOperand, operator}, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operator}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.ALL_CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperatorButton operator='÷' dispatch={dispatch}/>
      <DigitButton digit='1' dispatch={dispatch}/>
      <DigitButton digit='2' dispatch={dispatch}/>
      <DigitButton digit='3' dispatch={dispatch}/>
      <OperatorButton operator='*' dispatch={dispatch}/>
      <DigitButton digit='4' dispatch={dispatch}/>
      <DigitButton digit='5' dispatch={dispatch}/>
      <DigitButton digit='6' dispatch={dispatch}/>
      <OperatorButton operator='+' dispatch={dispatch}/>
      <DigitButton digit='7' dispatch={dispatch}/>
      <DigitButton digit='8' dispatch={dispatch}/>
      <DigitButton digit='9' dispatch={dispatch}/>
      <OperatorButton operator='-' dispatch={dispatch}/>
      <DigitButton digit='.' dispatch={dispatch}/>
      <DigitButton digit='0' dispatch={dispatch}/>
      <button className='span-two' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
