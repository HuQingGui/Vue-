import axios from 'axios'
import {HOST} from './apiconfig'

export default function getSinger () {
  const url = HOST + '/top/artists?limit=100'
  return axios.get(url)
}