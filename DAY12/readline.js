const readline = require('readline');

// Create interface for user input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Collection to store contacts
const contacts = [];

// Function to add a contact
function addContact() {
  rl.question('Enter contact name: ', name => {
    rl.question('Enter phone number: ', phone => {
      contacts.push({ name, phone });
      console.log('Contact added successfully!\n');
      showMenu();
    });
  });
}
    // addContact()
// Function to view all contacts
function viewContacts() {
  if (contacts.length === 0) {
    console.log('No contacts available.\n');
  } else {
    console.log('Contacts:');
    contacts.forEach(contact => {
      console.log(`Name: ${contact.name}, Phone: ${contact.phone}`);
    });
    console.log();
  }
  showMenu();
}
// viewContacts()
// Function to search for a contact
function searchContact() {
  rl.question('Enter contact name to search: ', name => {
    const contact = contacts.find(contact => contact.name === name);
    if (contact) {
      console.log(`Name: ${contact.name}, Phone: ${contact.phone}\n`);
    } else {
      console.log('Contact not found.\n');
    }
    showMenu();
  });
}
// searchContact()
// Function to exit the application
function exitApplication() {
  console.log('Exiting application.');
  rl.close();
}

// exitApplication()

function showMenu() {
    console.log('Menu:');
    console.log('1. Add a contact');
    console.log('2. View all contacts');
    console.log('3. Search for a contact');
    console.log('4. Exit');
    rl.question('Enter your choice: ', choice => {
      switch (choice) {
        case '1':
          addContact();
          break;
        case '2':
          viewContacts();
          break;
        case '3':
          searchContact();
          break;
        case '4':
          exitApplication();
          break;
        default:
          console.log('Invalid choice. Please try again.\n');
          showMenu();
      }
    });
  }

  // Start the application
  console.log('Welcome to the Contact Management System!');
  showMenu();
