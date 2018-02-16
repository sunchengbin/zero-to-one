/**
 * Created by sunchengbin on 2017/8/1.
 */
import Axios from 'axios'
import Qs from 'qs'
export default {
  axios (url) {
    /* axios 配置 */
    Axios.defaults.timeout = 30000
    Axios.defaults.baseURL = url
    // switch (env) {
    //   case 'development':
    //     Axios.defaults.baseURL = 'http://10.1.120.107'
    //     break
    //   case 'testenvironment':
    //     Axios.defaults.baseURL = 'http://10.1.120.107'
    //     break
    //   case 'preview':
    //     Axios.defaults.baseURL = 'https://sealsapipre.fangxin.com'
    //     break
    //   default:
    //     Axios.defaults.baseURL = 'https://sealsapi.fangxin.com'
    //     break
    // }
    Axios.defaults.transformRequest = [function (data) {
      data = Qs.stringify(data)
      return data
    }]
    // Axios.defaults.headers['x-http-method-override'] = type
    return Axios
  }
}
