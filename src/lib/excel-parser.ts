// @ts-nocheck

import { read, utils } from "xlsx";

export async function fetchExcelData(url: string) {
  // Convert Google Sheets URL to CSV export URL
  const baseUrl = url.split("/edit")[0];
  const exportUrl = `${baseUrl}/export?format=csv`;

  const response = await fetch(exportUrl);
  const csvData = await response.blob();
  const arrayBuffer = await csvData.arrayBuffer();

  const workbook = read(arrayBuffer);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = utils.sheet_to_json(worksheet) as any[];

  return jsonData.map((row) => ({
    employeeId: row["Employee ID"]?.toString() || "",
    employeeName: row["Employee Name"]?.toString() || "",
    salesDepartment: row["Sales Department"]?.toString() || "",
    date: new Date(row["Date"] || "").toISOString(),
    profileName: row["Profile Name"]?.toString() || "",
    amount:
      Number.parseFloat(
        row["Amount"]?.toString().replace("$", "").replace(",", "")
      ) || 0,
    orderNumber: row["Order Number"]?.toString() || "",
    orderStatus: row["Order Status"]?.toString() || "",
    serviceLine: row["Service Line"]?.toString() || "",
    assignedTeam: row["Assigned Team"]?.toString() || "",
    deliveredBy: row["Delivered_By"]?.toString() || "",
  }));
}
