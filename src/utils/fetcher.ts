/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'http://45.64.99.242:9116',
  headers: {
    'Content-Type': 'application/json',
  },
});

type Methods = 'GET' | 'POST' | 'DELETE' | 'UPDATE';

interface ICallProps {
  method: Methods;
  uri: string;
  payload?: any;
  params?: any;
  isFormData?: boolean;
}

const callAPI = async ({
  method,
  payload,
  uri,
  params,
  isFormData = false,
}: ICallProps) => {
  try {
    if (isFormData) {
      apiClient.defaults.headers['Content-Type'] = 'multipart/form-data';
      const formData = new FormData();

      if (payload && typeof payload === 'object') {
        Object.entries(payload).forEach(([key, value]) => {
          if (typeof value === 'string' || value instanceof Blob) {
            formData.append(key, value);
          } else {
            console.warn(`Value for ${key} is not a valid type, skipping.`);
          }
        });
      }
      payload = formData;
    } else {
      apiClient.defaults.headers['Content-Type'] = 'application/json';
    }

    let response;
    switch (method) {
      case 'GET':
        response = await apiClient.get(uri, { params });
        break;
      case 'POST':
        response = await apiClient.post(uri, payload);
        break;
      case 'DELETE':
        response = await apiClient.delete(uri, { params });
        break;
      case 'UPDATE':
        response = await apiClient.put(uri, payload);
        break;
      default:
        throw new Error('Method not supported');
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default callAPI;
