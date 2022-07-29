import * as request from "../util/requester";

const baseUrl = 'http://localhost:3030/data/games';

export const getAll = () => request.get(baseUrl);

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameData, gameId) => request.put(`${baseUrl}/${gameId}`, gameData);

export const deleteGame = (gameId) => request.del(`${baseUrl}/${gameId}`);
