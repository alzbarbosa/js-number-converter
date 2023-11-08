// Constants for the UI elements
const errorElement = document.getElementById("error");
const outputElement = document.getElementById("output");
const formElement = document.getElementById("converter-form");
const inputElement = document.getElementById("inputValue");
const conversionTypeElement = document.getElementById("conversionType");

// Constants for number conversion
const regexBinary = /^[01]+$/;
const regexRomanNumbers =
  /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
const romanToDecimalMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

// convert a decimal number to roman number
function decimalToRoman(num) {
  let romanNumeral = "";

  const numerals = Object.keys(romanToDecimalMap).sort(
    (a, b) => romanToDecimalMap[b] - romanToDecimalMap[a]
  );

  numerals.forEach((numeral) => {
    while (num >= romanToDecimalMap[numeral]) {
      romanNumeral += numeral;
      num -= romanToDecimalMap[numeral];
    }
  });

  return romanNumeral;
}

// convert a roman number to decimal number
function romanToDecimal(roman) {
  let num = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const value = romanToDecimalMap[roman[i].toUpperCase()];
    if (!value) return NaN; // invalid Roman numeral

    if (value < prevValue) {
      num -= value;
    } else {
      num += value;
    }
    prevValue = value;
  }

  return num;
}

function decimalToBinary(number) {
  let binary = "";

  while (number > 0) {
    binary = (number % 2) + binary;
    number = Math.floor(number / 2);
  }

  return binary;
}

function binaryToDecimal(numberString) {
  let resultDecimalNumber = 0;

  for (let i = 0; i < numberString.length; i++) {
    resultDecimalNumber *= 2;
    resultDecimalNumber += parseInt(numberString[i], 10);
  }

  return resultDecimalNumber;
}

function clearMessages() {
  // Clear previous results and errors
  errorElement.textContent = "";
  outputElement.textContent = "";
}

function updateInputInfo(type, message) {
  inputElement.type = type;
  inputElement.placeholder = message;
}

function changeConverter(conversionType) {
  const conversionMap = {
    romanToDecimal: ["text", "Enter Roman Numeral..."],
    decimalToBinary: ["number", "Enter Number Here..."],
    binaryToDecimal: ["number", "Enter a Binary Number Here..."],
  };
  const [type, message] = conversionMap[conversionType] || [
    "number",
    "Enter Number Here...",
  ];
  updateInputInfo(type, message);
}

// Event listeners
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const conversionType = conversionTypeElement.value;
  const inputValue = inputElement.value.trim();

  try {
    let result;
    switch (conversionType) {
      case "decimalToRoman":
        const num = parseInt(inputValue, 10);
        if (isNaN(num) || num < 1 || num > 3999)
          throw new Error("Enter a number between 1 and 3999.");
        result = `${num} is equal to = ${decimalToRoman(num)}`;
        break;
      case "romanToDecimal":
        if (!regexRomanNumbers.test(inputValue))
          throw new Error("Enter a valid Roman Numeral.");
        result = `${inputValue} is equal to = ${romanToDecimal(inputValue)}`;
        break;
      case "decimalToBinary":
        const decimal = parseInt(inputValue, 10);
        if (isNaN(decimal)) throw new Error("Enter a valid decimal number");
        result = `${decimal} is equal to = ${decimalToBinary(decimal)}`;
        break;
      case "binaryToDecimal":
        if (!regexBinary.test(inputValue))
          throw new Error("Enter a valid binary number");
        result = `${inputValue} is equal to = ${binaryToDecimal(inputValue)}`;
        break;
      default:
        throw new Error("Invalid conversion type");
    }
    outputElement.textContent = result;
  } catch (e) {
    errorElement.textContent = e.message;
  }
});

// Event listener for the conversion type change
conversionTypeElement.addEventListener("change", (event) => {
  changeConverter(event.target.value);
  clearMessages();
});
