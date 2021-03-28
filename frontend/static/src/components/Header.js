import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router-dom";

function Header(props) {
  const isAuth = props.isLoggedIn;
  const isAdmin = (JSON.parse(localStorage.getItem('user'))?.username === "bob");

   function handleLogOUT(e) {
     console.log("Hey there");
     props.handleLogOut(e);
     props.history.push("/")
 }

//only render if on backend
//make footer and another nav that is sticky for back end
return (
   <>


     <div className="row px-0">
       <div className="navbar-light flex-nowrap backend-nav bg-light ">
       {isAuth
       ?
         <span>
           <span className="navbar-2 navbar-brand">< NavLink to="/">Rent-a-Bob</NavLink></span>
           <span className="navbar-1 navbar-brand ">< NavLink to="/dashboard/">Dashboard</NavLink></span>
           <span className="navbar-1 navbar-brand ">< NavLink to="/clients/">Clients</NavLink></span>
          <span className="navbar-1 navbar-brand ">< NavLink to="/appointments/">Appointments</NavLink></span>
           <span className="navbar-1 navbar-brand">< NavLink to="/createjob/">+</NavLink></span>
           <span className="navbar-1 navbar-brand" onClick={(e) => handleLogOUT(e)}>Logout</span>
         </span>

         :
         null
       }
       {isAdmin && isAuth
         ?
         <span className="navbar-1 navbar-brand"><NavLink to="/register/">Register</NavLink> </span>
         :
         null
       }
     </div>
   </div>
   </>
 )
}


export default withRouter(Header);
