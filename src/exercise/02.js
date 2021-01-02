// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import  React, {useState, useEffect} from 'react'

function useLocalStorageState(storageName, defaultValue = '') {
    const [name, setName] = useState(() => {
      const value = localStorage.getItem(storageName);
      if(value)
        return JSON.parse(value);
      return typeof defaultValue === 'function' ? () => defaultValue : defaultValue;
    });
    useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(name))
  }, [name])
    return [name, setName];
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState('name');

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value = {name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
