import React, { useState, Fragment, useEffect } from 'react'
import { connect} from 'react-redux'
import {createProfile, getCurrentProfile} from '../../redux/actions/profile'
import { Link, withRouter} from 'react-router-dom'

const EditProfile = ({ profile:{profile, loading}, createProfile,getCurrentProfile, history}) => {

const [formData, setFormData] = useState({
  
  location:'',
  status:'',
   bio:'',

})



useEffect(() => {
    getCurrentProfile();

    setFormData({
   
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        bio: loading || !profile.bio ? '' : profile.bio
       

    });
},[loading,getCurrentProfile])

const {
  
    location,
    status,
     bio,
  
} = formData;

const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
}


const onSubmit = e => {
    e.preventDefault();
    createProfile(formData,history,true)
}

    return (
      <Fragment>
          <h1 className="large text-primary">
       Edit Your Profile
      </h1>
      <div className="row">
            <div className="col-md-8">
      <form className="form" onSubmit={e => onSubmit(e)} >
 
 <div className="form-group">
<input type="text" placeholder="Status" name="status" value={status} onChange={e => onChange(e)} />

</div>

<div className="form-group">
<input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}   />
<small className="form-text">
 City & state suggested (eg. Boston, MA)</small>

</div>


<div className="form-group">
<textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)} ></textarea>
<small className="form-text">Tell us a little about yourself</small>
</div>

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      </div>
      </div>
      </Fragment>
    )
}

 const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps,{createProfile, getCurrentProfile})(withRouter(EditProfile))