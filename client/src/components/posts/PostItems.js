import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import post from '../../redux/reducers/post';

const PostItems = ({
    addLike,
    removeLike,
    deletePost,
    auth,
    post: { _id, text, name, pic, user,imgUrl, likes, comments, date },
    showActions
}) => {
    return (
        <div className="row">
            <div className="col-6">
            <div class="row">
                 <div class="col-lg-2 mt-3">
                 <Link to={`/profile/${user}`}>  
                    <img  src={pic}  className="round-img" width="50px" height="50px" />
                    </Link>
                 </div>
                 <div class="col-lg-4">
                 <Link to={`/profile/${user}`}>  
                 
                    <h5>{name}</h5></Link>
                    
                 </div>
             </div>
             <div class="row">
               <div class="col-lg-12">
               <h5 className='my-1'>{text}</h5>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
         
       <img className="img-thunbnail mb-3 img-fluid w-100" src={imgUrl} width="500px" height="400px" />
            <br />
               </div>
           </div>
           {showActions && (  
         <div class="row">
          {/*    <div class="col-lg-5" style={{marginTop:"5px;" , fontSize:" 25px;"}}>Likes</div>
             <div class="col-lg-5" style={{marginTop:"5px;" , fontSize:" 25px;"}}>Comments</div> */}
                 <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Comments{' '}
         
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
               <i className='fas fa-trash' />
            </button>
          )}
             
         </div>
            )}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { addLike, removeLike, deletePost }
  )(PostItems);
