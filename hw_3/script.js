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
           ______________ 
   -  ----//  -- |||--  \\\\         
  ---- __//______|||_____\\\\______  
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


const transportCar = TransportFactory.create('car');
transportCar.ride();
transportCar.stop();
console.log('\n');
const transportTrain = TransportFactory.create('train');
transportTrain.ride();
transportTrain.stop();
//const transportUnknown = TransportFactory.create('kick scooter');


//__________________________________________________
console.log('\n\n2.');

const app = document.getElementById('app');
const intro = document.getElementById('intro-block');

const button = document.getElementById('display-btn');
const previous = document.getElementById('prev'); 
const page = document.getElementById('page'); 
const next = document.getElementById('next');

intro.hidden = false;
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
    
    app.innerHTML = '';

data.results.forEach(item => {
    const statusColor =
        item.status === 'Alive'
            ? 'text-green-400'
            : item.status === 'Dead'
            ? 'text-red-400'
            : 'text-yellow-400';
const icon =
        item.status === 'Alive'
            ? 'fa-solid fa-heart-circle-check'
            : item.status === 'Dead'
            ? 'fa-solid fa-skull'
            : 'fa-solid fa-question';

    app.innerHTML += `
        <div class="
            my-4
            mx-5
            bg-black/60 
            backdrop-blur-md
            rounded-2xl
            flex
            overflow-hidden
            border border-green-400/30
            shadow-lg shadow-green-500/20
            transition
            transform
            hover:-translate-y-2
            fade-in-up
            hover:shadow-green-500/40
        ">
            <img 
                src="${item.image}" 
                alt="${item.name}"
                class="w-30 h-48 object-cover"
            />

            <div class="p-4 flex flex-col items-start">
                <h3 class="text-lg font-bold text-white mb-1 font-adult text-center">
                    ${item.name}
                </h3>

                <p class="text-sm ${statusColor} font-adult text-start">
                    <i class=" pe-2 ${icon}"></i> ${item.status}
                </p>
            </div>
        </div>
    `;
});

 
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

    intro.hidden = true;
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





        