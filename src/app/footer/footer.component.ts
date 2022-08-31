import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-footer",
    styleUrls: ["./footer.component.css"],
    templateUrl: "./footer.component.html"
})
export class FooterComponent
{
    constructor(public router: Router)
    {

    }
}