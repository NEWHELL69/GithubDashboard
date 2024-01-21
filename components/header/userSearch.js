import { showUserDetails } from "../main/userDetails.js";
import { searchUsers } from "../../services/user.js"
import { setGlobal } from "../../utils/globals.js";

(() => {
    const userSearchResults = document.getElementById("userSearchResults");
    const userSearchField = document.getElementById("userSearchField");

    // Positioning userSearchResults initially and on window resize
    {
        const setPositionOfuserSearchResults = () => {
            userSearchResults.style.left = userSearchField.getBoundingClientRect().left + "px";
            userSearchResults.style.top = userSearchField.getBoundingClientRect().bottom + "px";
        }
        setPositionOfuserSearchResults();

        window.onresize = setPositionOfuserSearchResults;
    }

    // Hiding results when clicked anywhere else
    {
        window.onclick = () => {
            showUserSearchResults([])
        }

        // anywhere except header
        document.querySelector("header").onclick = (event) => {
            event.stopPropagation();
        }
    }

    // Displaying search results
    const showUserSearchResults = (results) => {
        userSearchResults.innerHTML = "";

        results.forEach((result) => {
            const element = document.createElement('a');
            element.href = "#"
            element.textContent = result.login;
            element.onclick = (event) => {
                event.stopPropagation();
                userSearchField.value = ""
                showUserSearchResults([])
                showUserDetails(result);
                setGlobal("username", result.login);
                document.querySelector("main").removeAttribute("hidden");
                document.querySelector("#mainLoading").setAttribute("hidden", "");
            }
            userSearchResults.appendChild(element);
        })
    }

    // Searching for users that match the searched text
    {
        let userSearchFieldValue = "";
        let userSearchFieldTimeout = null;

        userSearchField.addEventListener("input", async (event) => {
            userSearchFieldValue = event.target.value;

            clearTimeout(userSearchFieldTimeout);

            userSearchFieldTimeout = setTimeout(async () => {
                if(userSearchFieldValue === ""){
                    showUserSearchResults([]);
                    return;
                }

                document.querySelector("#mainLoading").removeAttribute("hidden");
                document.querySelector("main").setAttribute("hidden", "");
                const results = await searchUsers(userSearchFieldValue);

                showUserSearchResults(results.items);
            }, 250);
        });
    }
})()