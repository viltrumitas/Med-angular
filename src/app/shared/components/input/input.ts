import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-input",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./input.html",
	styleUrl: "./input.scss",
})
export class InputComponent {
	@Input() id!: string;
	@Input() labelText!: string;
	@Input() placeHolderText: string = "";
	@Input() name: string = "";
	@Input() required: boolean = false;

	@Input() variant: "primary" | "login" | "general" = "primary";

	@Input() controlType:
		| "text"
		| "checkbox"
		| "number"
		| "email"
		| "password"
		| "textarea" = "text";
	@Input() autoCompleteAttr: string = "off";
	@Input() rows: number = 4;
}
