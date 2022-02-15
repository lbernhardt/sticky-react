import {React} from 'react'
import Config from '../config.json'
import { Redirect } from 'react-router';

export const loginUser = (credentials) => {
    
    console.log(credentials);

    return fetch(Config.apiLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => {
        if(data){
            //console.log(data.json());
            //store user details and jwt token in local storage to keep user logged in between page refreshes
            return data.json();
        }      
    })
    .catch(data => console.log(data))
};

export const getCurrentUser = () => {
    return localStorage.getItem('currentUser');
}

export const getToken = () => {
    return localStorage.getItem('userToken');
}

export const logout = () =>  {
    localStorage.clear()
    window.location.href = '/';
}

