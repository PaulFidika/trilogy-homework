// Assignment Code
let generateBtn = document.querySelector("#generate");
let passwordText = document.querySelector("#password");

// gets user input for the password
function writePassword() {
  const settings = {
    lowerCase: false,
    upperCase: false,
    numeric: false,
    special: false
  };

  if (confirm("Do you want to include lower-case letters in your password?")) {
    settings.lowerCase = true;
  }
  if (confirm("Do you want to include upper-case letters in your password?")) {
    settings.upperCase = true;
  }
  if (confirm("Do you want to include numbers in your password?")) {
    settings.numeric = true;
  }
  if (confirm("Do you want to include special characters in your password?")) {
    settings.special = true;
  }

  // Check to make sure the user selected at least one character
  if ((!settings.lowerCase) && (!settings.upperCase) && (!settings.numeric) && (!settings.special)) {
    alert('You need to select at least one type of character!');
    return;
  }

  settings.passwordLength = parseInt(prompt("How long do you want your password to be? Must be 8 - 128", "8"), 10);
  if (Number.isNaN(settings.passwordLength)) {
    alert('You did not enter a valid number');
    return;
  }
  if ((settings.passwordLength < 8) || (settings.paswordLength > 128)) {
    alert('You must enter a number between 8 and 128');
    return;
  }

  passwordText.value = generatePassword(settings);
};


// Generates a random password. Accepts an object as its sole parameter
function generatePassword(settings) {
  let password = "";
  const characterList = [];

  if (settings.lowerCase) characterList.push(lowerCasedCharacters);
  if (settings.upperCase) characterList.push(upperCasedCharacters);
  if (settings.numeric) characterList.push(numericCharacters);
  if (settings.special) characterList.push(specialCharacters);
  let l = characterList.length;
  let j = 0;

  for (i = 0; i < settings.passwordLength; i++) {
    j = Math.floor(Math.random() * l); // select type of character
    k = Math.floor(Math.random() * characterList[j].length); // select a random character from that character list
    password = password + characterList[j][k]; // append the randomly selected character to the password
  }

  return password;
};


// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];
// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);