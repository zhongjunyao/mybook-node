// export api of book
import get from 'lodash/fp/get';
import {
  getResTpl
} from '../utils';
import {
  book as db
} from '../databases';

export const addItem = async (req, res) => {
  const {
    affectedRows,
    insertId: id
  } = await db.addItem(get('body')(req))

  res.json(getResTpl(affectedRows === 1 ? 1 : 0, {
    ret: {
      id
    }
  }))
}

export const delItem = async (req, res) => {
  const {
    affectedRows
  } = await db.delItem(get('params.id')(req))

  res.json(getResTpl(affectedRows === 1 ? 1 : 0))
}

export const queryList = async (req, res) => {
  const params = get('query')(req)
  const ret = await db.queryList(params)
  res.json(getResTpl(ret ? 1 : 0, {
    ret
  }))
}

export const getItemById = async (req, res) => {
  const ret = await db.getItemById(get('params.id')(req))
  res.json(getResTpl(ret ? 1 : 0, {
    ret
  }))
}

export const updateItem = async (req, res) => {
  const {
    affectedRows
  } = await db.updateItem(get('body')(req))
  res.json(getResTpl(affectedRows === 1 ? 1 : 0))
}

export default {
  addItem,
  delItem,
  queryList,
  getItemById,
  updateItem
}