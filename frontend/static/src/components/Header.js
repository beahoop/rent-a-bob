import { NavLink } from 'react-router-dom';
function Header(props) {
  const isAuth = props.isLoggedIn;
//only render if on backend
//make footer and another nav that is sticky for back end
  return (
    <>
    {!isAuth
    ?
    <div className="row px-0">
      <div className="navbar-light bg-light fixed-bottom">

        <span>
        <span className="navbar-1 ">< NavLink to="/">Home</NavLink></span>
          <span className="navbar-1 ">< NavLink to="/login/">Login</NavLink></span>
          <span className="navbar-1"><NavLink to="/register/">Register</NavLink> </span>
        </span>
        </div>
      </div>
        :
        null}

      <div className="row px-0">
        <div className="navbar-light backend-nav bg-light ">
        {isAuth
        ?
          <span>
            <span className="navbar-2 navbar-brand">< NavLink to="/">Rent-a-Bob</NavLink></span>
            <span className="navbar-1 navbar-brand ">< NavLink to="/dashboard/">Dashboard</NavLink></span>
            <span className="navbar-1 navbar-brand ">< NavLink to="/clients/">Clients</NavLink></span>
            <span className="navbar-1 navbar-brand">< NavLink to="/createjob/">+</NavLink></span>
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
