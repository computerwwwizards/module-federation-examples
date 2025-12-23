import React, { ComponentProps, MouseEvent, useCallback, useReducer } from 'react';
import { Link } from 'react-router';

/**
 * 
 * This was AI generated 
 */

type Operation = '+' | '-' | '*' | '/';

interface CalculatorState {
  display: string;
  memory: number | null;
  pendingOperation: Operation | null;
  shouldResetDisplay: boolean;
  history: Array<{ operation: Operation; operand: number; result: number }>;
}

type CalculatorAction =
  | { type: 'INPUT_NUMBER'; payload: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'SET_OPERATION'; payload: Operation }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_MEMORY' }
  | { type: 'DELETE' };

const calculate = (firstOperand: number, secondOperand: number, operation: Operation): number => {
  switch (operation) {
    case '+': return firstOperand + secondOperand;
    case '-': return firstOperand - secondOperand;
    case '*': return firstOperand * secondOperand;
    case '/': return firstOperand / secondOperand;
  }
};

const initialState: CalculatorState = {
  display: '0',
  memory: null,
  pendingOperation: null,
  shouldResetDisplay: false,
  history: [],
};

const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      if (state.shouldResetDisplay) {
        return { ...state, display: action.payload, shouldResetDisplay: false };
      }
      return {
        ...state,
        display: state.display === '0' ? action.payload : state.display + action.payload,
      };
    }

    case 'INPUT_DECIMAL': {
      if (state.shouldResetDisplay) {
        return { ...state, display: '0.', shouldResetDisplay: false };
      }
      if (state.display.includes('.')) return state;
      return { ...state, display: state.display + '.' };
    }

    case 'SET_OPERATION': {
      const currentValue = parseFloat(state.display);

      if (state.memory === null) {
        return {
          ...state,
          memory: currentValue,
          pendingOperation: action.payload,
          shouldResetDisplay: true,
        };
      }

      if (state.pendingOperation) {
        const result = calculate(state.memory, currentValue, state.pendingOperation);
        return {
          ...state,
          display: String(result),
          memory: result,
          pendingOperation: action.payload,
          shouldResetDisplay: true,
          history: [
            ...state.history,
            { operation: state.pendingOperation, operand: currentValue, result },
          ],
        };
      }

      return {
        ...state,
        memory: currentValue,
        pendingOperation: action.payload,
        shouldResetDisplay: true,
      };
    }

    case 'CALCULATE': {
      if (state.memory === null || !state.pendingOperation) return state;

      const currentValue = parseFloat(state.display);
      const result = calculate(state.memory, currentValue, state.pendingOperation);

      return {
        ...state,
        display: String(result),
        memory: null,
        pendingOperation: null,
        shouldResetDisplay: true,
        history: [
          ...state.history,
          { operation: state.pendingOperation, operand: currentValue, result },
        ],
      };
    }

    case 'CLEAR': {
      return { ...state, display: '0', shouldResetDisplay: false };
    }

    case 'CLEAR_MEMORY': {
      return initialState;
    }

    case 'DELETE': {
      if (state.display.length === 1) {
        return { ...state, display: '0' };
      }
      return { ...state, display: state.display.slice(0, -1) };
    }

    default:
      return state;
  }
};

 const Button: React.FC<{
    variant?: 'default' | 'operation' | 'equals' | 'clear' | 'delete' | 'memory';
    spanCols?: number;
  } & ComponentProps<'button'> > = ({ variant = 'default', spanCols = 1, ...props }) => {
    const baseStyles = 'p-4 text-xl font-semibold rounded-lg transition-all active:translate-y-0 hover:translate-y-[-2px] border-none cursor-pointer';

    const variants = {
      default: 'bg-white/20 text-white hover:bg-white/30 active:shadow-md',
      operation: 'bg-orange-500/40 text-orange-300 hover:bg-orange-500/60 font-bold',
      equals: 'bg-green-500/40 text-green-300 hover:bg-green-500/60 font-bold',
      clear: 'bg-red-500/40 text-red-300 hover:bg-red-500/60 font-bold',
      delete: 'bg-yellow-500/40 text-yellow-300 hover:bg-yellow-500/60 font-bold',
      memory: 'bg-blue-500/40 text-blue-300 hover:bg-blue-500/60 font-bold',
    };

    const colSpanClass = spanCols === 2 ? 'col-span-2' : '';

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${colSpanClass}`}
        {...props}
      />
    );
  };


export const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const onHandleAction = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { action, operation, number } = event.currentTarget.dataset;
    
    if (action) {
      const actionType = action as CalculatorAction['type'];
      if (actionType === 'INPUT_DECIMAL' || actionType === 'CALCULATE' || actionType === 'CLEAR' || actionType === 'CLEAR_MEMORY' || actionType === 'DELETE') {
        dispatch({ type: actionType });
      }
    } else if (operation) {
      dispatch({ type: 'SET_OPERATION', payload: operation as Operation });
    } else if (number) {
      dispatch({ type: 'INPUT_NUMBER', payload: number });
    }
  }, [])

  return (
    <div className="w-80 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 shadow-2xl font-sans">
      <div className="bg-gray-900 text-cyan-400 text-4xl p-5 rounded-lg text-right break-words mb-5 min-h-16 flex items-center justify-end font-bold">
        {state.display}
      </div>
      
      {state.history.length > 0 && (
        <div className="bg-black/20 rounded-lg p-2 mb-3 max-h-20 overflow-y-auto text-xs text-white/60">
          {state.history.map((entry, index) => (
            <div key={index}>
              {entry.operation} {entry.operand} = {entry.result}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2.5">
        <Button data-action="CLEAR" onClick={onHandleAction} variant="clear">
          AC
        </Button>
        <Button data-action="CLEAR_MEMORY" onClick={onHandleAction} variant="memory">
          MC
        </Button>
        <Button data-action="DELETE" onClick={onHandleAction} variant="delete">
          DEL
        </Button>
        <Button 
          data-operation="/"
          onClick={onHandleAction} 
          variant="operation"
        >
          ÷
        </Button>

        <Button data-number="7" onClick={onHandleAction}>7</Button>
        <Button data-number="8" onClick={onHandleAction}>8</Button>
        <Button data-number="9" onClick={onHandleAction}>9</Button>
        <Button 
          data-operation="*"
          onClick={onHandleAction} 
          variant="operation"
        >
          ×
        </Button>

        <Button data-number="4" onClick={onHandleAction}>4</Button>
        <Button data-number="5" onClick={onHandleAction}>5</Button>
        <Button data-number="6" onClick={onHandleAction}>6</Button>
        <Button  
          data-operation="-"
          onClick={onHandleAction} 
          variant="operation"
        >
          −
        </Button>

        <Button data-number="1" onClick={onHandleAction}>1</Button>
        <Button data-number="2" onClick={onHandleAction}>2</Button>
        <Button data-number="3" onClick={onHandleAction}>3</Button>
        <Button 
          data-operation="+"
          onClick={onHandleAction} 
          variant="operation"
        >
          +
        </Button>

        <Button data-number="0" onClick={onHandleAction} spanCols={2}>
          0
        </Button>
        <Button data-action="INPUT_DECIMAL" onClick={onHandleAction}>.</Button>
        <Button data-action="CALCULATE" onClick={onHandleAction} variant="equals">
          =
        </Button>
      </div>
      <Link to="./scientific" className="block mt-4 text-center text-white/80 hover:text-white">
        Go to scientific calculator
      </Link>
    </div>
  );
};
