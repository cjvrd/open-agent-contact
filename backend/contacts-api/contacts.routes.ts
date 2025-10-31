import { Router } from "express";
import { ContactController } from "./contacts.controller";

const contactsRouter = Router();

//Get All Contacts
contactsRouter.get("/", ContactController.getContacts);

//Add New Contact
contactsRouter.post("/", ContactController.addContact);

//Delete Contact
contactsRouter.patch("/:id", ContactController.deleteContact);

//Verify Contact
contactsRouter.patch("/:id/verify", ContactController.verifyContact);

export default contactsRouter;
