import React, { useEffect, Fragment } from 'react'
import {connect} from 'react-redux'
import {getCurrentProfile, deleteAccount} from '../../redux/actions/profile'

import { Link} from 'react-router-dom'
import ProfileTop from '../singleProfile/ProfileTop'
import ProfileAbout from '../singleProfile/ProfileAbout'
import MyProfilePost from './MyProfilePost'


const Dashboard = ({getCurrentProfile, deleteAccount, auth:{ user }, profile:{loading,profile,mypost}}) => {

useEffect(()=>{

getCurrentProfile()

},[getCurrentProfile])
return  loading && profile === null ? (
    <h1>loading</h1>
) :(
    <Fragment>
      
        <p className='lead'>
Welcome to your profile {' '}  <span style={{color:'#007bff'}}>{user && user.name}</span> 
        </p>
        {profile !== null ? (<Fragment>
            <div className="profile-grid my-1">
                       <ProfileTop profile={profile} />
                       <ProfileAbout profile={profile} />
                       <MyProfilePost mypost={mypost} />
                      
                   </div>
           
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete my account
                </button>

            </div>
        </Fragment>) : (
        <Fragment> 
        <div className="profile-grid my-1">
        <div className="profile-top bg-dark p-2">
        <img
          className="round-img "
          src={user && user.pic}
          alt=""
        />
        <h6 className="large">{user && user.name}</h6>

      
 </div>
        </div>  
       <p>You dont have any profile info..please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
        </Link>
        </Fragment>) }
    </Fragment>
)
}


const mapStateToProps = state => ({
    auth: state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)