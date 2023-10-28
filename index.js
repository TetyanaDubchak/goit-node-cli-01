const Contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <action>', 'choose action')
  .option('-i, --id <id>', 'user id')
  .option('-n, --name <name>', 'user name')
  .option('-e, --email <email>', 'user email')
  .option('-p, --phone <phone>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const contacts = await Contacts.listContacts();
         return console.table(contacts);

    case 'get':
         const contact = await Contacts.getContactById(id);
         return console.log(contact);

     case 'add':
        const createContact = await Contacts.addContact(name, email, phone);
         return console.log(createContact);

    case 'remove':
      const deleteContact = await Contacts.removeContact(id);
         return console.log(deleteContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);