import { NavLink } from 'react-router-dom';
function Header2(props) {
  const isAuth = props.isLoggedIn;
  const isAdmin = JSON.parse(localStorage.getItem('user')) === "bob";
//only render if on backend
//make footer and another nav that is sticky for back end
  return (
    <>

        {isAuth
        ?
          <span>
            <span className="navbar-2 navbar-brand">< NavLink to="/">Rent-a-Bob</NavLink></span>
            <span className="navbar-1 navbar-brand ">< NavLink to="/dashboard/">Dashboard</NavLink></span>
            <span className="navbar-1 navbar-brand ">< NavLink to="/clients/">Appointments</NavLink></span>
            <span className="navbar-1 navbar-brand ">< NavLink to="/clients/">Clients</NavLink></span>
            <span className="navbar-1 navbar-brand">< NavLink to="/createjob/">+</NavLink></span>
            <span  className="navbar-1 navbar-brand" onClick={(e) => props.handleLogOut(e)} type="submit">LogOut</span>
          </span>

          :
          null
        }
        {isAdmin
          ?
          <span className="navbar-1 navbar-brand "><NavLink to="/register/">+ Employee</NavLink> </span>
          :
      null
        }

    </>
  )
}


export default Header2
