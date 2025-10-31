import { ContactRepository } from "./contacts.repository";
import { Contact } from "../types";

export const ContactService = {
  getContacts: async () => ContactRepository.getAllContacts(),

  addContact: async (contact: Contact) =>
    ContactRepository.createNewContact(contact),

  deleteContact: async (id: number) => ContactRepository.deleteContact(id),

  verifyContact: async (id: number) => ContactRepository.verifyContact(id),
};
