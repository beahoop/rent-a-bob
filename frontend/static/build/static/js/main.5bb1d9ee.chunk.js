(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{31:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),i=n(25),r=n.n(i),o=(n(31),n(16)),c=n.n(o),l=n(18),d=n(5),h=n(6),u=n(3),j=n(8),b=n(7),p=n(9),g=n.n(p),m=n(13),O=n(2),f=n(23),v=n(14),x=n(0),y=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={isEditing:!1,note:a.props.notes,text:a.props.notes.text},a.handleInputEdit=a.handleInputEdit.bind(Object(u.a)(a)),a.handleEdit=a.handleEdit.bind(Object(u.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"handleSubmit",value:function(e){var t=this,n=this.state.note.id;e.preventDefault();var a={text:this.state.text,job:this.state.note.job};fetch("/api/v1/note/edit/".concat(n),{method:"PUT",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(a)}).then((function(e){if(!e.ok)throw new Error("Bad Post request");return e.json()})).then((function(e){t.props.addArticle(e),console.log("Success. Message created!",e)})).catch((function(e){return console.log("Error:",e)})).finally("I am always going to fire!"),this.setState({text:a.text})}},{key:"handleEdit",value:function(e){13===e.keyCode&&(this.handleSubmit(e),this.setState({isEditing:!1,text:this.state.text}))}},{key:"handleInputEdit",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this,t=this.state.note;return Object(x.jsxs)("li",{children:[t.image?Object(x.jsx)("img",{className:"pre-img",src:t.image,alt:"preview"}):null,this.state.isEditing?Object(x.jsx)("input",{type:"body",name:"text",value:this.state.text,onChange:this.handleInputEdit,onKeyUp:function(t){return e.handleEdit(t)}}):Object(x.jsxs)("p",{className:"jobs-note",name:"text",value:this.state.text,children:["Note: ",this.state.text]}),Object(x.jsxs)("span",{className:"jobs-createdDate",children:[" ",t.created_date]}),Object(x.jsxs)("p",{className:"jobs-owner",children:["by: ",t.owner]}),this.state.isEditing?null:Object(x.jsx)("button",{className:"btn btn-info",type:"button",onClick:function(){return e.setState({isEditing:!e.state.isEditing})},children:"Edit"})]},t.id)}}]),n}(a.Component),N=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={isAdding:!1,notes:[],text:"",image:null,job:[],preview:"",showNotes:!1},a.handleImage=a.handleImage.bind(Object(u.a)(a)),a.handleInput=a.handleInput.bind(Object(u.a)(a)),a.removeNote=a.removeNote.bind(Object(u.a)(a)),a.handleCreatingNote=a.handleCreatingNote.bind(Object(u.a)(a)),a.addNote=a.addNote.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/v1/edit/".concat(this.props.match.params.id)).then((function(e){return e.json()})).then((function(t){console.log("response",t),e.setState({job:t,notes:t.notes,image:t.image})}),(function(t){e.setState({error:t})}))}},{key:"handleImage",value:function(e){var t=this,n=e.target.files[0];this.setState({image:n});var a=new FileReader;a.onloadend=function(){t.setState({preview:a.result})},a.readAsDataURL(n)}},{key:"handleInput",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"removeNote",value:function(e){var t=e.id,n=Object(f.a)(this.state.notes),a=n.indexOf(e);n.splice(a,1),fetch("/api/v1/note/edit/".concat(t),{method:"DELETE",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")}}).then((function(e){if(!e.ok)throw new Error("Bad Post request")})).catch((function(e){return console.log("Error:",e)})).finally("I am always going to fire!"),this.setState({notes:n})}},{key:"addNote",value:function(e){var t=Object(f.a)(this.state.notes);console.log("NOTE",e),t.push(e),this.setState({notes:t})}},{key:"handleCreatingNote",value:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("text",this.state.text),n.append("job",this.state.job.id),n.append("image",this.state.image),fetch("/api/v1/note/",{method:"POST",headers:{"X-CSRFToken":g.a.get("csrftoken")},body:n}).then((function(e){if(!e.ok)throw new Error("Bad Post request");return e.json()})).then((function(e){t.addNote(e),console.log("Success. Message created!",e)})).catch((function(e){return console.log("Error:",e)})).finally("I am always going to fire!"),this.setState({text:""})}},{key:"render",value:function(){var e=this,t=this.state.job,n=this.state.notes.map((function(t,n){return Object(x.jsxs)("div",{children:[Object(x.jsx)(y,{notes:t,image:t.image},t.id),Object(x.jsx)("button",{className:"btn btn-danger",type:"btn",onClick:function(){return e.removeNote(t)},children:"Remove"})]})}));return Object(x.jsx)("li",{className:"job-item",children:Object(x.jsxs)("div",{className:"job-container",children:[Object(x.jsxs)("p",{className:"jobs-client",children:["Client: ",t.client]}),Object(x.jsxs)("p",{className:"jobs-hardware",children:["Hardware: ",t.hardware," "]}),Object(x.jsxs)("p",{className:"jobs-issue",children:[" Issue: ",t.issue]}),!this.state.image&&this.state.isAdding?Object(x.jsxs)("span",{children:[Object(x.jsxs)("label",{for:"file-upload",className:"custom-file-upload",children:[Object(x.jsx)("p",{className:"imagePlus",children:" + "}),Object(x.jsx)("p",{className:"imageText",children:" Add photo"})]})," ",Object(x.jsx)("input",{id:"file-upload",type:"file",name:"image",onChange:this.handleImage})]}):null,this.state.image&&Object(x.jsx)("img",{className:"pre-img",src:this.state.preview,alt:"preview"}),this.state.isAdding?Object(x.jsx)("div",{className:"note-addNote",children:Object(x.jsxs)("form",{className:"form",onSubmit:this.handleCreatingNote,children:[Object(x.jsx)("input",{type:"text",id:"note-text",name:"text",value:this.state.text,onChange:this.handleInput,placeholder:"Note",required:!0}),Object(x.jsx)("label",{htmlFor:"note-text"}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{className:"btn btn-info",type:"submit",children:"Add Note"})]})}):Object(x.jsx)("button",{className:"btn btn-info",type:"button",onClick:function(){return e.setState({isAdding:!e.state.isAdding})},children:"Add Note"}),this.state.showNotes?Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{className:"btn btn-info",onClick:function(){return e.setState({showNotes:!e.state.showNotes})},type:"button",children:"Hide Notes"}),Object(x.jsx)("ul",{children:n})]}):Object(x.jsx)("button",{className:"btn btn-info",onClick:function(){return e.setState({showNotes:!e.state.showNotes})},type:"button",children:"Show Notes"})]})},t.id)}}]),n}(a.Component),w=Object(O.f)(N),k=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={clients:[]},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/v1/clients").then((function(e){return e.json()})).then((function(t){console.log("response",t),e.setState({clients:t})}),(function(t){e.setState({error:t})}))}},{key:"render",value:function(){var e=this.state.clients.map((function(e){return Object(x.jsx)("div",{className:"listImg",children:Object(x.jsx)("a",{href:"/client/".concat(e.id),children:Object(x.jsxs)("p",{children:[e.last_name,", ",e.first_name,", ",e.location]})})},e.id)}));return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h2",{children:" Clients"}),Object(x.jsx)("div",{children:e})]})}}]),n}(a.Component),S=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(x.jsx)(x.Fragment,{children:"I'm the dang home page."})}}]),n}(a.Component),I=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={jobs:[]},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/v1/").then((function(e){return e.json()})).then((function(t){console.log("response",t),e.setState({jobs:t})}),(function(t){e.setState({error:t})}))}},{key:"render",value:function(){var e=this.state.jobs.filter((function(e){return"New"===e.job_status?e:console.log("nope")})).map((function(e){return Object(x.jsx)("div",{className:"listImg",children:Object(x.jsx)("a",{href:"/job/".concat(e.id),children:Object(x.jsxs)("p",{children:[e.client,e.hardware,e.issue]})})},e.id)})),t=this.state.jobs.filter((function(e){return"Open"===e.job_status?e:console.log("nope")})).map((function(e){return Object(x.jsx)("div",{className:"listImg",children:Object(x.jsx)("a",{href:"/job/".concat(e.id),children:Object(x.jsxs)("p",{children:[e.client,e.hardware,e.issue]})})},e.id)}));return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h2",{children:" New Jobs"}),Object(x.jsx)("div",{children:e}),Object(x.jsx)("h2",{children:" Open Jobs"}),Object(x.jsx)("div",{children:t})]})}}]),n}(a.Component);var C=function(e){var t=e.isLoggedIn;return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("div",{className:"navbar sticky-top navbar-light bg-light",children:[Object(x.jsx)("span",{className:"navbar-1 navbar-brand",children:Object(x.jsx)(m.b,{to:"/home/",children:"Home"})}),t?null:Object(x.jsxs)("span",{children:[Object(x.jsx)("span",{className:"navbar-1 navbar-brand",children:Object(x.jsx)(m.b,{to:"/login/",children:"Login"})}),Object(x.jsxs)("span",{className:"navbar-1 navbar-brand",children:[Object(x.jsx)(m.b,{to:"/register/",children:"Register"})," "]})]}),t?Object(x.jsxs)("span",{className:"navbar-brand",children:[Object(x.jsx)("span",{className:"navbar-1 navbar-brand",children:Object(x.jsx)(m.b,{to:"/dashboard/",children:"Dashboard"})}),Object(x.jsx)("span",{className:"navbar-1 navbar-brand",children:Object(x.jsx)(m.b,{to:"/clients/",children:"Clients"})}),Object(x.jsx)("span",{className:"navbar-1 navbar-brand",children:Object(x.jsx)(m.b,{to:"/jobs/",children:"Jobs"})}),Object(x.jsx)("span",{className:"navbar-1 navbar-brand",onClick:function(t){return e.handleLogOut(t)},type:"submit",children:"LogOut"})]}):null]})})},L=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={username:"",email:"",password1:"",password2:""},a.handleInput=a.handleInput.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("form",{className:"regform",onSubmit:function(t){return e.props.handleRegistration(t,e.state)},children:[Object(x.jsx)("input",{className:"reginput",type:"text",name:"username",value:this.state.username,placeholder:"username",onChange:this.handleInput,required:!0}),Object(x.jsx)("input",{className:"reginput",type:"email",name:"email",value:this.state.email,placeholder:"email",onChange:this.handleInput,required:!0}),Object(x.jsx)("input",{className:"reginput",type:"password",name:"password1",value:this.state.password1,placeholder:"password",onChange:this.handleInput,required:!0}),Object(x.jsx)("input",{className:"reginput",type:"password",name:"password2",value:this.state.password2,placeholder:"confirm password",onChange:this.handleInput,required:!0}),Object(x.jsx)("button",{className:"btn",type:"submit",children:"Register"})]})})}}]),n}(a.Component),E=(n(39),function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={username:"",email:"",password:""},a.handleInput=a.handleInput.bind(Object(u.a)(a)),a.handleLogin=a.handleLogin.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"handleInput",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"handleLogin",value:function(e,t){this.props.handleLogin(e,this.state),this.props.history.push("/jobs")}},{key:"render",value:function(){var e,t,n=this;return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)("form",{className:"loginform",onSubmit:function(e){return n.handleLogin(e,n.state)},children:[Object(x.jsx)("input",{type:"text",name:"username",value:null===(e=this.state)||void 0===e?void 0:e.username,placeholder:"username",onChange:this.handleInput,required:!0}),Object(x.jsx)("br",{}),Object(x.jsx)("input",{type:"password",name:"password",value:null===(t=this.state)||void 0===t?void 0:t.password,placeholder:"password",onChange:this.handleInput,required:!0}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{className:"btn",type:"submit",children:"Login"})]})})}}]),n}(a.Component)),T=Object(O.f)(E),F=(n(40),function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={jobs:[],isLoggedIn:!!g.a.get("Authorization")},a.handleLogin=a.handleLogin.bind(Object(u.a)(a)),a.handleLogOut=a.handleLogOut.bind(Object(u.a)(a)),a.handleRegistration=a.handleRegistration.bind(Object(u.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/v1/").then((function(e){return e.json()})).then((function(t){console.log("response",t),e.setState({jobs:t})}),(function(t){e.setState({error:t})}))}},{key:"handleLogin",value:function(){var e=Object(l.a)(c.a.mark((function e(t,n){var a,s,i,r,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},s=function(e){return console.warn(e)},e.next=5,fetch("/rest-auth/login/",a);case 5:return i=e.sent,e.next=8,i.json().catch(s);case 8:r=e.sent,console.log("data",r),r.key&&(g.a.set("Authorization","Token ".concat(r.key)),o={username:r.username},localStorage.setItem("user",JSON.stringify(o)),this.setState({isLoggedIn:!0}));case 11:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"handleLogOut",value:function(){var e=Object(l.a)(c.a.mark((function e(t){var n,a,s,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(this.state.isLoggedIn),t.preventDefault(),alert("logging out"),n={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")}},a=function(e){return console.warn(e)},e.next=7,fetch("/rest-auth/logout/",n);case 7:return s=e.sent,e.next=10,s.json().catch(a);case 10:i=e.sent,console.log(i),g.a.remove("Authorization"),this.setState({isLoggedIn:!1}),localStorage.removeItem("user");case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleRegistration",value:function(){var e=Object(l.a)(c.a.mark((function e(t,n){var a,s,i,r,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":g.a.get("csrftoken")},body:JSON.stringify(n)},s=function(e){return console.warn(e)},e.next=5,fetch("/rest-auth/registration/",a);case 5:return i=e.sent,e.next=8,i.json().catch(s);case 8:r=e.sent,console.log(r),r.key&&(g.a.set("Authorization","Token ".concat(r.key)),o={username:r.username},localStorage.setItem("user",JSON.stringify(o)),this.setState({isLoggedIn:!0}));case 11:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(x.jsx)("div",{className:"container",children:Object(x.jsx)("div",{className:"row flex-nowrap",children:Object(x.jsx)("div",{className:"nav-bar",children:Object(x.jsxs)(m.a,{children:[Object(x.jsx)(C,{handleLogOut:this.handleLogOut,isLoggedIn:this.state.isLoggedIn}),Object(x.jsx)(O.c,{children:Object(x.jsx)("div",{className:"row flex-nowrap",children:Object(x.jsxs)("div",{className:"col-6 col-md",children:[Object(x.jsx)(O.a,{path:"/login",children:Object(x.jsx)(T,{isLoggedIn:this.state.isLoggedIn,handleLogin:this.handleLogin})}),Object(x.jsx)(O.a,{path:"/dashboard",children:Object(x.jsx)(I,{jobs:this.state.jobs})}),Object(x.jsx)(O.a,{path:"/register",children:Object(x.jsx)(L,{isLoggedIn:this.state.isLoggedIn,handleRegistration:this.handleRegistration})}),Object(x.jsx)(O.a,{exact:!0,path:"/job/:id",children:Object(x.jsx)(w,{jobs:this.state.jobs})}),Object(x.jsx)(O.a,{exact:!0,path:"/clients",children:Object(x.jsx)(k,{})}),Object(x.jsx)(O.a,{exact:!0,path:"/home/",children:Object(x.jsx)(S,{})})]})})})]})})})})}}]),n}(a.Component)),R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),s(e),i(e),r(e)}))};r.a.render(Object(x.jsx)(s.a.StrictMode,{children:Object(x.jsx)(F,{})}),document.getElementById("root")),R()}},[[41,1,2]]]);
//# sourceMappingURL=main.5bb1d9ee.chunk.js.map