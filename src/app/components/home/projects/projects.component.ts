import { Component } from "@angular/core";
import { Project, Projects } from '../../../data/projects';
@Component({
    selector:"app-projects",
    styleUrls: ["./projects.component.css"],
    templateUrl: "./projects.component.html"
})
export class ProjectsComponent 
{
    public projects: Project[];

    constructor()
    {
        this.projects = Projects;
    }
}