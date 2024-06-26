import { toPage } from "../utils/route-builder.js";

const admin_links = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: toPage("dashboard"),
  },
  {
    id: 2,
    title: "Funcionários",
    icon: '<i class="menu-icon tf-icons bx bx-user"></i>',
    path: toPage("funcionarios"),
  },
  {
    id: 3,
    title: "Roles & Permissions",
    icon: '<i class="menu-icon tf-icons bx bx-check-shield"></i>',
    submenus: [
      {
        id: 1,
        title: "Roles",
        path: toPage("access/roles"),
      },
      {
        id: 2,
        title: "Permissions",
        path: toPage("access/permissions"),
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: '<i class="menu-icon tf-icons bx bxs-user-account"></i>',
    path: toPage("account-settings"),
  },
  {
    id: 5,
    title: "Pontos Registrados",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("ponto"),
  },
  {
    id: 100,
    title: "Logout",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    action: true,
  },
];

const colaborador_links = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: toPage("bater-ponto"),
  },
  {
    id: 2,
    title: "Lista Ponto",
    icon: '<i class="menu-icon tf-icons bx bx-list-ul"></i>',
    path: toPage("lista-pontos"),
  },
  {
    id: 3,
    title: "Meu perfil",
    icon: '<i class="menu-icon tf-icons bx bxs-user"></i>',
    path: toPage("meu-perfil"),
  },
  {
    id: 100,
    title: "Logout",
    icon: '<i class="menu-icon tf-icons bx bx-log-out"></i>',
    action: true,
  },
];

export const sidebarMapConfig = Object.freeze({
  ADMIN: admin_links,
  COLABORADOR: colaborador_links,
});
