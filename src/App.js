import Sidebar from "./component/sidebar/Sidebar.js"
import Login from "./Pages/login/Login.js"
import Singup from "./Pages/singup/Singup.js"
import Default from "./Pages/defautHome/Defaulthome.js"

import { Route, Switch,BrowserRouter} from 'react-router-dom';
import { ProtectedRoute } from "./component/protectedroute/ProtectedRoute.js";


function App() {
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={Singup} />
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/homapage/' component={Sidebar} />
        <Route exact path='/' component={Default} />
      </Switch>
    </BrowserRouter>
    );
  
    
}

export default App;
