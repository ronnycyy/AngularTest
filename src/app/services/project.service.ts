import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from 'app/domain';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';  //定义/projects路径
    private headers = new Headers({
        'Content-Type': 'application/json'     //告诉服务器，我传递的这个数据是json型的
    }); 

    // 大部分都要导入http
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // 增加项目  用POST method
    add(project: Project): Observable<Project> {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(project), {headers: this.headers})
            .map(res => res.json());
    }

    // 修改项目 PUT method
    update(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;    //到具体的资源路径中
        const toUpdate = {   //在Project对象中，我们只想update这三项，其他的属性我们不想去update
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})    //put会将整个对象的所有属性进行update，我们不希望这样；patch则可以选择一些自己想要update的属性
            .map(res => res.json());
    }

    // 删除项目
    del(project: Project): Observable<Project> {
        // 用一个请求来删除更多的实体，对我们来讲会更划算 => 删除列表和它下面的tasks
        const delTask$ = Observable.from(project.taskList)    //从taskLists数组里，取得流
            //删除每个taskList，json-server会进行级联删除（删除taskList下的所有task）; mergeMap：当有新的taskList进来后，事件流要保持住 => 删得干干净净
            .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))     
            .count();   //可以聚集起来的唯一的Observable，我需要一个信号说前面这些动作都已经完成了
        return delTask$
            .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))   //删除该项目
            .mapTo(project);   //直接把输入的project，返回回去
    }

    // 请求某个成员的所有项目 GET
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'members_like': userId}})
            .map(res => res.json() as Project[]);
    }
}