import React, { useCallback, useEffect, useState } from "react";

export const Numbers = () => {
    const [number, setNumber] = useState(1)
    const [dark, setDark] = useState(false)

    const getItems = useCallback(() => {
        return [number, number + 1, number + 2]
    }, [number])
    const theme = {
        backgroundColor: dark ? '#333' : '3fff',
        color: dark ? '#fff' : '#333'
    }
   
    return (
         <div style={theme}>
             <input 
             type="number"
             value = {number}
             onChange={e=> setNumber(parseInt(e.target.value))}
             />
            <button onClick={()=>setDark(prevDark=> !prevDark)}>Toggle theme</button>
            <List getItems={ getItems } />
         </div>
     )
 }

 const List = ({getItems}) => {
    const [items, setItems] =  useState([])
    useEffect(()=> {
        console.log('getItems');
        setItems(getItems())
    }, [getItems])
    return items.map(item => <div key={item}>{item}</div>)
 }
 