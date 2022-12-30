import { Component } from "@angular/core";
import { Project, Projects } from "../../data/projects";

@Component({
    selector: "app-about-author",
    templateUrl: "./about-author.component.html",
    styleUrls: ['./about-author.component.css'],
})
export class AboutAuthorComponent
{
    public projects: Project[];

    constructor()
    {
        this.projects = Projects;
    }
}