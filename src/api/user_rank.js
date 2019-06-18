import axios from 'axios'
import {HOST} from './apiconfig'

export default function userRank (id) {
  const url = HOST + `/user/playlist?uid=${id}`
  return axios.get(url)
}