import * as request from "../util/requester";

const baseUrl = 'http://localhost:3030'

export const login = (email, password) =>
    request.post(`${baseUrl}/users/login`, { email, password });


export const register = (email, password) =>
    request.post(`${baseUrl}/users/register`, { email, password });
