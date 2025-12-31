//__________________________________________________
console.log('\n\n1.');

function addParamsToRequest(params) {
    let count = 0;
    return function sendData (data) {
        const newObj = {
            ...data,
            ...params,
            count
        };
        count++;
        return newObj;
    }
}

const token = {
    accessToken: 'qwerty'
}

const sendData = addParamsToRequest(token);
const result = sendData({ typ: "JWT" });
console.log(result);
const newResult = sendData({ 
    typ: "JWT",
    innerObj: {
        name: 'object',
        data: 'text data 228'
    }
});
console.log(newResult);
//__________________________________________________


//__________________________________________________
console.log('\n\n2.');

const obj = {
    getData: function () {
        console.log(`Person name is: ${this.name} and age ${this.age}`)
    }
}

const contextObject = {
    name: 'Alex',
    age: 18
};
console.log('Using call:');
obj.getData.call(contextObject);

const contextObject2 = {
    name: 'Jane',
    age: 23
};
console.log('\nUsing apply:');
obj.getData.apply(contextObject2);

const contextObject3 = {
    name: 'Mary',
    age: 20
};
console.log('\nUsing permanent binding:');
const bindMary = obj.getData.bind(contextObject3);
bindMary();


//__________________________________________________


//__________________________________________________
console.log('\n\n3.');


const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};

let files = [];
function findFilesRecursively(object) {
  if (object.type === 'file') {
     files.push(object.name)
  } else {
      object.children.forEach(child => findFilesRecursively(child))
  }
}
console.log('File list:');

findFilesRecursively(root)
console.log(files);
//__________________________________________________


//__________________________________________________
console.log('\n\n4.');
console.log('ES5:');

function HumanES5(name, phone) {
    this.name = name;
    this.phone = phone;

}

HumanES5.prototype.introduce = function() {
    console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
}

function StudentES5(name, phone, course) {
    HumanES5.call(this, name, phone);
    this.course = course;
}

StudentES5.prototype = Object.create(HumanES5.prototype);
StudentES5.prototype.constructor = StudentES5;

StudentES5.prototype.study = function() {
    console.log(`Я навчаюся на ${this.course} курсі`);    
}

function TeacherES5(name, phone, subject) {
    HumanES5.call(this, name, phone);
    this.subject = subject;
}

TeacherES5.prototype = Object.create(HumanES5.prototype);
TeacherES5.prototype.constructor = TeacherES5;

TeacherES5.prototype.teach = function() {
    console.log(`Я викладаю ${this.subject}`);
}

const engTeacher = new TeacherES5('Віктор', '+38 093 827 09 34', 'англійську мову');
engTeacher.introduce();
engTeacher.teach();
const minorStudent = new StudentES5('Олег', '+38 096 398 83 12', '1')
minorStudent.introduce();
minorStudent.study();


console.log('\nES6:');

class Human {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    introduce() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}`);
    }
}

class Student extends Human {
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }

    study() {
        console.log(`Я навчаюся на ${this.course} курсі`);
    }
}

class Teacher extends Human {
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }

    teach() {
        console.log(`Я викладаю ${this.subject}`);
    }
}

const mathsTeacher = new Teacher('Андрій', '+38 067 555 43 11', 'математику');
mathsTeacher.introduce();
mathsTeacher.teach();
const majorStudent = new Student('Василь', '+38 096 831 63 22', '4')
majorStudent.introduce();
majorStudent.study();

//__________________________________________________
