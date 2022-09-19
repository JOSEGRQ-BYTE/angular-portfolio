export interface Skill 
{
    title: string,
    image: string,
    description: string
}
export const Skills: { [key: string]: Skill[] } = {
    'Frontend': [
        {
            title: 'Angular',
            image: 'angular.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'Bootstrap',
            image: 'bootstrap.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'CSS',
            image: 'css.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'HTML',
            image: 'html.svg',
            description: ''
        },
        {
            title: 'JavaScript/Typescript',
            image: 'typescript.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'JQuery',
            image: 'jquery.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ],
    'Backend': [
        {
            title: 'ASP.NET Core',
            image: 'dot-net.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'Entity Framework',
            image: 'ef.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'SQL',
            image: 'sql-server.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
        
    ],
    'Frameworks': [
        {
            title: 'Angular',
            image: 'angular.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'ASP.NET Core',
            image: 'dot-net.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Entity Framework',
            image: 'ef.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
        ,       
        {
            title: 'Express.js',
            image: 'express.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ],
    'Development': [
        {
            title: 'Visual Studio',
            image: 'visual-studio.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Visual Studio Code',
            image: 'visual-studio-code.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Microsoft SQL Server',
            image: 'sql-server.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Git',
            image: 'git.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ]
}