import {
  base
} from './base'

export const addItem = async (args = {
  name: undefined,
  author: undefined,
  category: undefined,
  description: undefined
}) => {
  let sql = `INSERT INTO tb_book(name, author, category, description) VALUES (?, ?, ?, ?)`;
  const {
    name,
    author,
    category,
    description
  } = args;
  const {
    results
  } = await base(sql, [
    name,
    author,
    category,
    description
  ])
  return results
}

export const delItem = async (id) => {
  let sql = `DELETE FROM tb_book WHERE id=${id}`
  const {
    results
  } = await base(sql);
  return results;
}

export const queryList = async (args = {}) => {
  let sql = 'SELECT * FROM tb_book';
  const {
    id,
    name,
    author,
    category,
    pageSize = 10,
    pageIndex = 1
  } = args
  const conditions = Object.keys({
    id,
    name,
    author,
    category
  }).reduce((prev, next) => {
    args[next] && prev.push(`${next}='${args[next]}'`)
    return prev
  }, [])
  let where = ''
  if (conditions.length > 0) {
    where = `WHERE ${conditions.join(' AND ')}`;
  }
  let limit = ''
  if (pageIndex > 1) {
    let offset = (pageIndex - 1) * pageSize;
    limit = ` ${where ? 'AND':'WHERE'} id>=(SELECT id FROM tb_book ${where} LIMIT ${offset},1) LIMIT ${pageSize} `
  } else {
    limit = ` LIMIT ${pageSize} `
  }
  sql = `${sql} ${where} ${limit}`
  const {
    results
  } = await base(sql);
  return {
    list: results,
    pageSize: parseInt(pageSize),
    pageIndex: parseInt(pageIndex),
  }
}

export const getItemById = async (id) => {
  const sql = `SELECT * FROM tb_book WHERE id=?`
  const {
    results
  } = await base(sql, [id]);
  return results[0]
}

export const updateItem = async (args = {
  id: undefined,
  name: undefined,
  author: undefined,
  category: undefined,
  description: undefined
}) => {
  let sql = 'UPDATE LOW_PRIORITY IGNORE tb_book'
  const {
    id
  } = args;
  const sets = Object.keys(args).reduce((prev, next) => {
    args[next] && prev.push(`${next}='${args[next]}'`)
    return prev;
  }, [])
  sql += ` SET ${sets.join(',')} WHERE id=${id}`
  const {
    results
  } = await base(sql);
  return results;
}

export default {
  addItem,
  delItem,
  queryList,
  getItemById,
  updateItem
}