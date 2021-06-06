const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.filter(({ id }) => id.toString() === contactId);
    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      ({ id }) => id !== Number(contactId),
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.table(updatedContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: shortid(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.table(updatedContacts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
