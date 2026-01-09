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


const transportCar = TransportFactory.create('car');
transportCar.ride();
transportCar.stop();
console.log('\n');
const transportTrain = TransportFactory.create('train');
transportTrain.ride();
transportTrain.stop();
const transportUnknown = TransportFactory.create('kick scooter');

