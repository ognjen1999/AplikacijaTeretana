import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AdminService } from "./admin.service";
import { ServerService } from "./server.service";

@Injectable()
export class guardService{

    constructor(private router:Router,
               private admin:AdminService){}
               canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
                if(!this.admin.adminToken){
                    this.router.navigate([""])
                }
                else{
                    return this.admin.adminToken;
                }
                return true;
    }
}