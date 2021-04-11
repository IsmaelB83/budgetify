// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
import Partida from '../models/Partida';
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/partida`;

/**
* Objeto API
*/
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    
    /**
    * Obtener todas las partidas presupuestarias
    */
    getPartidas: () => {
        // Endpoint
        let baseURL = `${API_URL}`;
        // Call endpoint and return
        return Axios.get(baseURL)
        .then(res => {
            return {
                end: res.data.end,
                start: res.data.start,
                totalCount: res.data.totalCount,
                partidas:  res.data.results.map(partida => new Partida(partida))
            }
        });
    },
    
    /**
    * Obtener partida por su id de tagetik
    */
     getPartida: (tagetik) => {
        // Endpoint
        let baseURL = `${API_URL}/${tagetik}`;
        // Call endpoint and return
        return Axios.get(baseURL)
        .then(res => new Partida(res.data.result));
    },
    
    /**
    * Llama a la API para crear un nuevo anuncio
    * @param {Partida} partida 
    */
    postPartida: (partida, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}`;
        // Form Data
        const formData = new FormData();
        formData.append('name', partida.name);
        formData.append('description', partida.description);
        formData.append('price', partida.price);
        formData.append('type', partida.type);
        formData.append('tags', partida.tags);
        formData.append('photoFile', partida.file);
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.post(baseURL, formData, config)
        .then(res => new Partida(res.data.result));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Partida} partida 
    */
    editPartida: (partida, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/${partida.tagetik}`;
        // Form Data
        const formData = new FormData();
        formData.append('name', partida.name);
        formData.append('description', partida.description);
        formData.append('price', partida.price);
        formData.append('type', partida.type);
        formData.append('tags', partida.tags);
        formData.append('booked', partida.booked);
        formData.append('sold', partida.sold);
        formData.append('photoFile', partida.file);
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.put(baseURL, formData, config)
        .then(res => new Partida(res.data.result));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Partida} partida 
    */
    deletePartida: (tageit, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/${tageit}`;
        // Call endpoint and return
        return Axios.delete(
            baseURL, 
            { headers: { 'Authorization': `Bearer ${jwt}`} }
            )
            .then(res => res.data.result);
        }
    }