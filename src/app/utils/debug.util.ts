import { Observable } from "rxjs/Observable";
import { environment } from "../../../AngularTest/src/environments/environment";

import 'rxjs/add/operator/do';

// 给接口添加debug方法
declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) => Observable<T>;
    }
}

Observable.prototype.debug = function(message: string) {
    return this.do(
        (next) => {
            if(!environment.production) {   //非生产环境时
                console.log(message, next);   //message: 传入操作符的消息；next: 流中更新的值
            }  
        },
        (err) => {
            if(!environment.production) {   //非生产环境时
                console.log('ERROR>>', message, err);
            }  
        },
        () => {
            if(!environment.production) {   //非生产环境时
                console.log('Completed');
            }  
        }
    )
}