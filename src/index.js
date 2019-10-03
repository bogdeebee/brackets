module.exports = function check(str, bracketsConfig) {
  // your solution
  const bracketsStack = [];
  const bracketsArr = str.split('');

  if (bracketsArr.length % 2) {
    return false;
  }

  for (let i = 0; i < bracketsArr.length; i++) {
    const indexOfSubArrayOpeningBracket = getIndexOfSubArrayBySymbol(bracketsArr[i], bracketsConfig, 0);
    
    if (hasConfigPairedElement(bracketsArr[i], bracketsConfig)) {
      if (bracketsStack[bracketsStack.length - 1] === indexOfSubArrayOpeningBracket) {
        bracketsStack.pop();
        continue;
      }
      bracketsStack.push(indexOfSubArrayOpeningBracket);
      continue;
    }

    if (indexOfSubArrayOpeningBracket >= 0) {
      bracketsStack.push(indexOfSubArrayOpeningBracket);
      continue;
    } 
    
    const indexOfSubArrayClosingBracket = getIndexOfSubArrayBySymbol(bracketsArr[i], bracketsConfig, 1);

    if (bracketsStack[bracketsStack.length - 1] === indexOfSubArrayClosingBracket) {
      bracketsStack.pop();
      continue;
    } 

    return false;
  }

  if (bracketsStack.length === 0) {
    return true;
  }

  return false;

  function getIndexOfSubArrayBySymbol(symbol, config, position) {
    return config.findIndex(function cb(item) { return item[position] === symbol });
  }

  function hasConfigPairedElement(element, config) {
    const pairedElementsArr = [];

    for (let i = 0; i < config.length; i++) {
      if (config[i][0] === config[i][1]){
        pairedElementsArr.push(config[i][0]);
      }
    }

    return pairedElementsArr.includes(element);
  }
}
