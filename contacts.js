
const fs = require("node:fs/promises");
const path = require('node:path');
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
  
async function readContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });

    return JSON.parse(data);
}

 
 function writeContacts(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2))
}


async function listContacts() {
    const contactsList = await readContacts();
    return contactsList;
}

async function getContactById(contactId) {
    const contactsList = await readContacts();
    const contact = contactsList.find(contact => contact.id === contactId) || null;

    return contact;
}

async function removeContact(contactId) {
    const contactsList = await readContacts();
    const index = contactsList.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const deleteContact = [contactsList.slice(0, index), ...contactsList.slice(index + 1)];

    await writeContacts(deleteContact);

    return contactsList[index];
}

async function addContact(name, email, phone) { 
    const contactsList = await readContacts();
    const newContact = { id: crypto.randomUUID(), name: name, email: email, phone: phone };
    contactsList.push(newContact);

    await writeContacts(contactsList);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}