const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    github: "GitHubUser"
  }
  const e = new Engineer(id);
  expect(e.github).toBe(id.github);
});

test("getRole() should return \"Engineer\"", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    github: "GitHubUser"
  };
  const testValue = "Engineer";
  const e = new Engineer(id);
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const id = {
    name: "Foo",
    id: 1,
    email: "test@test.com",
    github: "GitHubUser"
  };
  const e = new Engineer(id);
  expect(e.getGithub()).toBe(id.github);
});
