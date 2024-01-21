import { getGlobal, setGlobal } from "../../utils/globals.js"
import { showUserRepos } from "../main/userRepos.js";

(() => {
    document.querySelector("#perPageReposBtn").addEventListener("click", () => {
        if(document.querySelector("#perPageReposField").value > 100) {
            return;
        }

        setGlobal("perPageRepos", document.querySelector("#perPageReposField").value);

        if(getGlobal("username") !== ""){
            showUserRepos(getGlobal("username"));
        }
    })
})()