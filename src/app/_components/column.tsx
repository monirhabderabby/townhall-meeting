// @ts-nocheck

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
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ row }) => <p>${row.original.Amount}</p>,
  },
  {
    accessorKey: "Delivered_By",
    header: "Delivered By",
  },
];
