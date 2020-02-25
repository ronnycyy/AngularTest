/**
 * 路由守卫
 */

 import { Injectable } from '@angular/core';
 import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { Observable } from 'rxjs';
 
 @Injectable()
 export class AuthGuardService implements CanActivate {
     canActivate(
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot
     ): Observable<boolean> {
         return Observable.of(true);
     }
 }
 