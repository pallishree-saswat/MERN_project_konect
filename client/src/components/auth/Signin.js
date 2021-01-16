import React,{useState} from 'react'
import { Link,useHistory,Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'
import './auth.css'

const Signin = ({login,isAuthenticated}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
      email:'',
     password:''
  }) // initial state 
  
  //destructure 
  
  const { email, password } = formData;
  
  
  const onChange = e => {
     setFormData({...formData, [e.target.name]:e.target.value})
  }
  
  const onSubmit = e => {
     e.preventDefault();
   login(email,password)
   history.push('/')
  }
  
  
  //Redirect if logged in
  if(isAuthenticated){
  return <Redirect to='/dashboard' />
  
  }
    return (
        <div className="container">
        <div className="mycard" >
        <div className="card auth-card" >
            <h2>Facebook</h2>
            <form onSubmit={e => onSubmit(e)}>
  
        <input type="text" placeholder="email" 
           name='email'
           value={email}
           onChange={e => onChange(e)}
        />
      
        <input type="password" placeholder="password"  name='password'
         value={password}
         onChange={e => onChange(e)}    />
    
        <button className=" btn waves-effect waves-light">
            Sign In
        </button>
        </form>
         <h5>
         <Link to="/signup" >Dont  have  an account? Signup</Link>
        </h5>
           <Link to="/forgotPassword" >forgot password</Link>
    </div>
    </div>
    </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.isAuthenticated
  })
  
  export default connect(mapStateToProps,{ login}) (Signin)
