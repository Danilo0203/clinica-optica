import { NavItem } from "@/types";

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};


//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "Panel",
    url: "/panel/overview",
    icon: "LayoutDashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  // Secretaria
  {
    title: "Secretaria",
    url: "/panel/secretaria",
    icon: "User",
    isActive: false,
    items: [
      {
        title: "Secretaria",
        url: "/panel/secretaria",
        icon: "User",
        isActive: false,
      },
    ],
  },
  // Administracion
  {
    title: "Administracion",
    url: "/panel/administracion",
    icon: "Settings",
    isActive: false,
    shortcut: ["a", "a"],
    items: [
      //Usuarios
      {
        title: "Usuarios",
        url: "#",
        icon: "User",
        shortcut: ["u", "u"],
        isActive: false,
        items: [
          {
            title: "Usuarios",
            url: "/administracion/usuarios",
            icon: "User",
            shortcut: ["u", "u"],
          },
          {
            title: "Roles",
            shortcut: ["r", "r"],
            url: "/administracion/roles",
            icon: "User",
          },
          {
            title: "Permisos",
            shortcut: ["p", "p"],
            url: "/administracion/permisos",
            icon: "User",
          },
        ], // No child items
      },
      // Sucursales
      {
        title: "Sucursales",
        url: "/panel/sucursales",
        icon: "Store",
        shortcut: ["s", "s"],
        isActive: false,
        items: [], // No child items
      },
      // Pacientes
      {
        title: "Pacientes",
        url: "/panel/pacientes",
        icon: "User",
        shortcut: ["p", "p"],
        isActive: false,
      },
      // Productos
      {
        title: "Productos",
        url: "/panel/productos",
        icon: "Package",
        shortcut: ["p", "p"],
      },
      // Proveedores
      {
        title: "Proveedores",
        url: "/panel/proveedores",
        icon: "Users",
        shortcut: ["p", "p"],
      },
    ], // Empty array as there are no child items for Dashboard
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    image: "https://api.slingacademy.com/public/sample-users/1.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/2.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    image: "https://api.slingacademy.com/public/sample-users/3.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    image: "https://api.slingacademy.com/public/sample-users/4.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/5.png",
    initials: "SD",
  },
];
