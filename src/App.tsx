import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GeekLayout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Publish from '@/pages/Publish'
import Personal from '@/pages/Personal'
import MyBlog from '@/pages/MyBlog'
import Article from '@/pages/Article'
import NotFound from '@/pages/NotFound'


import PassWord from '@/pages/PassWord'


import './App.scss'
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={< GeekLayout />}>
            <Route index element={<Home />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='publish' element={<Publish />}></Route>
            <Route path='personal' element={<Personal />}></Route>
            <Route path='myblog' element={<MyBlog />}></Route>
            <Route path='password' element={<PassWord />}></Route>
            <Route path='article' element={<Article />}></Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
          <Route path='/login' element={< Login />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
