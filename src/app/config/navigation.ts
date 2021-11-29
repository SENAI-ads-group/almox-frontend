import { MenuItem } from "primeng/api";

export const Navigation: MenuItem[] = [
    {
        label: "Cadastros",
        icon: "pi pi-list",
        items: [
            {
                label: "Produtos",
                icon: "fa fa-product-hunt",
                routerLink: "/produtos",
            },
            {
                label: "Grupos",
                icon: "fa fa-th",
                routerLink: "/grupos",
            },
            {
                label: "Departamentos",
                icon: "pi pi-tags",
                routerLink: "/departamentos",
            },
            {
                label: "Fabricantes",
                icon: "fa fa-industry",
                routerLink: "/fabricantes",

            },
            {
                label: "Fornecedores",
                icon: "fa fa-clipboard",
                routerLink: "/fornecedores",

            },
        ],
    },
    {
        label: "Movimentos",
        icon: "pi pi-sort-alt",
        items: [
            {
                label: "Requisições",
                icon: "fa fa-th",
                items: [
                    {
                        label: "Nova",
                        icon: "pi pi-plus",
                        routerLink: "/requisicoes/novo",
                    },
                    {
                        label: "Consultar",
                        routerLink: "/requisicoes",
                    },
                    {
                        label: "Atender",
                        routerLink: "/requisicoes",
                    }
                ]
            },
        ],
    },
    {
        label: "Financeiro",
        icon: "pi pi-money-bill",
        items: [],
    },
    {
        label: "Relatórios",
        icon: "pi pi-file-o",
        items: [],
    },
];
