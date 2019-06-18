import axios from 'axios'
import {HOST} from './apiconfig'

export function getSearchResult (value) {
  const url = HOST + `/search/suggest?keywords=${value}`
  return axios.get(url)
}
export function getSearchResultList (value) {
    const url = HOST + `/search?keywords=${value}&offset=0`
    return axios.get(url)
}
