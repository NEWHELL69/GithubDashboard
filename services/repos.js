import { getUserReposURL, searchReposURL } from './utils/URLs.js'
import { extractPageCountFromLinkHeader } from './utils/helpers.js'
import * as logger from '../utils/logger.js';

export const getUserRepos = async (username, { perPage = 10, page = 1 } = {}) => {
    const query = `?per_page=${perPage}&page=${page}`;

    try {
        const response = await fetch(getUserReposURL(username).href + query, {
            method: 'GET',
            headers: {
            'Accept': 'application/vnd.github+json, application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'NEWHELL69',
            }
        });

        if(!response.ok){
            throw new Error(`Error fetching user repos, response status: ${response.status}`);
        }

        const currentPage = await response.json();

        const pageCount = extractPageCountFromLinkHeader(response.headers.get('Link'));

        const page = {
            count: pageCount, 
            current: currentPage
        }

        return page;
    } catch(err) {
        logger.error(err);
        
        return {};
    }
}

export const searchInUserRepos = async (username, search) => {
    const query = "?q=" + encodeURIComponent(`user:${username} ${search} in:name`);

    try {
        const response = await fetch(searchReposURL.href + query, {
            method: 'GET',
            headers: {
            'Accept': 'application/vnd.github+json, application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'NEWHELL69',
            }
        });

        if(!response.ok){
            throw new Error(`Error while searching repos, response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch(err) {
        logger.error(err);
        
        return {};
    }
}