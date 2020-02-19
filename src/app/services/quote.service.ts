import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.model';

@Injectable()
export class QuoteService {
    // 依赖注入：'BASE_CONFIG'
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    getQuote():Observable<Quote> {
        const uri = `${this.config.uri}/quote/${Math.floor(Math.random()*10)}`;    //随机生成api的id
        return this.http.get(uri)
            .map(res => res.json() as Quote);
    }
}