import React, { Fragment,useRef,useEffect,useState } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import '../../App.css'
import M from 'materialize-css'
import { API } from '../../config'

const Navbar = ({auth: {isAuthenticated, loading,user }, logout}) => {

  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])


  useEffect(() => {
    M.Modal.init(searchModal.current)
  },[])
  
    
  const authLinks =(
        <ul>
           <li key="1" ><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
              <li><Link to="/uploadpost">Upload post
             </Link></li>
             <li><Link to="/posts">Posts
             </Link></li>
             <li><Link to="/dashboard">
             <i className="fas fa-user"></i>{' '} 
             <span className="hide-sm">Profile</span>  </Link></li>
           
             <li><Link to="/profiles">
             <i className="fas fa-users"></i>{' '} 
             <span className="hide-sm">People</span>  </Link></li>
          <li><a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout </span>
            
            </a></li>
        
        </ul>
  );

  const guestLinks = (
       <ul>
            <li><Link to="/posts">Posts
             </Link></li>
          <li><Link to="/signup">Register</Link></li>
          <li><Link to="/signin">Login</Link></li>
        </ul>
  )
  

  
//fetch search users

const fetchUsers = (query)=>{
  setSearch(query)
  fetch(`${API}/profile/searchusers`,{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      query
    })
  }).then(res=>res.json())
  .then(results=>{
    console.log(results)
    setUserDetails(results.user)
  })
}
  
  
  return (
    <nav class="nav bg-primary">
    <ul>
        <li><Link to="/">Social Media</Link>  </li> 
        </ul>
       {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}

       <div id="modal1" class="modal" ref={searchModal} style={{color:"black",width:"400px"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
      
             {userDetails.map(item=>{
                 return <Link  to={item._id !== user._id ? "/profile/"+item._id:'/dashboard'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.name}</li></Link> 
               })}
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat"  onClick={()=>setSearch('')}>close</button>
          </div>
          </div>
  </nav>
    )
}

const mapStateToProps = state => ({
   auth : state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)