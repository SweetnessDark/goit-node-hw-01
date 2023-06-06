const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("Contacts list:");
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      console.log(`Contact by ID: ${id}`);
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      console.log(
        `Contact with name: ${name}, email: ${email}, phone: ${phone} add!`
      );
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      console.log(`Contact by ID removed: ${id}`);
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
