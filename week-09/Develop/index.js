const fs = require('fs')
const inquirer = require('inquirer')

const questions = [
    {
        name: 'title',
        message: 'What is the title of your new project?',
        default: 'Hello World'
    },
    {
        name: 'description',
        message: 'Type a brief description of your project:',
        default: "This program prints 'hello world' to the command line."
    },
    {
        name: 'installation',
        message: 'Briefly write up the installation instructions for a new user on this project:',
        default: "No installation required."
    },
    {
        name: 'usage',
        message: 'Briefly write up the usage instructions for first-time users:',
        default: "Run 'node index.js' in your command line to run this project."
    },
    {
        name: 'contributors',
        message: 'Enter in the GitHub url of the primary contributor:',
        default: "https://github.com/paulfidika"
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license are you distributing this software under?',
        choices: ['Apache', 'BSD', 'MIT', 'GDL', 'Proprietary'],
        default: 'MIT'
    }
];

function writeToFile(fileName, data) {
    let text = "# " + data.title + "\n \n" + "## Description \n \n" + data.description + "\n \n## Installation \n \n" + data.installation + "\n \n## Usage \n \n" + data.usage + "\n \n## Contributors: \n \n" + 'Visit me at : ' + data.contributors + "\n \n" + "## Distribution License \n \n Distributed under " + data.license + ' license.';

    fs.writeFile(fileName,
        text,
        function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
}

function init() {
    console.log("Hey there! We're going to walk you through the process of creating a new ReadMe file for your current project.")

    inquirer
        .prompt(questions)
        .then(answers => {
            // console.info('Answers:', answers);
            writeToFile('ReadMe.md', answers);
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log("Error: Prompt couldn't be rendered in the current environment")
            } else {
                console.log('Unknown Error')
            }
        });
}

init();
