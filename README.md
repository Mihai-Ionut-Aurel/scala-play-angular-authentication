[![MIT License][license-badge]][LICENSE]

# scala-play-angular-silhouette-seed
#Work in Progress
Based on several other seeds I am working on implementing a seed for latest version of PlayFramework and Angular.

What this seed has in addition is JWT authentication with Silhouette and a nice design with Clarity Framework. User data is store in a MongoDB.

I have left the read me details from the other seeds I used as inspiration.

#Seeds that have inspired this one:

> scala-play-angular-seed project illustrates how Play Framework can be used to develop backend/services along with Angular to develop the front-end/ui.

## Used Versions

* [Play Framework: 2.6.7](https://www.playframework.com/documentation/2.6.x/Home)
* [Angular: 5.0.0](https://angular.io/)
* [Angular CLI: 1.5.0](https://cli.angular.io/)

## How to use it? 

### Prerequisites

* This assumes that you have [npm](https://npmjs.org/) installed.

### Let's get started,

* Clone the application and open application as a sbt project.

* This application is not using any of the scala play views and all the views are served by the [Angular](https://angular.io/) code base which is inside the `ui` folder.

* Used any of the sbt commands listed in the below according to the requirement which are working fine with this application.(To see more details of [sbt](http://www.scala-sbt.org/))

``` 
    sbt clean           # Clear existing build files
    
    sbt stage           # Build your application from your project’s source directory
    
    sbt run             # Run both backend and frontend builds in watch mode
    
    sbt dist            # Build both backend and frontend sources into a single distribution
    
    sbt test            # Run both backend and frontend unit tests 
```  

## Complete Directory Layout

```
├── /app/                       # The backend (scala) application sources (controllers, models, views, assets)
├── /conf/                      # Configurations files and other non-compiled resources (on classpath)
│     ├── application.conf      # Builds the project from source to output(lib and bower) folder
│     ├── logback.xml           # Logging configuration
│     └── routes                # Routes definition
├── /logs/                      # Logs folder
│     └── application.log       # Default log file
├── /project/                   # Sbt configuration files
│     ├── AngularBuild.scala    # PlayRunHook file to trigger angular serve with sbt run
│     ├── build.properties      # Marker for sbt project
│     └── plugins.sbt           # Sbt plugins declaration
├── /public/                    # Public assets
│     └── /ui/                  # Frontend build assests
├── /target/                    # Generated stuff
│     ├── /universal/           # Application packaging
│     └── /web/                 # Compiled web assets
├── /test/                      # Contains unit tests for scala play sources
├── /ui/                        # Angular front end sources
│     ├── /e2e/                 # End to end tests folder
│     ├── /node_modules/        # 3rd-party frontend libraries and utilities
│     ├── /src/                 # The frontend source code (modules, componensts, models, directives, services etc.) of the application
│     ├── .angular-cli.json     # Builds the project from source to output(lib and bower) folder
│     ├── .editorconfig         # Define and maintain consistent coding styles between different editors and IDEs
│     ├── .gitignore            # Contains ui files to be ignored when pushing to git
│     ├── karma.conf.js         # Karma configuration file
│     ├── package.json          # Holds various metadata configuration relevant to the ui
│     ├── protractor.conf.js    # Protractor configuration file
│     ├── proxy.conf.json       # UI proxy configuration
│     ├── README.md             # Contains all user guide details for the ui
│     ├── tsconfig.json         # Contains typescript compiler options
│     └── tslint.json           # Lint rules for the ui
├── .gitignore                  # Contains files to be ignored when pushing to git
├── build.sbt                   # Play application build script
├── LICENSE                     # Contains License Agreement file
├── README.md                   # Contains all user guide details for the application
└── ui-build.sbt                # UI build scripts
```

## What is new in here?

### AngularBuild.scala

* Represents PlayRunHook scala implementation to trigger angular serve with sbt run command.

```
    ├── /project/
    │     ├── AngularBuild.scala
```

### ui-build.sbt

* `ui-build.sbt` file to represent UI builds scrips implementations to run along with the available sbt commands.
* This file is located in the root level of the project to work smoothly with the `build.sbt` file.

### npm run commands

* Added several new npm run commands in the `scripts` section of the package.json file in order to work smoothly with the sbt commands.
* Check [UI README.md](./ui/README.md) to see the available front end build tasks.

```
├── /ui/
│     ├── package.json
```

### proxy.conf.json

* Contains proxy configurations required to run application in watch mode along with both `Scala` and `Angular` builds.

```
├── /ui/
│     ├── proxy.conf.json
```

## Routes

```
├── /conf/      
│     ├── routes 
```

* The following route configuration allows to map front end index.html to index route. This should be placed as the first route in this file.

```
GET        /             controllers.Assets.at(path="/public/ui", file="index.html")
```

**Note: _On production build all the front end Angular build artifacts will be copied to the `public/ui` folder._**



## License

This software is licensed under the MIT license

#Kudos

[silhouette-play-react-seed]: https://github.com/setusoft/silhouette-play-react-seed

[JWT-Authentication]: https://github.com/cornflourblue/angular2-jwt-authentication-example

[Angular-Play-Seed]: https://github.com/yohangz/scala-play-angular-seed

[play-silhouette-reactivemongo-seed]: https://github.com/ezzahraoui/play-silhouette-reactivemongo-seed