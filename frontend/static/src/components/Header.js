import { NavLink } from 'react-router-dom';


function Header(props) {
  const isAuth = props.isLoggedIn;

  return (
    <>
    <div className="navbar main-nav">
      {!isAuth
      ?
      <span>
      <span className="navbar-1 navbar-brand">< NavLink to="/login/">Login</NavLink></span>
      <span className="navbar-1 navbar-brand"><NavLink to="/register/">Register</NavLink> </span>
      </span>
      :
      null}


      {isAuth
      ?
      <span className="navbar-brand">
        <span  className="navbar-1 navbar-brand" onClick={(e) => props.handleLogOut(e)} type="submit">LogOut</span>
          </span>
        :
        null
      }
    </div>



    </>
  )
}


export default Header
