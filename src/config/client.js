const apiKey = 'YOUR_API_KEY'
const hostUrl = 'https://api.themoviedb.org/3/search/movie?'

export const endpoint = {
    getDataByQuery: (query) => `${ hostUrl }api_key=${ apiKey }&language=en-US&query=${ query }`,
}
