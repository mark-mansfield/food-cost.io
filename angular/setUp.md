## install angular
1. create new angular project
cd into project directory

```
ng new [app-name]
ng new dorsal-angular
```

2.  Get predefined components
```
ng add @angular/material
```

3. bring up dev server ## no backend capabilities
```
ng serve -0
```

4.  Add node express backend

new folder called "backend" on root level

download express
```
npm install --save express
```

5. add server.js file to root level


6. cd into root level and download a tool to help with restarting the node server
 it watches our node.js files and of we change something it automatically restarts the server
```npm install --save-dev nodemon```

## IF not global install  register nodemon inside package.json
```
"start:server" : "nodemon server.js"
```

7. now run the node server with
```
npm run start:server
```

8. install node body parser - node express package used as a middlewaer allows access to the body of a request
```
npm install --save-dev body-parser
```


9. Start node server
```
node server.js
```

10. MULTER to extract incoming file on node js/ express install package
```
npm install --save multer
```


# Start Up
``` javascript
1. cd into project root

2. start angular

ng serve -o

3. wait till angular loads then run node server
npm run start:server
```

## DEVELOPING

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).