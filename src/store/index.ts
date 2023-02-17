import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ArticleStore from './article.Store';
class RootStore{
    loginStore:any;
    userStore:any;
    articleStore:any;
    constructor(){
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.articleStore = new ArticleStore()
    }
}
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = ()=>React.useContext(context);
export{
    useStore
}