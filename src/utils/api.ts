import {ajax} from './http'

const BASE_URL = '/api';
//登录
export const reqLogin = (username:string,password:string)=>ajax(BASE_URL+'/reqlogin',{username,password});
//获取用户信息
export const getUserInfo = (id:number)=>ajax(BASE_URL+'/getinfobyid',{id},'POST');
//获取所以文章
export const getAllBlog =(pageNum:number,pageSize:number)=>ajax(BASE_URL+'/getallcontent',{pageNum, pageSize});

//获取热门文章
export const getHotArticle = (limitcount:number)=> ajax(BASE_URL+'/getHotArticle',{limitcount});

//获取当前文章
export const getCurrentArticle = (id:number)=>ajax(BASE_URL+'/findid',{id},'POST');

//获取文章的评论
export const getcommit = (blogid:number) =>ajax(BASE_URL+'/getcommit',{blogid});
//评论发表
export const publicComment =(blogimg:string,bloguser:string,blogid:number,tousername:string,status:any,blogcomment:string,commentime:string)=>ajax(BASE_URL+'/commit',{blogimg,bloguser,blogid,tousername,status,blogcomment,commentime},'POST')
//文章发表
export const publicArticle=(title:string,content:string,label:string,mold:string,currentime:string,author:string,image:string)=>ajax(BASE_URL+'/release',{title,content,label,mold,currentime,author,image},'POST');


//获取个人博客
export const getOwnActicle = (author:string,pageNum:number,pageSize:number)=>ajax(BASE_URL+'/getowncontent',{author,pageNum,pageSize})

//阅读数增加
export const updateReadCount = (readconut:number,id:number)=>ajax(BASE_URL+'/readconut',{readconut,id});

//文章删除
export const deleteArticle=(id:number)=>ajax(BASE_URL+'/delarticle',{id},'POST');

//文章编辑
export const editArticle = (id:number,title:string,content:string,label:string,mold:string,currentime:string)=>ajax(BASE_URL+'/editarticle',{id,title,content,label,mold,currentime},'POST');

//头像删除
export const deleteAvatar=(filePath:string)=>ajax(BASE_URL+'/deleteFile',{filePath},'POST');


//修改用户信息

export const changeUserInfo = (id:number,username:string,birthday:string,location:string,information:string,realname:string,job:string,sex:string,image:string,filePath:string)=>ajax(BASE_URL+'/modifyingdataV2',{id,username,birthday,location,information,realname,job,sex,image,filePath},'POST');

//密码匹配
export const matchingPwd = (id:number,password:string)=>ajax(BASE_URL+'/matchingPwd',{id,password},'POST');

export const changepassword = (id:number,changepassword:string)=>ajax(BASE_URL+'/changepassword',{id,changepassword},'POST');

