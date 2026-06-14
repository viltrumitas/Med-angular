import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Auth } from "./features/auth/auth";

export const routes: Routes = [
	{ path: "", component: Home },
	{ path: "auth", component: Auth },
	{ path: "**", redirectTo: "" },
];
