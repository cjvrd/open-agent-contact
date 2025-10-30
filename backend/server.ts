import express from "express";
import cors from "cors";
import { db } from "./db";

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await db
      .selectFrom("Contact")
      .selectAll()
      .where("status", "=", "ENABLED")
      .execute();
    res.json(contacts);
    console.log(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.post("/contacts", async (req, res) => {
  try {
    const { first_name, last_name, email, phone, notes } = req.body;

    const result = await db
      .insertInto("Contact")
      .values({
        first_name,
        last_name,
        email,
        phone,
        notes,
        updated_time: new Date(),
      })
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to add contact" });
  }
});

app.patch("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db
      .updateTable("Contact")
      .set({ status: "DELETED", updated_time: new Date() })
      .where("id", "=", Number(id))
      .returningAll()
      .executeTakeFirst();
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

app.patch("/contacts/:id/verify", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db
      .updateTable("Contact")
      .set({ verified: true, updated_time: new Date() })
      .where("id", "=", Number(id))
      .returningAll()
      .executeTakeFirst();
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to verify contact" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
