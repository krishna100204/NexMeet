import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history.jsx';


function App() {
  return (
    <div className='App'>


    <>
    <Router>
      
     <AuthProvider>



      <Routes>
       <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/auth' element={<Authentication/>}> </Route>
         <Route path='/home' element={<HomeComponent/>}> </Route>
          <Route path='/history' element={<History/>}> </Route>
        <Route path='/:url' element={<VideoMeetComponent/>}></Route>

      </Routes>
      </AuthProvider>

    </Router>
    </>
    </div>
  );
}

export default App;
