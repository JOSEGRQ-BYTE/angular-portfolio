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
            image: 'src/assets/svg/angular.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'Bootstrap',
            image: 'src/assets/svg/bootstrap.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'CSS',
            image: 'src/assets/svg/css.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'HTML',
            image: 'src/assets/svg/html.svg',
            description: ''
        },
        {
            title: 'JavaScript/Typescript',
            image: 'src/assets/svg/typescript.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'JQuery',
            image: 'src/assets/svg/jquery.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ],
    'Backend': [
        {
            title: 'ASP.NET Core',
            image: 'src/assets/svg/dot-net.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'Entity Framework',
            image: 'src/assets/svg/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'SQL',
            image: 'src/assets/svg/sql-server',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
        
    ],
    'Frameworks': [
        {
            title: 'Angular',
            image: 'src/assets/svg/angular.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },
        {
            title: 'ASP.NET Core',
            image: 'src/assets/svg/dot-net.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Entity Framework',
            image: 'src/assets/svg/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
        ,       
        {
            title: 'Express.js',
            image: 'src/assets/svg/express.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ],
    'Development': [
        {
            title: 'Visual Studio',
            image: 'src/assets/svg/visual-studio.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Visual Studio Code',
            image: 'src/assets/svg/visual-studio-code.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Microsoft SQL Server',
            image: 'src/assets/svg/sql-server.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        },        
        {
            title: 'Git',
            image: 'src/assets/svg/git.svg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper a lacus vestibulum sed arcu. Eros donec ac odio tempor.'
        }
    ]
}