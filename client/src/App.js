import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Project from './components/pages/Project';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Intro from './components/layout/Intro';
import Footer from './components/layout/Footer';
import UsersState from './context/users/UsersState';
import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import EditProjectModal from './components/Models/EditProjectModal';
import AddProjectModal from './components/Models/AddProjectModal';
import './App.css';

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  return (
    <AuthState>
      <ProjectState>
        <UsersState>
          <Router>
            <div
              className=' grey darken-3'
              style={{ margin: '0px', paddingTop: '40px', height: '1500px' }}
            >
              <Intro />
              <div className='container' style={{ marginTop: '60px' }}>
                <Navbar />
                <div className='container'>
                  <EditProjectModal />
                  <AddProjectModal />
                </div>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/projects' component={Project} />
                </Switch>
                <Footer />
              </div>
            </div>
          </Router>
        </UsersState>
      </ProjectState>
    </AuthState>
  );
};

export default App;
