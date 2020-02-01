"use strict";

let baseVars = (function () {
  function Color(str, hex) {
    this.stringValue = str;
    this.hexValue = hex;
  }

  let colors = (function (stringValues, hexValues) {
    let colorsArr = [];
    for (let i = 0; i < stringValues.length; i++) {
      let newColor = new Color(stringValues[i], hexValues[i]);
      colorsArr.push(newColor);
    }
    return colorsArr;
  })(['blue', 'cyan', 'gold', 'gray', 'green', 'magenta', 'orange', 'red', 'white', 'yellow'], ['1157F4', '11F4E7', 'E8DC25', 'D0CFC7', '18ED03', 'ED037A', 'EDB903', 'ED3303', 'FFFFFF', 'FFFC00']);

  // console.log(colors);

  let strL = colors.length;

  return {
    getUserNumColor: function (userInput) {
      let userNumColor;
      for (let i = 0; i < strL; i++) {
        if (colors[i].stringValue == userInput) {
          userNumColor = i;
          break;
        } else {
          userNumColor = -1;
        }
      }
      return userNumColor;
    },
    getPcNumColor: function () {
      return Math.floor(Math.random() * strL);
    },
    colorBg: function (colorNum) {
      document.querySelector("body").style.backgroundColor = "#" + (colors[colorNum]).hexValue;
    }
  }

})();

let promptNow = (function (genericVal) {
  return {
    promptUser: function () {
      return prompt(genericVal);
    },
    setPrompt: function (newVal) {
      genericVal = newVal;
    },
    alertUser: function (val) {
      return alert(val);
    }
  }
})('Javascript\n\nI am thinking of one of these colors:\n\nblue, cyan, gold, gray, green, magenta, orange, red, white, yellow\n\nWhat color am I thinking of?');

let pcNum = baseVars.getPcNumColor();
let boolVal = false;
let counter = 0;

while (boolVal != true) {
  boolVal = analyzeGuess(baseVars.getUserNumColor(promptNow.promptUser()));
}



function analyzeGuess(userInput) {
  if (userInput < pcNum) {
    retry("Javascript Alert\n\nSorry,your guess is not correct!\n\nHint:your color is alphabetically lower than mine.\n\nPlease try again.");
    return false;
  } else if (userInput == pcNum) {
    baseVars.colorBg(pcNum);
    promptNow.alertUser("Javascript Alert\n\nCongratulations! You have guessed the color!\n\nIt took you " + counter + " guesses to finish the game!\n\nYou can see the colour in the background");
    return true;
  } else if (userInput > pcNum) {
    retry("Javascript Alert\n\nSorry,your guess is not correct!\n\nHint:your color is alphabetically higher than mine.\n\nPlease try again.");
    return false;
  } else if (userInput == -1) {
    retry("Javascript Alert\n\nSorry,I don't recognize your color.\n\nPlease try again.");
    return false;
  }
}

function retry(message) {
  promptNow.alertUser(message);
  counter++;
}