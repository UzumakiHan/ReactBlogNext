import { makeAutoObservable } from 'mobx'
import { reqLogin } from '@/utils/api';
import { setUserId,
    getUserId,
    removeUserId } from '@/utils'
import constant from '@/constant'

class LoginStore {
   
    userId=0
    constructor() {
        makeAutoObservable(this);
    }
    handleLogin = (username: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            const loginRes: any = await reqLogin(username, password);
            if (loginRes.code === constant.SUCCESS_CODE) {
                this.userId = loginRes.data[0].id;
                setUserId(this.userId)
                resolve(loginRes)
            } else {
                resolve(loginRes)
            }
        })
    };
    handleLogout=()=>{
        removeUserId()
    }
}
export default LoginStore