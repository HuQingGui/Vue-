import axios from 'axios'
import {HOST} from './apiconfig'

export default function getSearch () {
  const url = HOST + '/search/hot'
  return axios.get(url)
}