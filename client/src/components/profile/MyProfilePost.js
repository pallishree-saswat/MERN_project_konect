import React, { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch ,connect} from 'react-redux'
import { useHistory,Link } from 'react-router-dom'



const MyProfilePost = ({mypost}) => {
    const history = useHistory()
    const dispatch = useDispatch()
  

  
    return (
        <Fragment>
            {mypost && mypost.map(post => (
               <Fragment>
             <div className="row">
         <div className="col-lg-6">
            <h5>{post.text}</h5>
            <img src={post.imgUrl} />
            <Link to={`/posts/${post._id}`} className='btn btn-primary'>comments</Link>
                 </div>
          
                   
             </div>

               </Fragment>
            ))}

        </Fragment>
    )
}


export default MyProfilePost