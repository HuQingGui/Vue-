import axios from 'axios'
import {HOST} from './apiconfig'

export default function getLyric (id) {
  const url = HOST + `/lyric?id=${id}`
  return axios.get(url)
}