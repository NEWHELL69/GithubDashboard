const baseURL = new URL("https://api.github.com");

export const searchUsersURL = new URL("/search/users", baseURL);

export const getUserURL = (username) => {
    return new URL(`/users/${username}`, baseURL);
}

export const getUserReposURL = (username) => { 
    return new URL(`/users/${username}/repos`, baseURL);
}

export const searchReposURL = new URL(`/search/repositories`, baseURL);