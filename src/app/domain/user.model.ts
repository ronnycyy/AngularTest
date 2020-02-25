// 只需要给第一个值，后面的都会自动加1
export enum IdentityType {
    IdCard = 0,
    Insurance,    //医保
    Passport,    //护照
    Military,    //士兵证
    Other
}

export interface Address {
    province: string;
    city: string;
    district: string;
    street?: string;
}

// 身份认证
export interface Identity {
    identityNo: string;
    identityType: IdentityType
}

// 用户的领域类
export interface User {
    id?: string;   //? 表示此项可有可无
    email: string;
    password: string;
    name: string;
    avatar: string;
    projectIds: string[];    //用户参与的项目
    address?: Address;
    identity?: Identity;
    dateOfBirth?: string;
}