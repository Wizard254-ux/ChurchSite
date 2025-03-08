import { useState } from 'react'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NotFound from '../Pages/NotFound'
import LandingPage from '../Pages/LandingPage'
import Overview from '../Pages/Overview'
import TransactionPage from '../Pages/Transactions'
import MembersPage from '../Pages/MembersPage'
import AccountsPage from '../Pages/Accounts'
function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='*' element={<NotFound/>} >
        </Route>
        <Route path='/' element={<LandingPage/>} >
        </Route> 
        <Route path='/overview' element={<Overview/>} >      
        </Route>  
        <Route path='/transactions' element={<TransactionPage/>} >      
        </Route>  
        <Route path='/members' element={<MembersPage/>} >      
        </Route>  
        <Route path='/accounts' element={<AccountsPage/>} >      
        </Route>  
    </Routes>

    </BrowserRouter>
  )
}

export default App
