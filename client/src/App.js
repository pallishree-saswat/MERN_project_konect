import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
//redux things import
import { loadUser} from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';

import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Navbar from './components/layouts/Navbar';
import Home from './components/layouts/Home';
import Alert from './components/Alert/Alert';
import Posts from './components/posts/Posts';
import UploadPost from './components/posts/UploadPost';
import SinglePost from './components/posts/SinglePost';
import Profiles from './components/profile/Profiles';
import CreateProfile from './components/profile/CreateProfile';
import Profile from './components/singleProfile/Profile'
import Dashboard from './components/profile/Dashboard';
import EditProfile from './components/profile/EditProfile';
import ForgotPassword from './components/auth/ForgotPassword';
import UpdatePassword from './components/auth/UpdatePassword'


  
if(localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {

useEffect(() => {
  store.dispatch(loadUser())
},[])
  return (
    <div>
       <Router>
         <Navbar />
        <Alert />
        <Switch>
        <div className="container mt-5" >

          <Route exact path='/' component={Home} />
          <Route exact path ="/signin" component={Signin} />
          <Route exact path ="/signup" component={Signup} />
          <Route exact path ="/posts" component={Posts} />
          <Route exact path ="/posts/:id" component={SinglePost} />
          <Route exact path ="/uploadpost" component={UploadPost} />
          <Route exact path="/profiles" component={Profiles}/>
          <Route exact path="/profile/:id" component={Profile}/>
         <Route exact path="/create-profile" component={CreateProfile}/>
         <Route exact path="/edit-profile" component={EditProfile}/>
         <Route exact path="/dashboard" component={Dashboard}/>
         <Route exact path="/user/updatePassword" component={UpdatePassword} />
         <Route exact path="/forgotPassword" component={ForgotPassword} />
        
         </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
