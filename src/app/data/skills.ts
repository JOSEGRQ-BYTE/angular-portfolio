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
            description: 'In Angular I have had the opportunity to work with many of its advanced techniques such as directives (), pipes, interceptors, services, observables, reactive forms, managing subscriptions, injectables (dependency injection), and become familiar with the component lifecycle.'
        },
        {
            title: 'Bootstrap',
            image: 'bootstrap.svg',
            description: 'I have used Bootstrap in man projects because it is easy to use and powerful for building responsive web applications. I am familiar with its grid system, variety of components, helper classes, utility classes and comfortable dealing with responsive media content. Also, expertice with expressive forms through the use of validators.'
        },
        {
            title: 'CSS',
            image: 'css.svg',
            description: 'My experience with CSS ranges from applying simple typography style changes to creating complex responsive web applications. I have contributed to implementing complex components (including but not limited to dropdowns, navigation bars, cards, and reactive forms)'
        },
        {
            title: 'HTML',
            image: 'html.svg',
            description: 'I make use of HTML to control how the information on a web page is properly structured, while making best decisions for SEO (Search Engine Optimization). Anything from optimizing links to recent and reliable information to keeping web forms neat, clear, organized and uncluttered.'
        },
        {
            title: 'JavaScript/Typescript',
            image: 'typescript.svg',
            description: 'JavaScript along with Typescript can help the development process a long way with DOM manipulation. Some of the techniques I have touched on include event listeners, dynamically updating/controlling content, building components, and asynchronous operations. I have experience working with the powerful type system Typescript bring to the table with generics, interfaces, inheritance, type guards, and union types.'
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
            description: "I've built web APIs and web UI using ASP.NET Core MVC framework. I've worked with razor pages, used and stablished asynchronous programming patterns, and made use of dependecy injection for logging service, database context, repositories, among other things. I have experience working with more advanced topics such as action filters for caching, error handling, authorization, or custom logic, application health checks, and building custom middleware."
        },
        {
            title: 'Entity Framework',
            image: 'ef.svg',
            description: 'I have extensive experience working with EF including intial configuration to application, configuring the EF model through use of data annotation attributes, writing LINQ (Language Integrated Language) queries to retrieve the data from the database, implementing UOW (Unit of Work) with generic repositories and interfaces, to data migrations both code first approach and db first approach.'
        },
        {
            title: 'SQL',
            image: 'sql-server.svg',
            description: "My experince with SQL has been very hands on from creating my own queries to building views. I've designed, implemented, and executed CTEs(Common Table Expressions), stored procedures, functions, views, user defined types, and helped with query optimization. I am familiar with system defined functions, data manipulation, transactions (TCL), data definitions, and expressions."
        },       
        {
            title: 'Express.js',
            image: 'express.svg',
            description: "I've designed and built web applications using server side rendering and web APIs following the MVC architecture. I've managed routing, sessions, HTTP requests, error handling, custom middleware, among other things."
        }
        
    ],
    'Frameworks': [
        {
            title: 'Angular',
            image: 'angular.svg',
            description: 'In Angular I have had the opportunity to work with many of its advanced techniques such as directives (), pipes, interceptors, services, observables, reactive forms, managing subscriptions, injectables (dependency injection), and become familiar with the component lifecycle.'
        },
        {
            title: 'ASP.NET Core',
            image: 'dot-net.svg',
            description: "I've built web APIs and web UI using ASP.NET Core MVC framework. I've worked with razor pages, used and stablished asynchronous programming patterns, and made use of dependecy injection for logging service, database context, repositories, among other things. I have experience working with more advanced topics such as action filters for caching, error handling, authorization, or custom logic, application health checks, and building custom middleware."
        },
        {
            title: 'Bootstrap',
            image: 'bootstrap.svg',
            description: 'I have used Bootstrap in man projects because it is easy to use and powerful for building responsive web applications. I am familiar with its grid system, variety of components, helper classes, utility classes and comfortable dealing with responsive media content. Also, expertice with expressive forms through the use of validators.'
        },    
        {
            title: 'Entity Framework',
            image: 'ef.svg',
            description: 'I have extensive experience working with EF including intial configuration to application, configuring the EF model through use of data annotation attributes, writing LINQ (Language Integrated Language) queries to retrieve the data from the database, implementing UOW (Unit of Work) with generic repositories and interfaces, to data migrations both code first approach and db first approach.'
        },       
        {
            title: 'Express.js',
            image: 'express.svg',
            description: "I've designed and built web applications using server side rendering and web APIs following the MVC architecture. I've managed routing, sessions, HTTP requests, error handling, custom middleware, among other things. I've used its templating engine to build dynamic content on the web by creating HTML templates on the server."
        }
    ],
    'Development': [
        {
            title: 'Visual Studio',
            image: 'visual-studio.svg',
            description: "With debugging being a crucial part of the development process I've picked up a few helpful tools such as using effective break points, hot reloads for faster development, using windows such as Autos window for viewing values from functions, working with source control directly from IDE for managing local and remote branches, and modifying variables during debug session."
        },        
        {
            title: 'Visual Studio Code',
            image: 'visual-studio-code.svg',
            description: "I've gotten customed to using VS Code extensive list of extensions to improve my development flow, used git integration source control management for committing/pulling/pushing and branch manipulations, working with the CLI, making use of split views, and changing language mode"
        },        
        {
            title: 'Microsoft SQL Server',
            image: 'sql-server.svg',
            description: "Made use of MS SQL Server to manage tables, indices, stored procedures, views, functions, user defined data types and query execution of type Data Definition Language (DDL), Data Manipulation Language (DML), Data Control Language(DCL), Transaction Control Language(TCL), and Data Query Language (DQL)."
        },        
        {
            title: 'Git',
            image: 'git.svg',
            description: "I've become comfortable on executing Git commands (including but not limited to config, init, clone, status, add, commit, push, branch, checkout, merge, pull)."
        }
    ]
}