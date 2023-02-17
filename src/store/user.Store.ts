import { makeAutoObservable, runInAction } from 'mobx'
import { getUserInfo,changeUserInfo } from '@/utils/api';
import constant from '@/constant';
import {message} from 'antd'
import {
  getUserId,
} from '@/utils'
class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    // 调用接口获取数据
    const id = Number(getUserId())
    if (id) {
      const userInfoRes: any = await getUserInfo(id)
      runInAction(() => {
        if (userInfoRes.code === constant.SUCCESS_CODE) {
          this.userInfo = userInfoRes.data[0]
        }
      })
    }
  };
  changeUserInfo=async(id:number,username:string,birthday:string,location:string,information:string,realname:string,job:string,sex:string,image:string,filePath:string)=>{
    const userInfoRes:any =await changeUserInfo(id,username,birthday,location,information,realname,job,sex,image,filePath);
    runInAction(()=>{
      if(userInfoRes.code === constant.SUCCESS_CODE){
        this.userInfo = userInfoRes.data[0];
        message.success(userInfoRes.message)
      }else{
        message.error(userInfoRes.message)

      }
    })

  }
}

export default UserStore