import * as request from "../util/requester";

const baseUrl = 'http://localhost:3030/users'

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });


export const register = (email, password) =>
    request.post(`${baseUrl}/register`, { email, password });


export const logout = async (accessToken) => {
    try {
        const res = await fetch(`${baseUrl}/logout`, {
            method: 'GET',
            headers: {
                'X-authorization' : accessToken
            }
        });

        return res;
    } catch (error){
        console.log(error);
    }
};
