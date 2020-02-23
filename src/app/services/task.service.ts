import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task,TaskList } from 'app/domain';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
    private readonly domain = 'tasks';  //定义/projects路径
    private headers = new Headers({
        'Content-Type': 'application/json'     //告诉服务器，我传递的这个数据是json型的
    }); 

    // 大部分都要导入http
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // 增加项目  用POST method
    add(task: Task): Observable<Task> {
        task.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(task), {headers: this.headers})
            .map(res => res.json());
    }

    // 修改项目 PUT method
    update(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;    //到具体的资源路径中
        const toUpdate = {   //我们只想update这几项，其他的属性我们不想去update
            desc: task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})    //put会将整个对象的所有属性进行update，我们不希望这样；patch则可以选择一些自己想要update的属性
            .map(res => res.json());
    }

    // 删除项目
    del(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/taskLists/${task.id}`;
        return this.http
            .delete(uri)
            .mapTo(task);
    }

    // 请求某个任务列表 GET
    get(taskListId: string): Observable<Task[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'taskListId': taskListId}})
            .map(res => res.json() as Task[]);
    }

    getByLists(lists: TaskList[]): Observable<Task[]> {
        return Observable.from(lists)
            .mergeMap(list => this.get(list.id))
            .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], [])
    }

    complete(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;    //到具体的资源路径中
        return this.http
            .patch(uri, JSON.stringify({completed: !task.completed}), {headers: this.headers})    //put会将整个对象的所有属性进行update，我们不希望这样；patch则可以选择一些自己想要update的属性
            .map(res => res.json());
    }

    // 移动某一个任务
    move(taskId: string, taskListId: string): Observable<Task> {
        const uri = `${this.config.uri}/${this.domain}/${taskId}`;    //到具体的资源路径中
        return this.http
            .patch(uri, JSON.stringify({taskListId: taskListId}), {headers: this.headers})    //put会将整个对象的所有属性进行update，我们不希望这样；patch则可以选择一些自己想要update的属性
            .map(res => res.json());
    }

    // 移动某一个任务列表
    moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
        return this.get(srcListId)
            .mergeMap(tasks => Observable.from(tasks))
            .mergeMap(task => this.move(task.id, targetListId))
            .reduce((arr, x) => [...arr, x], []);
    }
}