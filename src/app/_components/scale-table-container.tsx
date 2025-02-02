"use client";
import { DataTableViewOptions } from "@/components/ui/column-toggle";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import useScaleDataStore from "@/hooks/useScaleDataStore";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ScaleColumn } from "./column";

const ScaleTableContainer = () => {
  const { jsonData } = useScaleDataStore();

  return (
    <div>
      <TableContainer data={jsonData || []} columns={ScaleColumn} />
    </div>
  );
};

export default ScaleTableContainer;

const TableContainer = ({ data, columns }: any) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <>
      <div className="flex items-center py-4 justify-between w-full">
        <Input
          placeholder="Write Sales Employee name..."
          value={
            (table.getColumn("Employee Name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Employee Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-x-4">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <DataTable table={table} columns={columns} />
    </>
  );
};
