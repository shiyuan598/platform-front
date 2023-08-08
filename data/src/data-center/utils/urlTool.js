export function getSearchParams(key, url=window.location.search) {
    let search = url;
    let params = new URLSearchParams(search);
    return params.get(key);
}