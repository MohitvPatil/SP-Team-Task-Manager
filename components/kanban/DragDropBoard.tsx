"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

const columns = [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
];

export default function DragDropBoard() {
  return (
    <DndContext collisionDetection={closestCenter}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column}
            className="min-h-[500px] rounded-2xl bg-white p-4 shadow"
          >
            <h2 className="mb-4 text-xl font-bold">
              {column}
            </h2>
          </div>
        ))}
      </div>
    </DndContext>
  );
}