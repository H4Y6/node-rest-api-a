const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = "./models/contacts.json";

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((c) => c.id === contactId);
  if (!oneContact) {
    return null;
  }
  return oneContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const i = contacts.findIndex((c) => c.id === contactId);
  if (i === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(i, 1);
  await updateContacts(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const i = contacts.findIndex((c) => c.id === contactId);
  if (i === -1) {
    return null;
  }
  contacts[i] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[i];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
