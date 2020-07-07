const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Can set office number via constructor argument", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    officeNumber: 100
  };
  const e = new Manager(id);
  expect(e.officeNumber).toBe(id.officeNumber);
});

test('getRole() should return "Manager"', () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
  };
  const testValue = "Manager";
  const e = new Manager(id);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    officeNumber: 100
  };
  const testValue = 100;
  const e = new Manager(id);
  expect(e.getOfficeNumber()).toBe(id.officeNumber);
});
