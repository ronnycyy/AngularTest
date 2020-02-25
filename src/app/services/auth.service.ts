/**
 * 进行注册和登录
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from 'app/domain';
import { Observable } from 'rxjs';
import { Auth } from 'app/domain/auth.model';

@Injectable()
export class AuthService {
    private readonly domain = 'users';  //定义/projects路径
    private headers = new Headers({
        'Content-Type': 'application/json'     //告诉服务器，我传递的这个数据是json型的
    }); 

    // json web token: jwt标准
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    // 大部分都要导入http
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // 注册
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email': user.email}}) // 查到相同的email，说明已经注册
            .switchMap(res => {
                if(res.json().length > 0) {
                    throw 'user existed';
                }
                return this.http
                    .post(uri, JSON.stringify(user), {headers: this.headers})
                    .map(r => ({token: this.token, user: r.json()}));
            })
    }

    // 登录
    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;    //到具体的资源路径中
        
        return this.http
            .get(uri, {params: {'email': username, 'password': password}})   //获取和参数一致的项
            .map(res => {
                if(res.json().length === 0) {   //匹配不到任何user
                    throw 'username or password not match';
                }
                return {
                    token: this.token,
                    user: res.json()[0]     //这个数组返回回来只有一个
                }
            });
    }
}