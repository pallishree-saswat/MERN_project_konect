import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PostItems from './PostItems';
import CommentForm from './CommentForm';
import AllComments from './AllComments';
import { getPost } from '../../redux/actions/post';

const SinglePost = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
   <h3>Loading.......</h3>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItems post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <AllComments key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};



const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(SinglePost);