import { Component, Input } from "@angular/core";

@Component({
    selector: "app-wave-divider",
    styleUrls: ["./wave-divider.component.css"],
    templateUrl: "./wave-divider.component.html"
})
export class WaveDividerComponent
{
    @Input() color = '';

}