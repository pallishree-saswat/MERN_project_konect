import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions/post';

const AllComments = ({  postId,
    comment: { _id, text, name, pic, user, date },
    auth,
    deleteComment
  }) => {
    return (
        <div className='p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
          {/* <img  src={pic}  className="round-img" width="50px" height="50px" /> */}
            <h6>{name}</h6>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
       <div>
       {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteComment(postId, _id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
       </div>
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });

export default  connect(mapStateToProps, {deleteComment})  (AllComments)
