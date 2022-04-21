import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoginService {
    constructor(private http: HttpClient) { }

    public logar(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(environment.auth.client_id + ':' + environment.auth.client_secret)}`
        });

        const body = new URLSearchParams();
        body.set('grant_type', environment.auth.grant_type);
        body.set('username', username);
        body.set('password', password);


        return this.http.post(`${environment.api.baseUrl}/oauth/token`, body, { headers: headers });
    }
}
