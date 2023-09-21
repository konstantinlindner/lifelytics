"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  amount: number | null;
  country: number | null;
  created_at: string | null;
  currency: string | null;
  id: string;
  name: string | null;
  updated_at: string | null;
  user: string | null;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
