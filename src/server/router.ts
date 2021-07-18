import express from 'express';
import {
  book,
  user
} from './services';

const router = express.Router();

/** 
 * RESTful API
 * GET（Retrieve）：从服务器取出资源（一项或多项）；
 * POST（CREATE）：在服务器新建一个资源；
 * PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）；
 * PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）；
 * DELETE（DELETE）：从服务器删除资源。
 */

/**
 * @api {get} /books 查询多本图书
 * @apiDescription 用户需要登录才能新增
 * @apiName GetBooks
 * @apiGroup 图书
 * @apiParam {number} [id] 自增唯一id
 * @apiParam {string} [name] 图书名字
 * @apiParam {string} [author] 作者
 * @apiParam {string} [category] 分类
 * @apiParam {string} [description] 描述
 * @apiParam {number} [pageIndex=1] 当前请求分页索引
 * @apiParam {number} [pageSize=10] 分页大小 
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccess {object[]} ret 图书列表
 * @apiSuccess {number} ret.id 自增唯一id
 * @apiSuccess {string} ret.name 图书名字
 * @apiSuccess {string} ret.author 作者
 * @apiSuccess {string} ret.category 分类
 * @apiSuccess {string} ret.description 描述
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *      "ret" : [{
 *          "id" : "id",
 *          "name" : "name",
 *          "author" : "author",
 *          "category" : "author",
 *          "description" : "description",
 *      }]
 *  }
 * @apiSampleRequest http://localhost:8000/books
 * @apiVersion 1.0.0
 */
router.get('/books', book.queryList)

/**
 * @api {get} /books/book/:id 查询一本图书
 * @apiDescription 用户需要登录才能新增
 * @apiName GetBook
 * @apiGroup 图书
 * @apiParam {number} id 自增唯一id
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccess {object} ret 返回值详情
 * @apiSuccess {number} ret.id 自增唯一id
 * @apiSuccess {string} ret.name 图书名字
 * @apiSuccess {string} ret.author 作者
 * @apiSuccess {string} ret.category 分类
 * @apiSuccess {string} ret.description 描述
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *      "ret" : {
 *          "id" : "id",
 *          "name" : "name",
 *          "author" : "author",
 *          "category" : "author",
 *          "description" : "description",
 *      }
 *  }
 * @apiSampleRequest http://localhost:8000/books/book/:id
 * @apiVersion 1.0.0
 */
router.get('/books/book/:id', book.getItemById)

/**
 * @api {post} /books/book 新增图书
 * @apiDescription 用户需要登录才能新增
 * @apiName AddBook
 * @apiGroup 图书
 * @apiParam {string} name 图书名字
 * @apiParam {string} author 作者
 * @apiParam {string} category 分类
 * @apiParam {string} description 描述
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccess {object} ret 返回值详情
 * @apiSuccess {number} ret.id 自增唯一id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *      "ret" : {
 *          "id" : "id",
 *      }
 *  }
 * @apiSampleRequest http://localhost:8000/books/book
 * @apiVersion 1.0.0
 */
router.post('/books/book', book.addItem)

/**
 * @api {put} /books/book 更新图书
 * @apiDescription 用户需要登录才能新增
 * @apiName UpdateBook
 * @apiGroup 图书
 * @apiParam {number} id 图书id
 * @apiParam {string} name 图书名字
 * @apiParam {string} author 作者
 * @apiParam {string} category 分类
 * @apiParam {string} description 描述
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *  }
 * @apiSampleRequest http://localhost:8000/books/book
 * @apiVersion 1.0.0
 */
router.put('/books/book', book.updateItem)

/**
 * @api {delete} /books/book/:id 删除图书
 * @apiDescription 用户需要登录才能新增
 * @apiName DeleteBook
 * @apiGroup 图书
 * @apiParam {number} id 图书id
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *  }
 * @apiSampleRequest http://localhost:8000/books/book/:id
 * @apiVersion 1.0.0
 */
router.delete('/books/book/:id', book.delItem)

/**
 * @api {post} /users/check 检查用户账号
 * @apiDescription 用户需要登录才能新增
 * @apiName CheckUser
 * @apiGroup 用户
 * @apiParam {string} uname 用户名
 * @apiParam {string} passwd 用户密码
 * @apiSuccess {number} code 返回的代码
 * @apiSuccess {string} message 结果描述
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 1,
 *      "message" : "success",
 *  }
 * @apiSampleRequest http://localhost:8000/users/check
 * @apiVersion 1.0.0
 */
router.post('/users/check', user.check)

export default router;