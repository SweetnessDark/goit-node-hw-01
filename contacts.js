const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const data = allContacts.filter((item) => item.id === contactId);
    return data || null;
  } catch (error) {
    console.log("error :>> ", error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const index = allContacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));
    return index;
  } catch (error) {
    console.log("error :>> ", error);
  }
}

async function addContact(data) {
  try {
    const allContacts = await listContacts();
    const newContact = { id: nanoid(), ...data };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));
    return newContact;
  } catch (error) {
    console.log("error :>> ", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
