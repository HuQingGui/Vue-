import axios from 'axios'
import {HOST} from './apiconfig'

export default function getPersonal () {
  const url = HOST + '/personalized'
  return axios.get(url)
}