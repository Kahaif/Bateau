# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Structure and components

The main components are : 

- SignInComponent
- SignUpComponent
- ShipsGridComponent

A module called `FormModule` has been created and is used by the `Sign*Component`.

All components related to ships are in the `ships` folder. The update, creation and readonly forms are implemented using a `mat-dialog` in `/src/app/ships/ships-dialog`.

## Unit and integration tests

Some tests have been written. They can be executed using `ng test`. They mainly tests the session state handling mechanisms.

## API Generation

The DTOs and apis services in `src/api` have been generated using `ng-openapi-gen`.
