import {
  base
} from './base'

export const getCount = async (data) => {
  const sql = 'select count(*) as total from tb_user where uname=? and passwd=?';
  const {
    results
  } = await base(sql, data);
  return results
}

export default {
  getCount
}