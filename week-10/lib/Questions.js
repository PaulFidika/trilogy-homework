// This is a list of all the questions that will be asked int he prompts

module.exports = {
    mainMenu: [
        {
            type: "list",
            name: "employeeType",
            message: "What type of employee would you like to add?",
            choices: [
                { name: "Manager", value: 0 },
                { name: "Engineer", value: 1 },
                { name: "Intern", value: 2 },
                { name: "None - finish and exit", value: 3 }]
        }
    ],
    manager: [
        {
            type: "input",
            name: "name",
            message: "What is the Manager's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's e-mail address?"
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is the Manager's office number?"
        }
    ],
    engineer: [
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's e-mail address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's Github url?"
        }
    ],
    intern: [
        {
            type: "input",
            name: "name",
            message: "What is the Intern's Name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's e-mail address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the Intern's school name?"
        }
    ]
};