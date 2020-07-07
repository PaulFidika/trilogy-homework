const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof (e)).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const id = {
    name: "Alice"
  };
  const e = new Employee(id);
  expect(e.name).toBe(id.name);
});

test("Can set id via constructor argument", () => {
  const id = {
    name: "Foo",
    id: 100
  };
  const e = new Employee(id);
  expect(e.id).toBe(id.id);
});

test("Can set email via constructor argument", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com"
  };
  const e = new Employee(id);
  expect(e.email).toBe(id.email);
});

test("Can get name via getName()", () => {
  const id = {
    name: "Alice"
  };
  const e = new Employee(id);
  expect(e.getName()).toBe(id.name);
});

test("Can get id via getId()", () => {
  const id = {
    name: "Foo",
    id: 100
  };
  const e = new Employee(id);
  expect(e.getId()).toBe(id.id);
});

test("Can get email via getEmail()", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com"
  };
  const e = new Employee(id);
  expect(e.getEmail()).toBe(id.email);
});

test("getRole() should return \"Employee\"", () => {
  const id = {
    name: "Alice",
    id: 1,
    email: "test@test.com"
  };
  const testValue = "Employee";
  const e = new Employee(id);
  expect(e.getRole()).toBe(testValue);
});
