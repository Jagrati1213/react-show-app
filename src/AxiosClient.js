import axios from 'axios';

const axiosClient = axios.create();

// Function for getShows data
export function getShows() {
  return axiosClient.get('https://api.tvmaze.com/search/shows?q=all').then((res) => res);
}