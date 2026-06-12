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

	@Input() controlType:
		| "text"
		| "checkbox"
		| "email"
		| "password"
		| "textarea" = "text";
	@Input() autoCompleteAttr: string = "off";
	@Input() rows: number = 4;
}
