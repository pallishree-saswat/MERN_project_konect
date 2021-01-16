
import {GET_PROFILE, PROFILE_ERROR ,CLEAR_PROFILE ,UPDATE_PROFILE, GET_PROFILES,GET_MY_PROFILE} from "../actions/types";
const initialState = {
    profile: null, //your profiles
    profiles:[],    //others profiles
    loading:true,
    usersPost:[],
    mypost:[],
    error:{}

}



export default function( state= initialState, action){
    const { payload,type} = action;
    
    switch(type){
        case GET_MY_PROFILE:
            return{
                ...state,
                profile:payload.profile,
                mypost:payload.post,
                loading:false
            }
        case GET_PROFILE:
        case UPDATE_PROFILE:    
            return{
                ...state,
                profile:payload.profile,
                usersPost:payload.posts,
                loading:false
            };
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false,
               
            }
     case PROFILE_ERROR:
            return{
                ...state, 
                error:payload,
                loading:false,
                profile: null,
                filtered:null
            };
            case CLEAR_PROFILE:
                return{
                    ...state,
                    profile:null,
                    repos:[],
                    loading:false
                }
                
    
          
        default:
            return state        
    }

}