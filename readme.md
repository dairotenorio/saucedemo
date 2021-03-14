# Automation framework Wizeline front end TestCafe challenge exercises
    This document explains how to install and run the automation project.
    The goal of this automation project is to automate ui test with TestCafé.
 
 ## Initial set up
    Install node.js
    Installation of framework

## Versions
    It's recommended to use the versions listed below for the following packages to guarantee a correct functionality:
    - node version = 12.18.4
    - npm version  >= 6.14.5
    - testcafe >= 1.12.0
    - dotenv >= 8.2.0

## Clone and update
    Clone the repository on GIT: https://github.com/dairotenorio/saucedemo
    Update to the main branch and then run commands
 
**Install Dependencies**
    Install the dependencies (the node_modules) by running :
    `npm install`
    If you get vulnerability warnings, then run:
    `npm audit fix`

**Run the suite of tests**
    - For Mac: 		`npm run test-all-multi-browser-mac`
                    `npm run test-all-chrome-mac`		
    - For Windows: 	`npm run test-all-multi-browser-win`
                    `npm run test-all-chrome-win`