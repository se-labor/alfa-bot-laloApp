# Alfabot

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.14.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
If folders *Android* and *iOS* do not exist or have to be rebuild, first run `npm run build` to create a *dist*-folder. Then use following commands: `npx cap add android` and  `npx cap add ios`

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `npm run build-mobile` to build mobile versions of the app. The build artifacts will be stored in the `dist/`, `ios/` and `android/` directory.

Generate App-Icons with `Capacitor Assets`, see [Github](https://github.com/ionic-team/capacitor-assets). Expects installation with `npm install @capacitor/assets`, an *assets*-folder in
root-directory and files *logo.png, logo-dark.png*.

Build command: `npx capacitor-assets generate --iconBackgroundColor '#196084' --iconBackgroundColorDark '#196084' --splashBackgroundColor '#196084' --splashBackgroundColorDark '#196084'`

## Opening iOS Project

run `npx cap open ios` or open ios/App/App.xworkspace - Needs Xcode installed

## Running iOS Project

run via terminal using `npx cap run ios` or open Xcode, select device and start.

## Opening Android Project

run `npx cap open android` or open Android Studio and import `android/` directory as an Android Studio project

## Running Android Project

run via terminal using `npx cap run android` or open Android Studio, select device and start.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
