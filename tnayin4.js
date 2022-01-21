class List {
  constructor(num = null) {
    this.data = num;
    this.next = null;
  }
  push(pushVal) {
    let newList = new List(pushVal);
    let data = this;
    const pushFunc = (value) => {
      if (value.next === null) {
        value.next = newList;
      } else {
        pushFunc(value.next);
      }
    };
    pushFunc(data);
  }
  pop() {
    const data = this;
    function popFunc(value) {
      if (value.next.next === null) {
        value.next = null;
      } else {
        popFunc(value.next);
      }
    }
    popFunc(data);
  }
  delete(){
    this.data = null;
    this.next = null;
  }
  count(){
    let data = this;
    let count = 0;
    const countFunc = (value) => {
      if (value.data !== null) {
        count += value.data;
        if (value.next !== null) {
          countFunc(value.next);
        }
      }
    };
    countFunc(data);
    return count;
  }
}

let list = new List(9);
list.push(6);
list.push(13);
list.push(45);
list.pop()

let count = list.count();

console.log(list, count);

list.delete();

console.log(list);
