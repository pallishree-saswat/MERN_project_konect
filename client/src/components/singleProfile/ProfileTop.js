import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { updatePic } from '../../redux/actions/auth';

const ProfileTop = ({ profile : { user}, uploadPic}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [pic, setPic] = useState('');

  const imageHandler = (e) => {
    console.log("dd")
    if (e.target.files && e.target.files[0]) {
        let img = e.target.files[0]
        setPic(img)
        
    }
}


  const formSubmitHandler = (e) => {
    console.log("sp")
      e.preventDefault()
      const formData = new FormData()
      formData.append("imgUrl", pic)
      console.log(formData)

      dispatch(updatePic(formData, history))
     /*  setIsLoading(true) */
  }




    return (
        <div className="profile-top bg-dark p-2">
        <img
          className="round-img "
          src={user.pic}
          alt=""
        />
        <h6 className="large">{user.name}</h6>


        <form onSubmit={formSubmitHandler}>
        <div className="file-field input-field">
               <div className="btn">
                   <spna>Upload pic</spna>
                   <input type="file" onChange={imageHandler} />
               </div>
               <div className="file-path-wrapper" >
                   <input className="file-path validate" type="text" />
               </div>
           </div>
           <button>submit</button>
           </form> 
 </div>
    

    )
}

export default ProfileTop
