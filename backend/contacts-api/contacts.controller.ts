import { Request, Response } from "express";
import { ContactService } from "./contacts.service";

export const ContactController = {
  getContacts: async (req: Request, res: Response) => {
    try {
      const contacts = await ContactService.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  },

  addContact: async (req: Request, res: Response) => {
    try {
      const result = await ContactService.addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Failed to add contact" });
    }
  },

  deleteContact: async (req: Request, res: Response) => {
    try {
      const result = await ContactService.deleteContact(Number(req.params.id));
      if (!result) return res.status(404).json({ error: "Contact not found" });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  },

  verifyContact: async (req: Request, res: Response) => {
    try {
      const result = await ContactService.verifyContact(Number(req.params.id));
      if (!result) return res.status(404).json({ error: "Contact not found" });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to verify contact" });
    }
  },
};
