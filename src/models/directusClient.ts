import Axios from 'axios';
import useGeneralStore from '@store/GeneralStore';
import { Connections } from './general';

// Interceptor para agregar el token de autenticación a cada petición
export const axiosInterceptor = (token: string) => {
  Axios.interceptors.request.use(function (config) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
};

// Función para crear un cliente Directus con Axios
const getDirectusAxios = (type: 'source' | 'destination') => {
  const { conections } = useGeneralStore.getState();
  const url = conections?.[type]?.url;
  const token = conections?.[type]?.token;
  if (!url || !token) return null;
  axiosInterceptor(token);
  return { url, token };
};

// Ejemplo de función para hacer ping al servidor Directus
export const pingDirectus = async (type: 'source' | 'destination'): Promise<any | null> => {
  const client = getDirectusAxios(type);
  if (!client) return null;
  try {
    const response = await Axios.get(`${client.url}/server/ping`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Ejemplo de función para obtener items de una colección
export const getItems = async (
  type: 'source' | 'destination',
  collection: string,
  params: Record<string, any> = {}
): Promise<any | null> => {
  const client = getDirectusAxios(type);
  if (!client) return null;
  try {
    const response = await Axios.get(`${client.url}/items/${collection}`, { params });
    return response.data;
  } catch (error) {
    return null;
  }
};

// Ejemplo de función para crear un item en una colección
export const createItem = async (
  type: 'source' | 'destination',
  collection: string,
  data: Record<string, any>
): Promise<any | null> => {
  const client = getDirectusAxios(type);
  if (!client) return null;
  try {
    const response = await Axios.post(`${client.url}/items/${collection}`, data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// Puedes agregar más funciones según lo que necesites hacer con Directus

export default {
  pingDirectus,
  getItems,
  createItem,
};