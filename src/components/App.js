import Signup from "./authentication/signup";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import PrivateRoute from "./authentication/protectedroute";
import AuthProvider from "../contexts/auth";
import Profile from "./Profile";
import Login from "./authentication/login";
import Forgetpassword from "./authentication/resetpassword";
import Updateprofile from "./authentication/Updateprofile";
import Dashboard from "./googledrive/Dashboard";

function App() {
  return ( <div> 
    
          <BrowserRouter>
          <AuthProvider>
            <Routes>

              <Route element={<PrivateRoute/>}>
                <Route exact path='/' element={<Dashboard/>}></Route>
                <Route exact path='/folder/:folderId' element={<Dashboard/>}></Route>
              </Route>

              <Route  element={<PrivateRoute/>}>
                <Route exact path='/user' element={<Profile/>}/>
                <Route path='/update-profile' element={<Updateprofile/>}></Route>
                </Route> 
                           
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/forgot-password' element={<Forgetpassword/>}></Route>
            </Routes>
          </AuthProvider>
          </BrowserRouter>
     
     
    
     
    </div>

  );
}

export default App;
