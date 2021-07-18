// export api of user
import get from 'lodash/fp/get';
import {
  getResTpl
} from '../utils';
import {
  user as db
} from '../databases';

export const check = async (req, res) => {
  const params = get('body')(req)
  const results = await db.getCount([get('uname')(params), get('passwd')(params)])
  res.json(getResTpl(get('[0].total')(results) > 0 ? 1 : 0))
}

export default {
  check
}