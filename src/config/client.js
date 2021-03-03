const apiKey = '921baef6b23489c6ff4272b0a57c4ae3'
const hostUrl = 'https://api.themoviedb.org/3/search/movie?'

export const endpoint = {
    getDataByQuery: (query) => `${ hostUrl }api_key=${ apiKey }&language=en-US&query=${ query }`,
}
