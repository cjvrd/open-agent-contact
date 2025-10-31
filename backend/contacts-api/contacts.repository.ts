import { db } from "../db";
import type { Contact } from "../types";

export const ContactRepository = {
  getAllContacts: async () =>
    db
      .selectFrom("Contact")
      .selectAll()
      .where("status", "=", "ENABLED")
      .execute(),

  createNewContact: async (contact: Contact) =>
    db
      .insertInto("Contact")
      .values({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes,
        updated_time: new Date(),
      })
      .returningAll()
      .executeTakeFirst(),

  deleteContact: async (id: number) =>
    db
      .updateTable("Contact")
      .set({ status: "DELETED", updated_time: new Date() })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst(),

  verifyContact: async (id: number) =>
    db
      .updateTable("Contact")
      .set({ verified: true, updated_time: new Date() })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst(),
};
