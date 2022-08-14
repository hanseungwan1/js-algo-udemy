// hash table이 개별 체이닝 방식으로 동작하면, 인덱스가 나올 수 있는 범위를 우선 설정해야 함
// 즉, 배열의 크기를 설정하는 것임
// 그리고 키, 밸류를 그 인덱스에 저장하는 것임
// hash 함수의 리턴값이 밸류가 아니고 인덱스임
class HashTable {
  constructor(size=53) { // 해시테이블의 크기를 설정 -> 디폴트 53으로 해봄
    this.keyMap = new Array(size); // 배열 생성
  }

  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt() - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // 객체[키가 뭐든 문자열로 바뀜]
  // 객체.키를 문자열로 바꿔야 적용됨
  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);
    if (!this.keyMap[index]) return undefined;
    for (let pair of this.keyMap[index]) {
      if (pair[0] === key) return pair[1];
    }
  }

  keys() {
    const keys = [];
    for (let pair of this.keyMap) {
      if (pair) {
        if (typeof pair[0] === 'object') pair.forEach(el => {
          if (!keys.includes(el[0])) keys.push(el[0]);
        });
        else {
          if (!keys.includes(pair[0])) keys.push(pair[0]);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let pair of this.keyMap) {
      if (pair) {
        if (typeof pair[0] === 'object') pair.forEach(el => {
          if (!values.includes(el[1])) values.push(el[1]);
        });
        else {
          if (!values.includes(pair[1])) values.push(pair[1]);
        }
      }
    }
    return values;
  }
}

const ht = new HashTable(17);
ht.set('maroon', '#800000');
ht.set('yellow', '#FFFF00');
ht.set('olive', '#808000');
ht.set('salmon', '#FA8072');
ht.set('lightcoral', '#F08080');
ht.set('mediumvioletred', '#C71585');
ht.set('plum', '#DDA0DD');