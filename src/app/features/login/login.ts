import { Component } from "@angular/core";
import { InputComponent } from "../../shared/components/input/input";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [InputComponent],
	templateUrl: "./login.html",
	styleUrl: "./login.scss",
})
export class Login {}
