import { Component, Input } from "@angular/core";
import { Project } from "src/app/data/projects";

@Component({
    selector:"app-project-card",
    styleUrls: ["./project-card.component.css"],
    templateUrl: "./project-card.component.html"
})
export class ProjectCardComponent 
{
    private _projectInfo!: Project;
    @Input() 
    public set projectInfo(p:Project)
    {
        this._projectInfo = p;
    };
    public get projectInfo(): Project{
        return this._projectInfo;
    }

    constructor()
    {

    }

}