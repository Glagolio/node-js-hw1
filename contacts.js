const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  const parsedData = await JSON.parse(data);
  console.log(parsedData);
}

async function getContactsById(contactId) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const parsedData = await JSON.parse(data);
  const contactById = parsedData.find(contact => Number(contact.id) === contactId);
  console.log(contactById);
  return contactById;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const parsedData = await JSON.parse(data);
  const newData = parsedData.filter(contact => Number(contact.id) !== contactId);
  const jsonNewData = JSON.stringify(newData);
  fs.writeFile(contactsPath, jsonNewData);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, 'utf8');
  const parsedData = await JSON.parse(data);
  const lastId = Number(parsedData[parsedData.length - 1].id);
  const id = String(lastId + 1);
  parsedData.push({ id, name, email, phone });
  const jsonNewData = JSON.stringify(parsedData);
  console.log(jsonNewData);
  fs.writeFile(contactsPath, jsonNewData);
}

module.exports = { listContacts, getContactsById, removeContact, addContact };
