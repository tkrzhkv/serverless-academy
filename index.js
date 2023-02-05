const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForInput = () => {
  readline.question("Enter some words or numbers separated by a space: ", (input) => {
    const data = input.split(" ");

    readline.question(
      "What would you like to see in the output?\n1. Sort words alphabetically\n2. Show numbers from lesser to greater\n3. Show numbers from bigger to smaller\n4. Display words in ascending order by number of letters in the word\n5. Show only unique words\n6. Display only unique values from the set of words and numbers entered by the user\nEnter the number of the option: ",
      (option) => {
        if (option === "exit") {
          readline.close();
        } else {
          console.log(sortData(data, Number(option)));
          askForInput();
        }
      }
    );
  });
};

const sortWordsAlphabetically = (words) => words.sort();

const sortNumbersAscending = (numbers) => numbers.sort((a, b) => a - b);

const sortNumbersDescending = (numbers) => numbers.sort((a, b) => b - a);

const sortWordsByLength = (words) => words.sort((a, b) => a.length - b.length);

const getUniqueWords = (words) => [...new Set(words)];

const getUniqueValues = (values) => [...new Set(values)];

const sortData = (data, option) => {
  const words = data.filter((value) => isNaN(value));
  const numbers = data.filter((value) => !isNaN(value)).map((value) => Number(value));

  switch (option) {
    case 1:
      return sortWordsAlphabetically(words);
    case 2:
      return sortNumbersAscending(numbers);
    case 3:
      return sortNumbersDescending(numbers);
    case 4:
      return sortWordsByLength(words);
    case 5:
      return getUniqueWords(words);
    case 6:
      return getUniqueValues(data);
    default:
      return data;
  }
};

askForInput();
