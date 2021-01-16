import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import { getProfileById } from '../../redux/actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfilePost from './ProfilePost'

const Profile =({ match,auth, getProfileById, profile:{profile, loading, usersPost} ,post }) => {

  useEffect(() => {
      getProfileById(match.params.id)
  },[getProfileById])  
    return (
        <Fragment>
           {profile === null || loading ? (
              <h1>Loading....</h1>
           ) : (
               <Fragment>
                   <Link to="/profiles" className="btn btn-light">
                       Back to Profiles
                   </Link>

                   <div className="profile-grid my-1">
                    
                       <ProfileTop profile={profile}  />
                <div className="profile-exp">
                <ProfileAbout profile={profile} />
                </div>

                <div className="profile-edu">
                 
                {console.log("deepak",usersPost)}
               <ProfilePost usersPost={usersPost} />
                </div>
                
                       
                     
              
                      
                      
                      
                   </div>
                  
               </Fragment>
           )} 
        </Fragment> 
    )
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth : state.auth,
    post:state.post
})

export default connect(mapStateToProps,{getProfileById}) (Profile)