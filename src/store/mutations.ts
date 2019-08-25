
const mutations = {
  SET_USER_INFO: (state: RootState, userInfo: Dictionary) => {
    const { userName, email } = userInfo
    state.userName = userName
    state.email = email
  }
}

export default mutations
