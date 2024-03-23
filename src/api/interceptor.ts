import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

export const http = axios.create();

export const globalConfig: RetryConfig = {
  retry: 1,
  retryDelay: 1000,
};

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';
  // config.baseURL = 'https://dev-partners-api.non-prod.crib.in'
  switch (environment) {
    case 'production':
      config.baseURL =
      'https://ingrow-backend.onrender.com/'
        // 'https://ingrow-backend-production.up.railway.app/';
      break;
    case 'development':
      config.baseURL = 'https://ingrow-backend.onrender.com/';
      // config.baseURL = 'https://ingrow-backend-development.up.railway.app/';
      break;
    case 'local':
      config.baseURL = 'https://ingrow-backend.onrender.com/';
      break;
    default:
      // config.baseURL = 'https://ingrow-backend-production.up.railway.app/';
      config.baseURL = 'https://ingrow-backend.onrender.com/';
      break;
  }

  const token = getCookie('token');
  console.log('token', token);
  const cookies = getCookie('cookies');
  console.log('cookies', cookies);
  const csrfToken = getCookie('csrfToken');
  console.log('csrfToken', csrfToken);

  if (token) config.headers.Authorization = 'Bearer ' + token;

  if (cookies) config.headers['x-auth-token'] = cookies;

  if (csrfToken) config.headers['x-csrf-token'] = csrfToken;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError | any) => {
    console.log('error', error);
    if (error?.response?.status === 401) {
      deleteCookie('token');
      window.location.href = window.location.origin;
      return;
    }
    if (error?.response.status === 403) {
      const { config } = error;
      console.log('config', config)
      const data = JSON.parse(config.data);
      console.log('data', data)
      if (!data || !data.retry) {
        toast.error('Please Relogin your linkedin', { duration: 1500 });
        console.log("delete cookies")
        deleteCookie('cookies');
        deleteCookie('csrfToken');
        // window.location.href = '/relogin';
        return;
      }

      data.retry -= 1;

      const delayRetryRequest = new Promise<void>((resolve) => {
        setTimeout(() => {
          window.postMessage({ action: 'SEND_COOKIES' }, '*');

          window.addEventListener('message', (event) => {
            if (event.data.action === 'RECEIVE_COOKIES' && event.data.cookies) {
              const csrfToken: string = event.data.cookies.data.csrfToken;
              setCookie('cookies', event.data.cookies.data.cookie);
              setCookie('csrfToken', csrfToken.replaceAll('"', ''));
            }
          });

          resolve();
        }, data.retryDelay || 1000);
      });
      config.data = JSON.stringify(data);
      return delayRetryRequest.then(() => http(config));
    }
    if (error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    else toast.error('Some unknown error has occured');
  }
);
