export interface IPublish {
    title: string;
    content: string;
    label: string; 
    mold: string; 
    currentime: string; 
    author: string; 
    image: string
}
export interface IArticle {
    author: string;
    content: string;
    currentime: string;
    id: number;
    image: string;
    label: string;
    mold: string;
    readcount: string;
    title: string
}
export interface ICommit {
    tousername: string;
    blogimg: string;
    blogcomment: string;
    commentime: string
}
export interface EditorProps {
    submitting: boolean;

}
export interface ICommitContent {
    commitContent: string
}
export interface ILoginParams {
    username: string;
    password: string
}
export interface ILogin {
    data: object;
    code: number;
    message: string;
    token?: string
}
export interface IRegister {
    code: number;
    message: string;
}
export interface IUserInfo {
    birthday: string;
    image: string;
    id: number;
    information: string;
    job: string;
    location: string;
    password: string;
    realname: string;
    sex: string;
    status: string;
    username: string;



}