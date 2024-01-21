import { getUserRepos } from "../../services/repos.js"
import { getGlobal } from "../../utils/globals.js";
import { setPagination } from "./pagination.js";

export const listUserRepo = async (username, page = 1, searchedRepos) => {
    let repos;

    if(searchedRepos === null){
        repos = await getUserRepos(username, { page, perPage: getGlobal("perPageRepos") });
    } else {
        repos = searchedRepos;
    }

    const userRepos = document.getElementById("userRepos");
    const userRepoTemplate = document.getElementById("userRepoTemplate");

    {
        userRepos.innerHTML = "";
    }

    {
        repos.current.forEach((repo) => {
            const userRepo = userRepoTemplate.cloneNode(true);
            userRepo.removeAttribute("id");

            userRepo.querySelector(".userRepoName").innerHTML = repo.name;
            userRepo.querySelector(".userRepoDisc").innerHTML = repo.description;
            {
                const userRepoTopics = userRepo.querySelector(".userRepoTopics");
                userRepoTopics.innerHTML = "";

                for(let i = 0; (i < 4 && i < repo.topics.length); i++) {
                    const li = document.createElement("li");
                    li.classList.add("userRepoTopic");
                    if(i === 3){
                        li.innerHTML = repo.topics[i] + ` ${repo.topics.length-4}+`;
                    }  else {
                        li.innerHTML = repo.topics[i];
                    }
                    userRepoTopics.appendChild(li);
                }
            }

            userRepos.appendChild(userRepo);
        })
    }
}

export const showUserRepos = async (username) => {
    const repos = await getUserRepos(username, { perPage: getGlobal("perPageRepos") });

    {
        setPagination(1, repos.count, (page) => {
            listUserRepo(username, page, null)
        });
    }
}