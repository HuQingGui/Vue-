import axios from 'axios'
import {HOST} from './apiconfig'

export default function getNewSong () {
  const url = HOST + '/personalized/newsong'
  return axios.get(url)
}