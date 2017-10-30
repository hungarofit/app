
import config from './../../config';

export default {
  methods: {
    '$appUrl'(url) {
      if(typeof url !== 'string') {
        throw 'Invalid URL: ' + url;
      }
      if(url.match(/^https?:\/\//i)) {
        return url;
      }
      if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:' + config.dev.port + '/' + url.replace(/^\//, '');
      }
      return url;
    },
    '$apiUrl'(url) {
      if(typeof url !== 'string') {
        throw 'Invalid URL: ' + url;
      }
      if(url.match(/^https?:\/\//i)) {
        return url;
      }
      return 'https://api.hungarofit.hu/' + url.replace(/^\//, '');
      if(process.env.NODE_ENV !== 'production') {
        return 'http://localhost:8080/' + url.replace(/^\//, '');
      }
    },
  }
}
