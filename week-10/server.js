// to do:
// 2. create output html file

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/Questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = []; // this is a list of all employees at the organization


function mainMenu() {
    inquirer
        .prompt(questions.mainMenu)
        .then(answers => {
            // Figure out which response was chosen, and select the appropriate class
            switch (answers.employeeType) {
                case 0:
                    askQuestions(questions.manager, Manager);
                    break;
                case 1:
                    askQuestions(questions.engineer, Engineer);
                    break;
                case 2:
                    askQuestions(questions.intern, Intern);
                    break;
                case 3:
                    createOutput(employeeList);
                    break;
                default:
                    console.log('error');
                    break;
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}


function askQuestions(questions, Class) {
    inquirer
        .prompt(questions)
        .then(answers => {
            answers.id = employeeList.length;
            let employee = new Class(answers);
            employeeList.push(employee);

            mainMenu();
        })
        .catch(error => {

        });
};

function createOutput(list) {
    console.log('Creating an html file for you, please wait...');
    const html = render(list);

    // check to see if the output folder exists or not
    if (!fs.existsSync('./output')) {
        fs.mkdirSync('./output');
    }

    // deal with multiple old output files
    fs.readdir('./output', {}, (err, files) => {
        if (err) return console.log('Unable to scan directory: ' + err);
        let num = 0;

        files.forEach((file) => {
            if (file === `teamList${num}.html`) num += 1;
        });

        fs.writeFile(`./output/teamList${num}.html`, html, (err) => {
            if (err) console.log('unable to write to directory: ' + err);
            console.log('File exported!');
        });
    });
};

// begin the application 
mainMenu();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
