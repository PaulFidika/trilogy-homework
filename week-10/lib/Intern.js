// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

module.exports = class Intern extends Employee {
    constructor(input) {
        super(input);
        this.school = input.school;
        this.getSchool = function () { return this.school; }
        this.getRole = function () { return 'Intern'; }
    }
};