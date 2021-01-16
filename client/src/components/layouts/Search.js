import React, {  useRef, useEffect } from 'react';
import { } from '../../redux/actions/profile'
import {connect} from 'react-redux'

const Search = ({}) => {

  const text = useRef('');



  useEffect(() => {
  
  });

  const onChange = e => {
  
  };

  return (
    <form style={{width:'60%', marginLeft:'20%'}}>
      <input
        ref={text}
        type='text'
        placeholder='Search Profile...'
        onChange={onChange}
      />
    </form>
  );
};

export default Search;