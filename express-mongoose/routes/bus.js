const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const assert = require('http-assert')
const qs = require('qs')
//分页
const { pagination } = require('../core/util/util')
//相关映射表
const POPULATE_MAP = require('../plugins/POPULATE_MAP')
const POP_POST_MAP = require('../plugins/POP_POST_MAP')
const POP_GET_MAP = require('../plugins/POP_GET_MAP')
const POP_PUT_MAP = require('../plugins/POP_PUT_MAP')
const RESOURCE_POST_MAP = require('../plugins/RESOURCE_POST_MAP')

//post创建资源
router.post('/', async (req, res, next) => {
  try {
    let modelName = req.Model.modelName, body = req.body
    if (modelName in RESOURCE_POST_MAP) {
      body = RESOURCE_POST_MAP[modelName]['body'](body, req._id)
    }
    const result = await req.Model.create(body)
    if (modelName in POP_POST_MAP) {
      let item = POP_POST_MAP[modelName]
      let { _refId, _model, queryAct, options } = item
      let _id = result._id
      let refId = result?.[_refId]
      assert(refId, 422, `${_refId} 必填`)
      await _model[queryAct](refId, options(_id))
    }
    res.send(200, {
      message: '提交成功',
      data: {
        id: result._id
      }
    })
  } catch (err) {
    next(err || createError(400, '添加失败'))
  }
})

//put更新资源
router.put('/:id', async (req, res, next) => {
  let putData = req.body
  let modelName = req.Model.modelName
  let id = req.params.id //资源id
  let isPass = req.isPass //鉴权结果
  let userId = req._id //userID

  try {
    let { revisable, authField } = POP_PUT_MAP[modelName]
    let isValidate = (modelName in POP_PUT_MAP) && isPass
    assert(isValidate, 400, "无权修改")
    let data = await req.Model.findById(id)
    assert(data, 404, "资源不存在")
    assert.equal(userId, data?.[authField], 400, '无权修改')

    let updateData = Object.entries(putData).filter(([key, value]) => {
      return revisable.includes(key)
    })
    isValidate = updateData.length !== 0
    assert(isValidate, 400, '修改失败')
    updateData = Object.fromEntries(updateData)
    updateData['date'] = new Date().toISOString()
    await req.Model.findByIdAndUpdate(id, updateData)
    res.send(200, {
      message: '修改成功'
    })
  } catch (err) {
    next(err)
  }
})

//delete删除资源
router.delete('/:id', async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id)
  res.send({
    errMsg: 'ok'
  })
})

//get查询资源列表
router.get('/', async (req, res, next) => {
  let modelName = req.Model.modelName
  let { options = {}, page = 1, size = 100, query = {}, dis = 8, populate = {} } = req.query
  query = qs.parse(query) //把字符串转回来
  if (query.q) {
    let regexp = new RegExp(query.q, 'i')
    query = {
      $or: [
        { title: { $regex: regexp } },
        { content: { $regex: regexp } }
      ]
    }
  }
  try {
    if (modelName in POPULATE_MAP) {
      populate = POPULATE_MAP[modelName]
    }
    let result = await pagination({ model: req.Model, query, options, populate, size, page, dis })
    res.send(200, {
      message: "ok",
      data: result
    })
  } catch (err) {
    console.log(err)
    next(createError(422, "获取失败"))
  }
})

//get查询对应id资源
router.get('/:id', async (req, res) => {
  let modelName = req.Model.modelName
  let _id = req.params.id
  try {
    let result = req.Model.findById(_id)
    if (modelName in POPULATE_MAP) {
      let populates = POPULATE_MAP[modelName]
      result = result.populate(populates)
      result = await result.exec()
      res.send(200, {
        message: '查询成功',
        data: result
      })
    }
    if (modelName in POP_GET_MAP) {
      let { queryAct, options } = POP_GET_MAP[modelName]
      await req.Model[queryAct](_id, options())
    }

  } catch (err) {
    console.log(err)
  }

})

module.exports = router