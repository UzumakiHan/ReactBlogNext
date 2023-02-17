import { makeAutoObservable,runInAction } from 'mobx'
import { getAllBlog, getHotArticle, getCurrentArticle, getcommit, publicComment,getOwnActicle,deleteArticle } from '@/utils/api';
import constant from '@/constant';
import {message} from 'antd'
import {IArticle} from '@/typings'
class ArticleStore {
    allArticle = [];
    hotArticle = [];
    currentArticle = {};
    ownActicle = []
    ownTotal = 0;
    ownAllPages = 0
    total = 0;
    allPage = 0
    constructor() {
        makeAutoObservable(this);
    }
    getAllActicle = async (page: number) => {
        const articleRes: any = await getAllBlog(page, constant.PAGE_SIZE);
        runInAction(()=>{
            if (articleRes.code === constant.SUCCESS_CODE) {
                this.allArticle = articleRes.data.list;
                this.total = articleRes.data.total;
                this.allPage = articleRes.data.pages;
            }
        })
       
    };
    getHotArticle = async () => {
        const articleRes: any = await getHotArticle(constant.LIMIT_COUNT);
        runInAction(()=>{
            if (articleRes.code === constant.SUCCESS_CODE) {
                this.hotArticle = articleRes.data
            }
        })
      

    };
    getCurrentArticle = async (id: number) => {
        return await getCurrentArticle(id)


    }
    getcommit = async (id: number) => {
        return await getcommit(id)


    }
    publicComment = async (blogimg: string, bloguser: string, blogid: number, tousername: string, status: any, blogcomment: string, commentime: string) => {
        return await publicComment(blogimg, bloguser, blogid, tousername, status, blogcomment, commentime)
    }
    getOwnActicle=async(author:string,pageNum:number)=>{
       
        const articleRes: any = await getOwnActicle(author,pageNum, constant.PAGE_SIZE);
        runInAction(()=>{
            if (articleRes.code === constant.SUCCESS_CODE) {
                this.ownActicle =  articleRes.data.list;
                this.ownTotal = articleRes.data.total;
                this.ownAllPages = articleRes.data.pages;
            }
        })
        
    }
    deleteArticle=async(id:number)=>{
        const deleteRes:any = await deleteArticle(id);
        runInAction(()=>{
            if(deleteRes.code === 0){
                message.success(deleteRes.message)
                this.ownActicle = this.ownActicle.filter((article:IArticle)=>article.id !== id);
                this.ownTotal = this.ownTotal -1;
            }else{
                message.error(deleteRes.message)
            }
        })
       

    }

}
export default ArticleStore;
