import { Component } from "@angular/core";
import { Navbar } from "../../shared/components/navbar/navbar";
import { RouterLink } from "@angular/router";
import { Hero } from "../components/hero/hero";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [Navbar, RouterLink, Hero],
	templateUrl: "./home.html",
	styleUrl: "./home.scss",
})
export class Home {}
