import { searchUsersURL, getUserURL } from './utils/URLs.js'
import * as logger from '../utils/logger.js';

export const searchUsers = async (search) => {
    const query = "?q=" + encodeURIComponent(`${search} in:user`) + "&per_page=5";

    try {
        const response = await fetch(searchUsersURL.href + query, {
            method: 'GET',
            headers: {
            'Accept': 'application/vnd.github+json, application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'NEWHELL69',
            }
        });

        if(!response.ok){
            throw new Error(`Error fetching users, response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch(err) {
        logger.error(err);
        
        return {};
    }
}

export const getUser = async (username) => {
    try {
        const response = await fetch(getUserURL(username).href, {
            method: 'GET',
            headers: {
            'Accept': 'application/vnd.github+json, application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'NEWHELL69',
            }
        });

        if(!response.ok){
            throw new Error(`Error fetching user data, response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch(err) {
        logger.error(err);
        
        return {};
    }
}

// searchUsers("newhell").then(res => console.log(res));