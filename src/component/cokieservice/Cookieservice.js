import Cookies from "universal-cookie";

const cookies = new Cookies();

class Cookieservice {

  get(key) {
    return cookies.get(key);
  }
      
  set(key,value) {
    cookies.set(key, value, { path: '/' });
  }

  remove(key) {
    cookies.remove(key);
  }
}

export default new Cookieservice();
