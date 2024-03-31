import { useState } from 'react'
import './App.css'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateEmp from './UpdateEmp'
import AddEmp from './AddEmp'
import Singleemp from './Singleemp'
import NewTable from './NewTable'
import Addexptable from './Addexptable'
import ExpUpdate from './ExpUpdate'
import Addreltable from './Addreltable'
import RelUpdate from './Relupdate'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/singleemp/:id" element={<Singleemp />} />
          <Route path='/updateemp/:id' element={<UpdateEmp />} />
          <Route path='/addemployee' element={<AddEmp />} />
          <Route path='/newtable/:id' element={<NewTable />} />
          <Route path='/addexptable/:id' element={<Addexptable />} />
          <Route path='/expupdate/:id' element={<ExpUpdate />} />
          <Route path='/addreltable/:id' element={<Addreltable />} />
          <Route path='/relupdate/:id' element={<RelUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
