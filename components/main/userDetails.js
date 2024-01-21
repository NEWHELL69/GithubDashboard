import { getUser } from "../../services/user.js"
import { showUserRepos } from "./userRepos.js";

export const showUserDetails = async (user) => {
    const userDetailsElement = document.getElementById("userDetails");
    const userDetailsData = await getUser(user.login);

    {
        const userImage = userDetailsElement.querySelector("#userImage");
        userImage.src = userDetailsData.avatar_url; 
    }

    {
        const userName = userDetailsElement.querySelector("#userName");
        userName.innerHTML = userDetailsData.login
    }

    {
        const userBio = userDetailsElement.querySelector("#userBio");
        userBio.innerHTML = userDetailsData.bio
    }

    {
        const userLocation = userDetailsElement.querySelector("#userLocation");
        userLocation.innerHTML = userDetailsData.location
    }

    {
        const userTwitter = userDetailsElement.querySelector("#userTwitter");
        userTwitter.href = `https://twitter.com/${userDetailsData.twitter_username}`;
        userTwitter.innerHTML = `https://twitter.com/${userDetailsData.twitter_username}`;
    }

    {
        const userGithub = userDetailsElement.querySelector("#userGithub a");
        userGithub.href = userDetailsData.html_url;
        userGithub.innerHTML = userDetailsData.html_url;
    }

    showUserRepos(user.login);
}