const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  try {
    const listContactResult = await fs
      .readFile(contactsPath)
      .then((data) => console.table(JSON.parse(data)))
      .catch((error) => console.log(error.message));

    return listContactResult;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactIdResult = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data))
      .then((contacts) =>
        contacts.filter((contact) => contact.id === contactId)
      )
      .then((contact) => console.table(contact))
      .catch((error) => console.log(error.message));

    return contactIdResult;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const removeContactsResult = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data))
      .then((contacts) =>
        contacts.filter((contact) => contact.id !== contactId)
      )
      .then((filtredContacts) => {
        console.table(filtredContacts);
        return filtredContacts;
      })
      .then((filtredContacts) => {
        fs.writeFile(
          contactsPath,
          JSON.stringify(filtredContacts, null, 4)
        ).catch((error) => console.log(error.message));
      });

    return removeContactsResult;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contactAddResult = await fs
      .readFile(contactsPath)
      .then((data) => JSON.parse(data))
      .then((contacts) => {
        contacts.push({
          id: (contacts.length + 1).toString(),
          name,
          email,
          phone,
        });
        return contacts;
      })
      .then((newContacts) => {
        console.table(newContacts);
        return newContacts;
      })
      .then((newContacts) => {
        fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4)).catch(
          (error) => console.log(error.message)
        );
      });

    return contactAddResult;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
