import axios from 'axios'
import {HOST} from './apiconfig'

export default function loginTo (member,password) {
  const url = HOST + `/login/cellphone?phone=${member}&password=${password}`
  return axios.get(url)
}