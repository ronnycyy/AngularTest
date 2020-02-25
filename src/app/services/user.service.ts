/** 
 * 1. 查询用户
 * 根据email的头几个字母来查询用户，类似于搜索建议。应用场景包括添加组员，任务添加执行者和参与者
 * 2. 依据项目得到项目的所有成员
 * 3. 处理user和project的关系，多对多的关系，id存成数组的形式保持多对多的关联
 * 
 *  */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from 'app/domain';
import { Observable } from 'rxjs';
import { User } from '../domain';

@Injectable()
export class UserService {
    private readonly domain = 'users';  //定义data.json中的资源的路径
    private headers = new Headers({
        'Content-Type': 'application/json'     //告诉服务器，我传递的这个数据是json型的
    }); 

    // 大部分都要导入http
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // 搜索建议（用户）
    searchUsers(filter: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email_like': filter}})
            .map(res => res.json() as User[]);
    }

    // 取得项目所有成员
    getUsersByProject(projectId: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'projectId': projectId}})
            .map(res => res.json() as User[]);
    }

    // 当前用户下，往项目里添加
    addProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        // 如果projectId已存在于数组中，则不需要更新
        if(projectIds.indexOf(projectId) > -1) {
            return Observable.of(user);
        }
        return this.http
            .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
            .map(res => res.json() as User);
    }

    // 当前用户下，从项目里删除
    removeProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);

        // 如果projectId不存在于数组中，则不需要更新
        if(index === -1) {
            return Observable.of(user);
        }
        const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];

        return this.http
            .patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers})
            .map(res => res.json() as User);
    }


    // 批量处理
    batchUpdateProject(project: Project): Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return Observable.from(memberIds)
            // 把project中的所有user拿出来
            .switchMap(id => {
                const uri = `${this.config.uri}/${this.domain}/${id}`;
                return this.http.get(uri).map(res => res.json() as User);
            })
            .filter(user => user.projectIds.indexOf(projectId) === -1)  //把不属于项目的过滤出来
            .switchMap(u => this.addProjectRef(u, projectId))   //把user加到这个project当中
            .reduce((arr, curr) => [...arr, curr], [])

    }
}