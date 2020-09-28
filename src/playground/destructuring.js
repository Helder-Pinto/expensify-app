console.log("destructuring");

const person = {
  name: "andrew",
  age: 26,
  location: {
    city: "philly",
    temp: 92,
  },
};

const { name = "helder", age, location } = person;
const { city, temp: temperature } = person.location;

// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age} from ${city}`);

if (city && temperature) {
  console.log(`its ${temperature} in ${city}`);
}

const book = {
  title: "Ego is the enemy",
  author: "Ryan Holiday",
  publisher: {},
};

const { name: publisherName = "Self-published" } = book.publisher;
console.log(publisherName);

const address = ["1299 s ", "Philly", "Pensylvania", "19147"];

const [, cidade, state = "New york"] = address;
console.log(`You are in ${cidade} ${state}`);

const item = ["beer", "$2.00", "$2.50", "$2.75"];
const [drink, , cost] = item;
console.log(`A medium ${drink} costs ${cost}`);
