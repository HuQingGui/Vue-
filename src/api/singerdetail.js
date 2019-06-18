import axios from 'axios'
import {HOST} from './apiconfig'

export default function getSingerDetail (id) {
  const url = HOST + `/artists?id=${id}`
  return axios.get(url)
}