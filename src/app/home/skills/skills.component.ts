import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Skill } from "src/app/data/skills";
import { Skills } from "src/app/data/skills";

@Component({
    selector: "app-skills",
    styleUrls: ["./skills.component.css"],
    templateUrl: "./skills.component.html"
})
export class SkillsComponent implements OnInit
{

    public mySkills$: Observable<Skill[]>;

    constructor()
    {
        this.mySkills$ = of(Skills['Frontend']);
    }

    ngOnInit() 
    {
        document.getElementById('frontend-skill')?.classList.add('active');
    }

    onFilter(event: MouseEvent)
    {
        event.preventDefault();
        const anchorLink: HTMLAnchorElement = event.target as HTMLAnchorElement;

        // Remove active class from links
        const links = document.querySelectorAll('a[name="filter"]');
        links.forEach(link => link.classList.remove('active'));

        // Set as active current selected
        anchorLink.classList.add('active');

        this.mySkills$ = of(Skills[anchorLink.dataset['value'] as string]);
    }
}