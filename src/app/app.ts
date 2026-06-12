import { Component, signal } from "@angular/core";
import { Login } from "./features/login/login";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [Login],
	templateUrl: "./app.html",
	styleUrl: "./app.scss",
})
export class App {
	protected readonly title = signal("Med-angular");
}
