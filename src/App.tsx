import React, { FC } from 'react'
import './App.css'
import SpreadSheet from './components/SpreadSheetComponent'

const App: FC = () => {
  return (
    <div className="App">
      <SpreadSheet x={25} y={25} />
    </div>
  )
}

export default App
