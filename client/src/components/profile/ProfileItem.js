import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, pic },
    status,
   location,
  
  }
}) => {
  return (

 
   
    <div className='card col-sm-4'>
      <img src={pic} alt='' className='img-thumbnail img-fluid'/>
      <div>
        <h5>{name}</h5>
        {/* <p>
          {status} 
        </p> */}
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
   
    </div>

  );
};



export default ProfileItem;