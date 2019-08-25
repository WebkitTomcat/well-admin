
export class UserLoginInfo {
  public static get () {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
  }

  public static set (userInfo: Dictionary) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  public static clear () {
    localStorage.removeItem('userInfo')
  }
}
