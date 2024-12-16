import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import {Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';
import DashboardAdmin from './components/DashboardAdmin';
import ViewUsers from './components/ViewUsers';

function App() {
  return (
    <Routes>
             <Route path='/' element={<MainPage/>}/>
             <Route path='/signup' element={<Registration />}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/dashboard' element={<Dashboard/>}/>
             <Route path='/admin/dashboard' element={<DashboardAdmin/>}/>
             <Route path='/profile' element={<Profile/>}/>
             <Route path='/errorpage' element={<ErrorPage/>}/>
             <Route path='/dashboard/viewCustomers' element={<ViewUsers/>}/>
    </Routes>
   
  );
}

export default App;
