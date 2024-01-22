import { searchInUserRepos } from "../../services/repos.js";
import { getGlobal } from "../../utils/globals.js";
import { listUserRepo, showUserRepos } from "./userRepos.js";

(() => {
    const searchUserReposField = document.querySelector("#searchUserRepo");

    let searchUserReposFieldValue = null;
    let searchUserReposFieldTimeout = null;

    searchUserReposField.addEventListener("input", async (event) => {
        searchUserReposFieldValue = event.target.value;

        clearTimeout(searchUserReposFieldTimeout);

        searchUserReposFieldTimeout = setTimeout(async () => {
            if(searchUserReposFieldValue === "" && getGlobal("username") !== "") {
                showUserRepos(getGlobal("username"));
                return;
            }

            listUserRepo("", 1, {current: (await searchInUserRepos(getGlobal("username"), searchUserReposFieldValue)).items});
        }, 250);
    })
})()