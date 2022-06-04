import { Mensagens } from "src/utils/Mensagens";
import { MessageService } from "primeng/api";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "./../services/login.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    username: string;
    password: string;
    isLoading = false;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private messageService: MessageService
    ) { }

    login() {
        if (this.isLoading)
            return;

        this.isLoading = true;
        this.loginService.logar(this.username, this.password)
            .subscribe({
                next: ({ access_token }) => {
                    sessionStorage.setItem("almox_access_token", access_token);
                    this.router.navigate(["/"]);
                    this.messageService.add(Mensagens.BEM_VINDO);
                    this.isLoading = false;
                },
                error: (err) => {
                    this.isLoading = false;
                    this.username = "";
                    this.password = "";
                }
            });
    }
}
