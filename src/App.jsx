import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Box from './components/Box'
import { ToDoList } from './components/ToDoList'
import ContactPage from './pages/contact'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterPage from './pages/register'
import { Form } from 'react-router-dom'
import CoursePage from './pages/course'
import HomePage from './pages'
import TeamPage from './pages/team'
import ProjectPage from './pages/project'
import FAQPage from './pages/faq'
import PaymentPage from './pages/payment'
import CoinPage from './pages/coin'
import SignInPage from './pages/signin'
import SignUpPage from './pages/signup'
import ResetPasswordPage from './pages/reset-password'
import Page404 from './pages/404'

// todoapp mini
// const STORE_KEY = 'TO_DO_APP'
//   const [toDoList, setToDoList] = useState(() => {
//     let list = localStorage.getItem(STORE_KEY)
//     if(list) {
//       return JSON.parse(list)
//     }
//     return []
//   })

//   const onAdd = (name) => {
//     const task = {
//       id: Date.now(),
//       name,
//       isCompleted: false
//     }
//     setToDoList([...toDoList,task])
//   }

//   const onCompleted = (id) => {
//     let task = toDoList.find(e => e.id === id)
//     if(task) {
//       task.isCompleted = true;
//       setToDoList([...toDoList])
//     }
//   }
function App() {
  return (
    // <>
    //   <ToDoList toDoList={toDoList} onAdd={onAdd} onCompleted={onCompleted}/>
    // </>
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/Contact' element={<ContactPage/>}/>
      <Route path='/course' element={<CoursePage/>}/>
      <Route path='/team' element={<TeamPage/>}/>
      <Route path='/project' element={<ProjectPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/coin' element={<CoinPage/>}/>
      <Route path='/signin' element={<SignInPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/reset-password' element={<ResetPasswordPage/>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
