// relations.ts
import { relations } from "drizzle-orm";
import { dinosaurs, tasks } from "./schema.ts";

export const dinosaursRelations = relations(dinosaurs, ({ many }) => ({
  tasks: many(tasks), 
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  dinosaur: one(dinosaurs, {
    fields: [tasks.dinosaurId], 
    references: [dinosaurs.id],
  }),
}));
