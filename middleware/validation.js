const { CustomError } = require('../helpers/error-builder')
const validator = require('validator')
const objDataGenerate = (formName, required, type, min, max) => {
  return {
    formName,
    required,
    type,
    min,
    max
  }
}
const validationData = {
  // 註冊資料
  nameOfRegisterValid: objDataGenerate('姓名', true, '', 1, 20),
  emailOfRegisterValid: objDataGenerate('信箱', true, 'isEmail', 3, 50),
  passwordOfRegisterValid: objDataGenerate('密碼', true, '', 3, 50),
  passwordCheckOfRegisterValid: objDataGenerate('確認密碼', true, '', 3, 50),
  // 登入資料
  emailOfLoginValid: objDataGenerate('信箱', true, 'isEmail', 3, 50),
  passwordOfLoginValid: objDataGenerate('密碼', true, '', 3, 50)
}
module.exports = {
  // 驗證必填、資料格式、字數、密碼
  validation: (req, res, next) => {
    try {
      const url = req.url
      const body = req.body
      const { password, passwordCheck } = body
      let afterText = ''

      // 檢查資料來自哪個路由
      if (url === '/user/register') {
        afterText = 'OfRegisterValid'
      }
      if (url === '/user/login') {
        afterText = 'OfLoginValid'
      }

      for (const key in body) {
        const value = body[key] // 表單傳送的value值
        const data = validationData[`${key}${afterText}`] // 資料物件
        const type = validator[data.type] // 資料格式方法

        if (data.required && !value) throw new CustomError('所有值為必填', 400)
        if (type && !type(value)) throw new CustomError(`${data.formName}格式錯誤`, 400)
        if (data.min && !validator.isLength(value, { min: data.min })) throw new CustomError(`${data.formName}不符合最小字數`, 400)
        if (data.max && !validator.isLength(value, { max: data.max })) throw new CustomError(`${data.formName}不符合最大字數`, 400)
      }
      if (afterText !== 'OfLoginValid' && password && password !== passwordCheck) throw new CustomError('密碼與確認密碼不符', 400)
    } catch (err) {
      next(err)
    }
    next()
  }
}
