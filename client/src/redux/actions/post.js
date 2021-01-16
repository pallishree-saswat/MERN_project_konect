import axios from 'axios';
import { setAlert } from './alert';
import {API} from '../../config'
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_USERS_POST
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${API}/post`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`${API}/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`${API}/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${API}/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost =( formData,history )=> async dispatch => {
  try {
    console.log(formData,"abcd")
    const res = await axios.post(`${API}/post`, formData);
console.log(res.data, "hhhh")
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
   
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`${API}/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await axios.post(`${API}/post/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`${API}/post/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get users post
/* export const getUsersPost = (userId) => {
  return async (dispatch) => {
      try {
          const res = await axios({
              method: "Get",
              url: `${API}/post/getuserspost/${userId}`
          })
          dispatch({
            type: GET_USERS_POST,
            payload: res.data
           
          })
          console.log(res.data)
      }
      catch (err) {
          console.log("Error in getting all Post", err.message)
      }
  }
} */