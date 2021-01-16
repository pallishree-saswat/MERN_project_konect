  
import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import PostItems from './PostItems';
import PostForm from './PostForm';
import UploadPost from './UploadPost';
import { getPosts } from '../../redux/actions/post';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      
   <UploadPost/> 
      <div className="posts">
        {posts.map((post) => (
          <PostItems key={post._id} post={post} showActions={true} />
        ))}
      </div> 
    </Fragment>
  );
};



const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);