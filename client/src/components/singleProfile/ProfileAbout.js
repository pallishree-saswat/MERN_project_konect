import React,{Fragment} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
const ProfileAbout = ({profile : {bio,location,status,  user: {name,_id}},auth}) => {
    return (
       <div className="profile-about bg-light p-2">
       {bio && (
           <Fragment>
          <h2 className="text-primary">{name}s Bio</h2>
          
       <p className="lead">Status :{status}  </p>
        <p className="lead">Location: {location && <span> {location} </span>}</p> 
        <p className="lead">
            Bio:  {bio}
          </p>
          <div className="line"></div>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === _id && (
                       <Link to="/edit-profile" className="btn btn-primary">
                           edit Profile
                       </Link>
                 
                   ) }

{auth.isAuthenticated && auth.loading === false && auth.user._id === _id && (
                       <Link to="/user/updatePassword" className="btn btn-primary mt-3">
                           UPDATE PASSWORD
                       </Link>
                 
)}

           </Fragment>
       )}

       
        </div>
     
    )
}

const mapStateToProps = state => ({
    
    auth : state.auth
})

export default connect(mapStateToProps)(ProfileAbout)