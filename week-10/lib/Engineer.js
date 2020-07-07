// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

module.exports = class Engineer extends Employee {
    constructor(input) {
        super(input);
        this.github = input.github;
        this.getGithub = function () { return this.github; }
        this.getRole = function () { return 'Engineer'; }
    }
};