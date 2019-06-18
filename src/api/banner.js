import axios from 'axios'
import {HOST} from './apiconfig'

export default function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}