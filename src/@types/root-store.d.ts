import { Commit, ActionContext, ActionTree, GetterTree } from 'vuex'

declare global {
  // root state
  interface RootState {
    userName: string
    email: string
  }

  // root action context
  interface RootActionContext extends ActionContext<RootState, RootState> {}

  // root actions
  namespace RootActions {
    interface SetUserLoginStatus {
      (loginFormData: { email: string, pwd: string }): Promise<boolean>
    }
  }
}
