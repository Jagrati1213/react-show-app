import axios from 'axios';

const axiosClient = axios.create();

// Function for getShows data
export function getShows() {
  return axiosClient.get('https://api.tvmaze.com/search/shows?q=all').then((res) => res);
}

// Function for Show data
export function getSingleShows(id) {
  return axiosClient.get(`https://api.tvmaze.com/shows/${id}`).then((res) => res);
}
