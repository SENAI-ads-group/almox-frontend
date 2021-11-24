import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthguardService implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const accessToken = localStorage.getItem(
            environment.auth.tokenLocalStorage
        );
        if (accessToken && accessToken !== "null" && accessToken != "undefined") {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
}
