import { NavLink } from 'react-router-dom';
function HeaderLogin(props) {
  const isAuth = props.isLoggedIn;
//only render if on backend
//make footer and another nav that is sticky for back end
return (
   <>
   {!isAuth
   ?
       <span>
         <span className="contact-title "> < NavLink to="/login/"><i class="fas fa-anchor"></i></NavLink></span>
       </span>

       :
       null}
   </>
 )
}



export default HeaderLogin
