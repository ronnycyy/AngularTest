import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from 'app/domain';
import { Observable } from 'rxjs';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';  //定义/projects路径
    private headers = new Headers({
        'Content-Type': 'application/json'     //告诉服务器，我传递的这个数据是json型的
    }); 

    // 大部分都要导入http
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // 增加项目  用POST method
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(taskList), {headers: this.headers})
            .map(res => res.json());
    }

    // 修改项目 PUT method
    update(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;    //到具体的资源路径中
        const toUpdate = {   //在Project对象中，我们只想update这三项，其他的属性我们不想去update
            name: taskList.name
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})    //put会将整个对象的所有属性进行update，我们不希望这样；patch则可以选择一些自己想要update的属性
            .map(res => res.json());
    }

    // 删除项目
    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/taskLists/${taskList.id}`;
        return this.http.delete(uri)
            .mapTo(taskList);
    }

    // 请求某个项目 GET
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'projectId': projectId}})
            .map(res => res.json() as TaskList[]);
    }

    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http
            .patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers})
            .map(res => res.json());
        const drop$ = this.http
            .patch(dropUri, JSON.stringify({order: target.order}), {headers: this.headers})
            .map(res => res.json());
        return Observable
            .concat(drag$, drop$)
            .reduce((arrs, list) => [...arrs, list], []);
    }
}