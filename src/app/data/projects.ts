export interface Project 
{
    title: string,
    image: string,
    description: string,
    techStack: string[],
    link: string
}
export const Projects: Project[] = [
    {
        title: 'Personal Portfolio',
        image: 'assets/svg/angular.svg',
        description: 'This is a single page web application supported by Angular, .NET Core, and SQL. It is a site that provides professional/personal information about me, the skills and knowledge I bring to the table, and how to contact me in case of any collaboration. Essentially, this is my digital business card and an opportunity to reach more people with my work. Under the “Contact Author” tab users can write a message which will then be sent to me via email. It is also a personal workout tracker as it is integrated with a web API capable of authorizing me as a user to track/manage my results.',
        techStack: ['Angular', '.NET Core', 'SQL'],
        link: 'https://github.com/JOSEGRQ-BYTE/angular-portfolio'
    },
    {
        title: 'WOD CrossFit',
        image: 'assets/svg/dot-net.svg',
        description: "I've designed and developed this ASP.NET Web API as an ideal platform for me to capture my CrossFit WOD (Workout of the Day) workouts. The RESTful services allow me to manage any past results as well as enter new ones. Because this API has been integrated with my personal portfolio, I’ve added a layer of security for me to be able to login as an administrator for adding, deleting, or editing my results. General users however can see my results by navigating to the WOD tab under CrossFit. This API has been integrated with EF and SQL and has health checks for validating DB connection.",
        techStack: ['.NET Core', 'SQL'],
        link: 'https://github.com/JOSEGRQ-BYTE/CrossFitWOD'
    },
    {
        title: 'Web Scrapper',
        image: 'assets/svg/node.svg',
        description: 'This web scraper makes use of the vast amount of publicly available web data for job seekers to make smarter decisions. It collects the list of the top 500 companies, automatically includes the top 10 and looks for those that are of interest like tech companies. It then goes to Indeed and fetches jobs of interest to later convert this list into an Excel file which gets sent to your email. This web scrapper is set scheduled to run every day for you not to let an opportunity pass by! ',
        techStack: ['Node.js', 'Express', 'SQL'],
        link: ''
    }
]