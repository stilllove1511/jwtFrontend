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

import Nav from './components/Navigation/Nav '
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";


function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Nav /> */}
          <Switch>
            <Route path="/about">
              about
            </Route>
            <Route path="/news">
              news
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/contact">
              contact
            </Route>
            <Route path="/" exact>
              home
            </Route>
            <Route path="*">
              404 not found
            </Route>
          </Switch>
        </div>

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
