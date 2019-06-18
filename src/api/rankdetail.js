import axios from 'axios'
import {HOST} from './apiconfig'

export default function getRankDetail (id) {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}