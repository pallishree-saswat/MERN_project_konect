import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Say Something...'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
           <div className="file-field input-field">
              
                   <spna className="btn btn-dark my-1">Upload Image</spna>
                   <input type="file"  />
             
               <div className="file-path-wrapper" >
                   <input className="file-path validate" type="text" placeholder="upload picture" />
               </div>
           </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
       
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);