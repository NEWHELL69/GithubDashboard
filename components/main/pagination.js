export const setPagination = (startPage, lastPage, callback) => {
    const pagination = document.getElementById("pagination");
    const paginationOlder = document.getElementById("paginationOlder");
    const paginationPages = document.getElementById("paginationPages");
    const paginationNewer = document.getElementById("paginationNewer");

    paginationPages.innerHTML = "";

    for(let i = startPage; (i <= lastPage && i <= startPage+9-1); i++){
        const li = document.createElement("li");

        if(i === startPage) {
            callback(startPage);
            li.setAttribute("active", "");
        }

        const a = document.createElement("a");
        a.href = "#";
        a.innerText = i;
        li.onclick = () => {
            pagination.querySelector("li[active]").removeAttribute("active");
            li.setAttribute("active", "");
            callback(i);
        }
        li.appendChild(a)
        paginationPages.appendChild(li);
    }

    const paginationOlderCallback = () => {
        setPagination(startPage-9, lastPage, callback);
    }

    if(startPage-1 === 0){
        paginationOlder.setAttribute("disabled", "");
    } else {
        paginationOlder.removeAttribute("disabled");
        paginationOlder.addEventListener("click", paginationOlderCallback, { once: true });
    }

    const paginationNewerCallback = () => {
        setPagination(startPage+9, lastPage, callback);
    }

    if(((lastPage - (startPage-1)) - 9) <= 0) {
        paginationNewer.setAttribute("disabled", "");
    } else {
        paginationNewer.removeAttribute("disabled");
        paginationNewer.addEventListener("click", paginationNewerCallback, { once: true });
    }

    pagination.removeAttribute("hidden")
}