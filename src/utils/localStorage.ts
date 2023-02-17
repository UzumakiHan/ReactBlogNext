// 封装ls存取UserInfo

const key = 'user_id'

const setUserId = (userId:number) => {
  return window.localStorage.setItem(key,String(userId))
}

const getUserId  = () => {
  return window.localStorage.getItem(key)
}

const removeUserId  = () => {
  return window.localStorage.removeItem(key)
}

export {
  setUserId,
  getUserId,
  removeUserId

}