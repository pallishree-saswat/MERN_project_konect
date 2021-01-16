import React,{Fragment, useState} from 'react'
import './auth.css'
import { Link , Redirect,useHistory} from 'react-router-dom';
import { connect } from 'react-redux'
import { register } from '../../redux/actions/auth'
import { setAlert } from '../../redux/actions/alert'

const Signup = ({setAlert, register, isAuthenticated }) => {

    const history = useHistory();
    const [formData, setFormData] = useState({
      name:'',
      email:'',
      password:'',
      password2:'',
      phone:''
    }) //initial states
  
    //destructure
    const { name , email , password , password2 , phone} = formData;
  
  
    //handle chnage
    const onChange = e => {
      setFormData({...formData , [e.target.name]: e.target.value})
    }
  
  //onSubmit
  
  const onSubmit = e => {
    e.preventDefault();
  if(password !== password2){
    setAlert('password do not match', 'danger')
  } else{
    register({name, email, password , phone})
    history.push("/");
  }
  };
  
  
  //redirect
  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }
  
    return (
        <div className="container">
        <div className="mycard" >
        <div className="card auth-card" >
            <h2>facebook</h2>
            <form onSubmit={e => onSubmit(e)}>
        <input type="text" placeholder="name" 
              name='name'
              value={name}
              onChange={e => onChange(e)}
        />
        <input type="text" placeholder="email" 
               name='email'
               value={email}
               onChange={e => onChange(e)}
        />
        <input type="number" placeholder="phone" 
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
        />
        <input type="text" placeholder="password"   
         name='password'
         value={password}
         onChange={e => onChange(e)}
        />
        <input type="password" placeholder="password"  
         name='password2'
         value={password2}
        onChange={e => onChange(e)}
                  />
        <button className=" btn waves-effect waves-light">
            Sign Up
        </button>
        </form>
        <h5>
               <Link to="/signin" >Already have an account? sign in</Link>
           </h5>
    </div>
    </div>
    </div>
    )
}
const mapStateToProps = state => ({
  isAuthenticated : state.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Signup)
