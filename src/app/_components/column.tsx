// @ts-nocheck

import { cn } from "@/lib/utils";

export const ScaleColumn = [
  {
    accessorKey: "Employee ID",
    header: "ID",
  },
  {
    accessorKey: "Employee Name",
    header: "Name",
  },
  {
    accessorKey: "Service Line",
    header: "Service",
  },
  {
    accessorKey: "Sales Department",
    header: "Department (Sales)",
  },
  {
    accessorKey: "Order Status",
    header: "Status",
    cell: ({ row }) => {
      const isDelivered = row.original["Order Status"] == "Delivered";

      return (
        <p
          className={cn(
            isDelivered ? "bg-green-500 " : "bg-rose-500 ",
            "text-[10px] px-1 py-[2px] text-white rounded-[4px]"
          )}
        >
          {row.original["Order Status"]}
        </p>
      );
    },
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ row }) => <p>${row.original.Amount}</p>,
  },
  {
    accessorKey: "Delivered_By",
    header: "Delivered By",
  },
];
