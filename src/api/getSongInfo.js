import axios from 'axios'
import {HOST} from './apiconfig'

export default function getSongInfo (id) {
  const url = HOST + `/song/detail?ids=${id}`
  return axios.get(url)
}