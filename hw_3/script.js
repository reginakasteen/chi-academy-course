//__________________________________________________
console.log('\n\n1.');

class Transport {
    ride() {
        throw new Error('Method ride() must be implemented');
    }

    stop() {
        throw new Error('Method stop() must be implemented');
    }
}

class Car extends Transport {
    ride() {
        console.log('Beep-beep car!');
        console.log(`         
           ___________ 
   -  ----// --|||--  \\\\         
  ---- __//____|||_____\\\\_______   
       | _|     " | "   --_    || 
   ----|/ \\\\______|______// \\\\_||
  ______\\_/_______________\\_/_______`);

        
        
    }
    stop() {
        console.log('No beep-beep (._.)');
        
    }
}

class Train extends Transport {
    ride() {
        console.log('Choo-choo train!');
        console.log(`                 o  o  O  O
            ,_____  ____    O
            | \\\\\\ \\_|[]|_'__Y
            |_______|__|_|__|}
=============oo--oo==oo--OOO\\====================`);
        
    }
    stop() {
        console.log('No choo-choo (._.)');
        
    }
}

class TransportFactory {
    static create(type) {
        switch(type) {
            case 'car':
                return new Car();
            case 'train':
                return new Train();
            default:
                throw new Error(`Unknown transport type: ${type}. Please choose between car and train, and be on your merry way`);
        }
    }
}


// const transportCar = TransportFactory.create('car');
// transportCar.ride();
// transportCar.stop();
// console.log('\n');
// const transportTrain = TransportFactory.create('train');
// transportTrain.ride();
// transportTrain.stop();
//const transportUnknown = TransportFactory.create('kick scooter');


//__________________________________________________
console.log('\n\n2.');

const app = document.getElementById('app');

const button = document.getElementById('display-btn');
const previous = document.getElementById('prev');
const page = document.getElementById('page');
const next = document.getElementById('next');

previous.hidden = true;
page.hidden = true;
next.hidden = true;

let currentPage = 1;
let nextPageUrl = null;
let prevPageUrl = null;

function renderPage(url) {

    const response = fetch(url);
    const parsedData = response.then(data => {
        if (data.status !== 200){
            alert('Error')
        }
        console.log(data);
        return data.json();
    })
    .catch(error => {
        console.log('Error:', error);
    })
    .finally(() => {
        console.log('Request processed');

    });

    parsedData.then(data => {
    
    app.innerText = '';
    data.results.forEach(item => {
        app.innerHTML += `<div><p>${item.name}</p><p>${item.status}</p><img src="${item.image}"></div>`;
    })
 
    nextPageUrl = data.info.next;
    prevPageUrl = data.info.prev;

    if (data.info.next) {
        page.innerText = currentPage;
    } else {
        page.innerText = data.info.pages;
    }

    previous.disabled = !prevPageUrl;
    next.disabled = !nextPageUrl;

    });
}

button.addEventListener('click', () => {

    button.remove();
    app.innerText = "Loading...";

    previous.hidden = false;
    page.hidden = false;
    next.hidden = false;

    next.addEventListener('click', () => {
        if (nextPageUrl) {
            currentPage++;
            renderPage(nextPageUrl);
        }
    });

    previous.addEventListener('click', () => {
        if (prevPageUrl) {
            currentPage--;
            renderPage(prevPageUrl);
        }
    });

renderPage(`https://rickandmortyapi.com/api/character?page=${currentPage}`);


});





        