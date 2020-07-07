// TODO: Write code to define and export the Employee class

module.exports = class Employee {
    constructor(input) {
        if (!input) input = {}; // catch null instantiations
        this.name = input.name;
        this.id = input.id;
        this.email = input.email;

        this.getName = function () { return this.name; };
        this.getId = function () { return this.id; };
        this.getEmail = function () { return this.email; };
        this.getRole = function () { return 'Employee'; };
    }
}

//   * name
//     * id
//     * email
//     * getName()
//     * getId()
//     * getEmail()
//     * getRole() // Returns 'Employee'