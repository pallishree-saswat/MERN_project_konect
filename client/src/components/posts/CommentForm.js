import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post';


const CommentForm = ({ postId, addComment, auth : {isAuthenticated, loading, user}}) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
     
        <h6> Comment  here....</h6>
      
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='comment here...'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth : state.auth
})

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);