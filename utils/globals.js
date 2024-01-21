const globals = {
    username: "",
    perPageRepos: 10
}

export const setGlobal = (key, value) => {
    globals[key] = value;
}

export const getGlobal = (key) => {
    return globals[key];
}