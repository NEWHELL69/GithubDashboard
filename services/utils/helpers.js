export const extractPageCountFromLinkHeader = (linkHeader) => {
    const regex = /<[^>]*\?per_page=\d+&page=(\d+)>; rel="last"/;
    const match = linkHeader.match(regex);

    if (match && match[1]) {
        return match[1];
    }

    return null;
}