import { NavLink } from 'react-router-dom';
function Header(props) {
  const isAuth = props.isLoggedIn;

  return (
    <>
    <div className="row px-0">
      <div className="navbar-light bg-light fixed-top">
      <span className="navbar-1 navbar-brand">< NavLink to="/home/">Home</NavLink></span>
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
          <span>
            <span className="navbar-1 navbar-brand">< NavLink to="/dashboard/">Dashboard</NavLink></span>
            <span className="navbar-1 navbar-brand">< NavLink to="/clients/">Clients</NavLink></span>
            <span className="navbar-1 navbar-brand">< NavLink to="/jobs/">Jobs</NavLink></span>
            <span  className="navbar-1 navbar-brand" onClick={(e) => props.handleLogOut(e)} type="submit">LogOut</span>
          </span>
          :
          null
        }
      </div>
    </div>
    </>
  )
}


export default Header
