function NaiveStringSearch(text, str) {
  let match = false;
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    for (let j = 0; j < str.length; j++) {
      if (text[i + j] === str[j]) {
        match = true;
      } else {
        match = false;
        break;
      }
    }
    if (match) count++;
  }
  return count;
}

console.log(NaiveStringSearch('wooparoopa', 'oo')); // 2
