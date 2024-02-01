import Cookies from "universal-cookie";
const cookies = new Cookies();
class CookieService {
  //GET
  get(name) {
    return cookies.get(name);
  }
  //SET
  set(name, value, options) {
    return cookies.set(name, value, options);
  }
  //Remove
  remove(name) {
    return cookies.remove(name);
  }
}

export default new CookieService();
