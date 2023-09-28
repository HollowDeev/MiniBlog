
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication';

//* Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Validation from './components/Validation/Validation'
import Search from './pages/Search/Search'

import { AuthProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth}= useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=> {

    onAuthStateChanged(auth, (user) => setUser(user))

  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider value={{user}}>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={
                <Validation mode='notLogged'>
                  <Login />
                </Validation>
              } />
              <Route path='/register' element={
                <Validation mode='notLogged'>
                  <Register />
                </Validation>
              } />
              <Route path='/posts/create' element={
                <Validation mode='logged'>
                  <CreatePost />
                </Validation>
               } />
              <Route path='/dashboard' element={
                <Validation mode='logged'>
                  <Dashboard />
                </Validation>
              } />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
