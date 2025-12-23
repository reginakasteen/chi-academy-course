//______________________________________________

console.log('Using for:');
let for_string_10 = [];
for (let i = 1; i <= 10; i++) {
    for_string_10[i - 1] = i;
}
console.log(for_string_10.join(' '));

console.log('\nUsing while:');
let while_string_10 = '';
let count = 1;
while (count <= 10) {
    while_string_10 += count + ' ';
    ++count;
}
console.log(while_string_10);

//_______________________________________________

let arr = [228, 5000, true, 'random', 9007199254740991n, true, 'lorem ipsum', false, 33.3, 'word'];
console.log('\nArray: ', arr);


console.log('\nUsing for:');
let typesFor = '';
for (let i = 0; i < arr.length; i++) {
    typesFor += String(typeof arr[i]) + ' ';
}
console.log(typesFor);


console.log('\nUsing while:');
let typesWhile = '';
count = 0;
while (count < arr.length) {
    typesWhile += String(typeof arr[count]) + ' ';
    count++;
}
console.log(typesWhile);

console.log('\nUsing do-while:');
let typesDoWhile = '';
count = 0;
do {
    typesDoWhile += String(typeof arr[count]) + ' ';
    count++;
} while (count < arr.length)
console.log(typesDoWhile);


console.log('\nUsing forEach:');
let typesForEach = [];
arr.forEach(item => {  
    typesForEach.push(String(typeof item));
});
console.log(typesForEach.join(' '));

//_______________________________________________

//_______________________________________________

//all the objects
let people = [
    {name: 'John Doe', age: 20, pets: ['cat', 'dog']},
    {name: 'Jane Doe', age: 18, pets: ['peacock', 'fish']},
    {name: 'Phineas Flynn', age: 13, pets: ['perry the platypus']},
    {name: 'Alex Smith', age: 19, pets: ['turtle', 'turtle']},
    {name: 'Asami Seto', age: 23, pets: ['panda']},
    {name: 'Dr. Heinz Doofenshmirtz', age: 45, pets: []},
    {name: 'Megan White', age: 61, pets: ['raccoon', 'dog']},
]
console.log('\nList: ', people);

//filtered objects
const filteredByAge = people.filter((person) => person.age > 20);
console.log('\nOver 20: ', filteredByAge);

//add one more pet:
const morePets = people.map((person) => {
    const newPets = [...person.pets, "parrot"];
    return {
        ...person,
        pets: newPets
    };
});
console.log('\nGive everyone a parrot: ', morePets);

//_______________________________________________

//_______________________________________________

//fill the array:
let array_42 = Array(10).fill(42);
console.log('\nOld array: ', array_42);

//replace the fifth element:
let extra_42 = array_42.splice(5, 1, 'answer');
console.log('\nanswer to the ultimate question of life, the universe, and everything: ', extra_42);
console.log('\nNew array: ', array_42);

//find element
let findTheAnswer = (el) => el === "answer";
let result = array_42.find(findTheAnswer);
console.log('\nHere is the answer: ', result);
//_______________________________________________

//_______________________________________________

const sofa = {
    model: 'Prima',
    material: ['wood', 'fabric'],
    weight: 30,
    height: 90,
    width: 200,
    convertible: true,
}

console.log('\nKeys and values:');
console.log(Object.keys(sofa));
console.log(Object.values(sofa));

console.log('\nTry to find width and price properties:');
console.log('width: ', Object.hasOwn(sofa, "width"));
console.log('price: ', Object.hasOwn(sofa, "price"));

//_______________________________________________