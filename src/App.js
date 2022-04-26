import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from "react";

import Nav from './components/Navigation/Nav '
import _ from 'lodash'
import AppRouter from "./routers/AppRouter";
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext'

function App() {
  const [account, setAccount] = useState({})
  const { user } = useContext(UserContext)
  console.log('>>> check user:', user)

  return (
    <>
      <Router>
        {
          user && user.isLoading ?
            <div className="loading-container">
              <Rings
                height='100'
                width={100}
                color='#1877f2'
                ariaLabel="loading"
              />
              <div>Loading data ...</div>
            </div>
            : <>
              <div className="app=header">
                <Nav />
              </div>
              <div className="app-container">
                <AppRouter />
              </div>
            </>
        }

      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
