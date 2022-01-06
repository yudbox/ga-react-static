import { useState, useMemo, useRef, useEffect, useReducer } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { Counter } from "./Counter";
import { Numbers } from "./Numbers";
import { Todos } from "./Todos";

const ASTIONS = {
  INCREMENT: 'increment',
  DECRIMENT: 'decriment'

}

const reducer = (state, action) => {
  switch(action.type) {
    case ASTIONS.INCREMENT:
      return {count: state.count + 1 }
    case ASTIONS.DECRIMENT:
      return {count: state.count - 1 }
    default:
      return state
  }
}

function App() {
  const [count, setCount] = useState(4)
  const [theme, setTheme] = useState('blue')
  const initialState = {count: 0}
  const [state, dispatch] = useReducer(reducer, initialState)

  const renderCount = useRef(0)

  useEffect(()=>{
    renderCount.current = renderCount.current + 1 
  })

  const decrementCount = () => {
    setCount(count - 1)
    dispatch({type: ASTIONS.DECRIMENT})
  }
  const incrementCount = () => {
    setCount(count + 1)
    dispatch({type: ASTIONS.INCREMENT})
  }
  // const doubleNumber = useMemo(()=> {
  //  return slowFunction(count)
  // }, [count])

  // const doubleNumber = slowFunction(count)

  const changeTheme = () => {
    setTheme('red')
  }

  return (
       <ThemeProvider>

        <div className="App">
        learn react
          <button onClick={decrementCount}>-</button>
          <span>{count}</span>
          <button onClick={incrementCount}>+</button>
          {/* <div>{doubleNumber}</div> */}
          <div>{theme}</div>
          <div>Reducer count: {state.count}</div>
          <div><button onClick={changeTheme}>Change theme</button></div>
          <Counter />
          <Todos />
          <Numbers />
        </div>

       </ThemeProvider>
  );
}

const slowFunction = (num) => {
  console.log('Calling slow function 1');
  for(let i = 0; i < 1000000000; i++) {}
  console.log('Calling slow function 2');
  return  num * 2
}

export default App;
