import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect,useDispatch } from 'react-redux';
import { addPost } from '../../redux/actions/post';
import {useHistory} from 'react-router-dom'

import './Form.css'

const UploadPost = () => {
  const dispatch = useDispatch()
  const history = useHistory()
    const [text, setText] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const imageHandler = (e) => {
      console.log("kkk")
      if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0]
          setImgUrl(img)
          
      }
  }


    const formSubmitHandler = (e) => {
      console.log("pppp")
        e.preventDefault()
        const formData = new FormData()
        formData.append("imgUrl", imgUrl)
        formData.append("text", text)
        console.log(formData)
 
        dispatch(addPost(formData, history))
       /*  setIsLoading(true) */
    }

      /* setIsLoading(true) */



    return (
       
      <section class="contact-section">
    <div class="container">
    <div class="contact-form">
        <div class="row">
            <div class="col-md-8">
              <form  onSubmit={formSubmitHandler}>
              <div class="status">
                    Update Status | Upload Photos
                </div>
                <hr />
              
                <div class="form-group">
                    <textarea class="form-control" placeholder="Write here..."  value={text}
                    onChange={e => setText(e.target.value)} required></textarea>
                    <input type="file" class="form-control" accept=".jpg,.png,.jpeg"
                              onChange={imageHandler} />
                    <button type="submit" class="btn btn-dark my-1" >Upload</button>
                </div>
              </form>
              
            </div>
            </div>
    </div>
    </div>
</section>
    
  
    
    )
  }


export default UploadPost;


