const readline = require('readline');
const EventEmitter  = require('events');

const myEvent = new EventEmitter();

// Create interface for user input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 async function prompt(question) {
    return await new Promise((resolve, reject) => {
        rl.question(question, (userInput)=>{
            resolve(userInput);
        })
    })
}

const contacts = [];

// Event emitter to add contact

myEvent.on('addContacts', (name,phoneNumber) => {
  contacts.push({ name, phoneNumber });
  console.log('Contact added successfully!\n');
});

// Event emitter to display contact

myEvent.on('viewContacts', () => {
  if (contacts.length === 0) {
    console.log('No contacts available.\n');
  } else {
    console.log('Contacts:');
    contacts.forEach(contact => {
      console.log(`Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
    });
    // console.log();
  }
});

// Event emitter to search for contact

myEvent.on('searchContacts', (searchName) => {

    const contact = contacts.find(contact => contact.name === searchName);
    if (contact) {
      console.log(`Name: ${contact.name}, Phone: ${contact.phoneNumber}\n`);
    } else {
      console.log('Contact not found.\n');
    }
});

//main application

async function application(){
  while (true) {
        console.log('Menu:');
        console.log('1. Add a contact');
        console.log('2. View all contacts');
        console.log('3. Search for a contact');
        console.log('4. Exit');

        choice = await prompt('choose a number between 1 to 4 ');

        switch (choice) {
          case '1':
            const name = await prompt('what is your name ')
            const phoneNumber =  await prompt(' your phoneNumber ')
            myEvent.emit('addContacts',name,phoneNumber);
            break;
          case '2':
             myEvent.emit('viewContacts');
            break;
          case '3':
            const searchName = await prompt('Enter contact name to search: ')
             myEvent.emit('searchContacts',searchName);
            break;
          case '4':
            console.log('Exiting application.');
            break;
          default:
            console.log('Invalid choice. Please try again.\n');
          }

        }
      }

application()
