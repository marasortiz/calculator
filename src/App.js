import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";
import { useReducer } from "react";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Limit the '0' so that only one number is displayed (1st number)
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      // Limits '.' if one already exists
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Operator without preceding numbers
      if (state.currentOperand == null && state.previewOperand == null) {
        return state
      }
      // Operation is changed
      if (state.currentOperand == null) {
        return{
          ...state,
          operation: payload.operation,
        }
      }      
      // Operator with only numbers
      if (state.previewOperand == null) {
        return { 
          ...state, 
          operation: payload.operation,
          previewOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return{
        ...state, 
        previewOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      break;
    case ACTIONS.EVALUATE:
      break;

    default:
      break;
  }
}

function evaluate ({ currentOperand, previewOperand, operation }) {
  const prev = parseFloat(previewOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      break;
  }

  return computation.toString();
}

function App() {
  const [{ currentOperand, previewOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit:1 }});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previewOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <OperationButton operation="=" dispatch={dispatch} className="span-two" />
      {/* <button className="span-two">=</button> */}
    </div>
  );
}

export default App;
