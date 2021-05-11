import Cookieservice from "../cokieservice/Cookieservice.js"

class Auth {
    isAuthenticated() {
      if(Cookieservice.get('token') ===undefined){
        return false;
      }
      else{
        return true;
      }
      
    }
  }
  
  export default new Auth();