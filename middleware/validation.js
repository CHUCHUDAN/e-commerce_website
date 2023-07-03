const { CustomError } = require('../helpers/error-builder')
const validator = require('validator')
const objDataGenerate = (template, formName, required, type, min, max) => {
  return {
    template,
    formName,
    required,
    type,
    min,
    max
  }
}
const validationData = {
  nameOfRegisterValid: objDataGenerate('users/register', '姓名', true, '', 1, 20),
  emailOfRegisterValid: objDataGenerate('users/register', '信箱', true, 'isEmail', 3, 50),
  passwordOfRegisterValid: objDataGenerate('users/register', '密碼', true, '', 3, 50),
  passwordCheckOfRegisterValid: objDataGenerate('users/register', '確認密碼', true, '', 3, 50)
}
module.exports = {
  // 驗證必填、資料格式、字數、密碼
  validation: (req, res, next) => {
    try {
      const body = req.body
      const { password, passwordCheck } = body

      for (const key in body) {
        const value = body[key] // 表單傳送的value值
        const data = validationData[`${key}OfRegisterValid`] // 資料物件
        const type = validator[data?.type] // 資料格式方法

        if (data.required && !value) throw new CustomError('所有值為必填', 400)
        if (type && !type(value)) throw new CustomError(`${data.formName}格式錯誤`, 400)
        if (data.min && !validator.isLength(value, { min: data.min })) throw new CustomError(`${data.formName}不符合最小字數`, 400)
        if (data.max && !validator.isLength(value, { max: data.max })) throw new CustomError(`${data.formName}不符合最大字數`, 400)
      }
      if (password && password !== passwordCheck) throw new CustomError('密碼與確認密碼不符', 400)
    } catch (err) {
      next(err)
    }
    next()
  }
}
