import { Router } from "express";
import { ContactTheStore } from "../service/ContactTheStore";

const contactTheStore = new ContactTheStore()

const store = Router();

store.post('/contactNotice/:name/:phone/:template', contactTheStore.handle )

export { store }