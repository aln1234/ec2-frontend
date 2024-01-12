## Description:

The final front-end task under the frontend module. The goal is to create an e-commerce website using REST API to test all the knowledge gained during the module. All requirements from the Integrify academy are described below.

The project is live at  [https://fs16-6-frontend-project-chi.vercel.app/](https://fs16-6-frontend-project-chi.vercel.app/).

# Name of the project:

Buy E-commerce website.

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

## Tech stack:

- HTML;
- CSS;
- React with Redux, React Router, Material UI, Axios;
- Typescript;
- REST API.
- Jest

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Analysis](#analysis)
  - [Requirements](#requirements)
  - [Features](#features)
- [Basic Functionality](#basic-functionality)
- [Architecture & Design](#architecture--design)
- [Pages](#pages)
- [Testing](#testing)
- [Deployment](#deployment)


## Getting Started
### Prerequisites
- React version: 18.2.0,
- React-router-dom: 6.16.0,
- Reduxjs/toolkit: 1.9.3,
- Axios:1.5.0
  
### Installation
Clone the GitHub repo

Starting the project.

Install all the dependencies
### `npm install`

In the project directory, you can install dependencies:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Analysis

### Requirements
<img src="public\assets\images\req.png" width="600" align="center"/>

### Features
<img src="public\assets\images\features.png" width="600" align="center"/>

## Basic Functionality
Here is all the basic functionality added to the web application
- [X]  Fetch and display all and single products.
- [X]  Create at least 4 pages (products, profile, user, cart)
- [X]  Product reducer
- [X]  User reducer 
- [X]  Cart reducer 
- [X]  Adding and removing from the cart 
- [X]  Login and authorization  (admins can delete and update products)  
- [X] Routing and private pages 
- [X]  Testing the reducers
- [X] Rewrite the README, deploy the project, add the deployment link here and to the README.md

**Bonus requirements**
- [ ] Context API 
- [X] Pagination when fetching and displaying.
- [X] Any performance optimization, remember to mention it ie useMemo, debounce, etc
- [X] Anything else you are proud to have added?


### Architecture & Design

The app follows a horizontal folder structure 

```
src
├── components
|  ├── Components
|  ├── Styles
|  ├── Api
|  ├── Hooks
|  ├── pages
|  ├── test
|  ├── types
|  └── redux
├── public
|  └── assets
|         └── images
├── README
└── package.json
```

## Pages
- Home page
- Page for all products
- Single product page
- Cart page
- About page
- User's profile page
- Error page
- Login
- Register

## Testing
Testing is done using React Testing Library and Jest.
All the functions written in the reducers are tested properly for all possible test cases.
Test cases are written for:
- User Reducer
- Credential Reducer
- Product Reducer
- Single Product Reducer
- Cart Reducer

## Deployment
Deployment is done using Vercel and the app is deployed at:
[https://fs16-6-frontend-project-chi.vercel.app/](https://fs16-6-frontend-project-chi.vercel.app/).


