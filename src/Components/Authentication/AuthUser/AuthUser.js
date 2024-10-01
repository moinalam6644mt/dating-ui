import axios from "axios";
const AuthUser = () => {
  const baseURL = 'http://localhost/eroflirts-credit/webapp';

  const locallanguage = localStorage.getItem('lang') || 'english';

  console.log(locallanguage)

  const SaveToken = (UserData) => {
    localStorage.setItem("user", JSON.stringify(UserData));
  };

  const getToken = (tokenKey) => {
    return JSON.parse(localStorage.getItem(tokenKey));
  };

  const isLogin = () => {
    const userData = getToken("user");
    return userData !== null;
  };

  const Logout = () => {
    localStorage.clear();
  };

  const buildUrlWithLang = (api) => {
    return `${baseURL}${api}${api.includes('?') ? '&' : '?'}lang=${locallanguage}`;
  };

  const GetMemberId = () => {
    const token = getToken('user');
    if (token) {
      const [, part2] = token.split(':');
      return part2 ? part2.slice(1, -1) : null; // Ensure part2 exists
    }
    return null; // Return null if token is invalid
  };

  const CallApi = async (apiData) => {
    const { api, method, data } = apiData;
    const user = getToken('user');

    const defaultHeaders = {};
    if (user) {
      defaultHeaders["Authorization"] = `Bearer ${user}`;
    }

    try {
      let response;

      switch (method) {
        case "GET":
          response = await axios.get(buildUrlWithLang(api), {
            headers: defaultHeaders,
            params: data,
          });
          break;

        case "POST":
          response = await axios.post(buildUrlWithLang(api), data, {
            headers: defaultHeaders,
          });
          break;

        case "UPLOAD":
          const imageDataToSend = new FormData();
          Object.keys(data).forEach(key => {
            imageDataToSend.append(key, data[key]);
          });
          response = await axios.post(buildUrlWithLang(api), imageDataToSend, {
            headers: defaultHeaders,
          });
          break;

        case "DELETE":
          response = await axios.delete(buildUrlWithLang(api), {
            headers: defaultHeaders,
          });
          break;

        default:
          throw new Error("Unsupported HTTP method");
      }

      return response.data;
    } catch (error) {
      console.error("API Call Error: ", error.response ? error.response.data : error.message);
      throw error; 
    }
  };

  return {
    SaveToken,
    getToken,
    isLogin,
    Logout,
    CallApi,
    GetMemberId,
  };
};

export default AuthUser;
