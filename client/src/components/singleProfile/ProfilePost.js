import React, { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch ,connect} from 'react-redux'
import { useHistory,Link } from 'react-router-dom'
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';

const ProfilePost = ({usersPost, addLike,
    removeLike,
    deletePost,
    auth}) => {
    const history = useHistory()
    const dispatch = useDispatch()
  

  
    return (
        <Fragment>
            {usersPost && usersPost.map(post => (
               <Fragment>
                   <div className="card" style={{maxWidth:'500px' , maxHeight:"max-content"}}>
              <h5>{post.text}</h5>
              <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
      </p>
             <div className="gallery" style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
           
            <img src={post.imgUrl} style={{width:'500px' , height:'400px'}} />
            
             </div>
             {/* <Link to={`/posts/${post._id}`} className='btn btn-primary'>comments</Link> */}
             </div>

             <Fragment>
          <button
            onClick={() => addLike(post._id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(post._id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${post._id}`} className='btn btn-primary'>
           Comments{' '}
            {post.comments.length > 0 && (
              <span className='comment-count'>{post.comments.length}</span>
            )}
          </Link>
          {!auth.loading && post.user === auth.user._id && (
            <button
              onClick={() => deletePost(post._id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
     
               </Fragment>
            ))}

        </Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { addLike, removeLike, deletePost }
  )(ProfilePost)

 
