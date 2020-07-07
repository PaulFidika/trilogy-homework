// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

module.exports = class Manager extends Employee {
    constructor(input) {
        super(input);
        this.officeNumber = input.officeNumber;
        this.getRole = function () { return 'Manager'; };
        this.getOfficeNumber = function () { return this.officeNumber; };
    }
};