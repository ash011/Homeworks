const obj = {
  name: "John",
  surname: "John",
  res: null,
  country: {
    name: "Armenia",
    code: 374,
    number: undefined,
    obj: {
      Ash: "author",
    },
  },
  foo: () => {},
  arr: [2, 4],
  obj: {},
};

function revers(obj) {
  let revObj = {};
  const reversFunc = (object, revObj) => {
    for (let i in object) {
      if (!(typeof object[i] === "object" && object[i] !== null && !Array.isArray(object[i]))) {
        if (typeof object[i] !== "number" && typeof object[i] !== "string") {
          revObj[i] = object[i];
        } else if (!revObj[object[i]]) {
          revObj[object[i]] = i;
        } else {
          revObj[i] = object[i];
        }
      } else {
        revObj[i] = {};
        reversFunc(object[i], revObj[i]);
      }
    }
  };
  reversFunc(obj, revObj);

  return revObj;
}

let reversObject = revers(obj);

console.log(reversObject);
