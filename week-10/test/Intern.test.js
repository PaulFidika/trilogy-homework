const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    school: "UCLA"
  };
  const e = new Intern(id);
  expect(e.school).toBe(id.school);
});

test("getRole() should return \"Intern\"", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com"
  };
  const testValue = "Intern";
  const e = new Intern(id);
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    school: "UCLA"
  };
  const e = new Intern(id);
  expect(e.getSchool()).toBe(id.school);
});
