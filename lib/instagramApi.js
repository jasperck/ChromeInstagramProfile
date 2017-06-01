import axios from 'axios';
import {LIKED_API} from './constants';
import {transformResponse} from './utils';

const getLiked = (max_id) => axios.get(LIKED_API, {
  transformResponse,
  params: { max_id: max_id || null }
});

const instagramApi = {
  getLiked
};

export default instagramApi;
