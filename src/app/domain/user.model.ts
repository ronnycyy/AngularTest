// 用户的领域类
export interface User {
    id?: string;   //? 表示此项可有可无
    email: string;
    password: string;
    name: string;
    avatar: string;
}