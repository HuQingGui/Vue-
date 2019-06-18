import axios from 'axios'
import {HOST} from './apiconfig'

export default function getRankList (id) {
  const url = HOST + `/top/list?idx=${id}`
  return axios.get(url)
}