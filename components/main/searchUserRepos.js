import { searchInUserRepos } from "../../services/repos.js";
import { getGlobal } from "../../utils/globals.js";
import { listUserRepo } from "./userRepos.js";

(() => {
    const searchUserReposField = document.querySelector("#searchUserRepo");

    let searchUserReposFieldValue = null;
    let searchUserReposFieldTimeout = null;

    searchUserReposField.addEventListener("input", async (event) => {
        searchUserReposFieldValue = event.target.value;

        clearTimeout(searchUserReposFieldTimeout);

        searchUserReposFieldTimeout = setTimeout(async () => {
            listUserRepo("", 1, {current: (await searchInUserRepos(getGlobal("username"), searchUserReposFieldValue)).items});
        }, 250);
    })
})()