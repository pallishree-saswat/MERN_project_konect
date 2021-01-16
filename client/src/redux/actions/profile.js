import axios from 'axios';
import {setAlert} from './alert'
import {API} from '../../config'
import {
GET_PROFILE,
PROFILE_ERROR,
UPDATE_PROFILE,
CLEAR_PROFILE,
ACCOUNT_DELETED,
GET_PROFILES,
GET_MY_PROFILE

} from './types'

//get current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        
        const res = await axios.get(`${API}/profile/me`)
      
         dispatch({
             type:GET_MY_PROFILE,
             payload:res.data
         });

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        
        const res = await axios.get(`${API}/profile`)
      
         dispatch({
             type:GET_PROFILES,
             payload:res.data
         });

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
           // payload:{msg: err.response.statusText, status: err.response.status}
        })
        
    }
}


//get  profile by id
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        
        const res = await axios.get(`${API}/profile/user/${userId}`);
      
         dispatch({
             type:GET_PROFILE,
             payload:res.data
         });
         console.log("abcd",res.data )

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
        
    }
}



//create or update profile
export const createProfile = (formData, history, edit=false) =>  async dispatch => {
    try {

        const config = {
            headers :{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post(`${API}/profile`,formData,config);
        
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

         dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));

       if(!edit){
               history.push('/dashboard')
       }


        
    } catch (err) {
        const errors = err.response.data.errors 

       if(errors) {
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
        
    }

}



//delete profile and account

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? this can not be undone!')) {
        try {

            const res = await axios.delete(`${API}/profile`);

            dispatch({ type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your Account  has been deleted permanently'))
            
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload:{ msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}



