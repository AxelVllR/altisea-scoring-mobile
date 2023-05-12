import axios from "axios";
import { BASE_URL } from "../config";
import { ERRORS } from "./utils/errors.enum";

const axios_api = axios.create({
    baseURL: BASE_URL,
});

async function apiLogin(user) {

    return axios_api.post(`/login_check`, {
        username: user.email,
        password: user.password
    }, {
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',    
        }
    })
}

function getProfile(token) {
    return axios_api.get(`${BASE_URL}/profile`, {
        headers: {
            //'Content-Type': 'application/json',  
            //'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

function addReps(token, nbOfReps) {
    return axios_api.post(`${BASE_URL}/reps/add/${nbOfReps}`, {}, {
        headers: {
            //'Content-Type': 'application/json',  
            //'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

function getActiveCompetition(token) {
    return axios_api.get(`${BASE_URL}/competition`, {
        headers: {
            //'Content-Type': 'application/json',  
            //'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}


export {
    getActiveCompetition,
    apiLogin,
    getProfile,
    addReps
}