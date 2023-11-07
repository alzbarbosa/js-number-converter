// Map of important roman numbers to decimal
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

function decimalToRoman(num) {
  let romanNumeral = "";

  if (isNaN(num)) {
    return romanNumeral;
  }

  const numerals = Object.keys(romanToDecimalMap).sort(
    (a, b) => romanToDecimalMap[b] - romanToDecimalMap[a]
  );
  console.log(numerals);

  numerals.forEach((numeral) => {
    while (num >= romanToDecimalMap[numeral]) {
      romanNumeral += numeral;
      num -= romanToDecimalMap[numeral];
    }
  });

  return romanNumeral;
}

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

// Event listener for the form submission.
document
  .getElementById("converter-form")
  .addEventListener("submit", function (event) {
    // Prevent the form from submitting the traditional way.
    event.preventDefault();

    const conversionType = document.getElementById("conversionType").value;
    const inputValue = document.getElementById("inputValue").value.trim();

    let result;
    let error = "";

    if (conversionType === "decimalToRoman") {
      const num = parseInt(inputValue, 10);
      if (isNaN(num) || num < 1 || num > 3999) {
        error = "Enter a number between 1 and 3999.";
      } else {
        result = `Roman Numeral: ${decimalToRoman(num)}`;
      }
    } else {
      if (
        !/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
          inputValue
        )
      ) {
        error = "Enter a valid Roman Numeral.";
      }
      const num = romanToDecimal(inputValue);
      if (isNaN(num)) {
        error = "Enter a valid Roman Numeral.";
      } else {
        result = `Decimal Number: ${num}`;
      }
    }

    document.getElementById("error").textContent = error;
    if (!error) {
      document.getElementById("output").textContent = result;
    }
  });

// Event listener for the conversion type change
document
  .getElementById("conversionType")
  .addEventListener("change", function () {
    const conversionType = this.value;
    const inputValue = document.getElementById("inputValue");

    if (conversionType === "romanToDecimal") {
      inputValue.placeholder = "Enter Roman Numeral...";
      inputValue.type = "text";
    } else {
      inputValue.placeholder = "Enter Number Here...";
      inputValue.type = "number";
    }

    // Clear previous results and errors
    document.getElementById("error").textContent = "";
    document.getElementById("output").textContent = "";
  });
