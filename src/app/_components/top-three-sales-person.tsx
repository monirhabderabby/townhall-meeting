// @ts-nocheck

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useScaleDataStore from "@/hooks/useScaleDataStore";

function getTopSalespeople(data) {
  // Initialize an object to store the total amount for each salesperson
  const salespersonTotals = {};

  // Iterate through the data and accumulate total amounts for each salesperson
  data?.forEach((item) => {
    const salesperson = item["Employee Name"];
    const amount = item.Amount;
    const team = item["Sales Department"];

    // If the salesperson is already in the object, add the amount
    if (salespersonTotals[salesperson]) {
      salespersonTotals[salesperson].amount += amount;
    } else {
      // If the salesperson is not in the object, initialize it with the amount and team
      salespersonTotals[salesperson] = {
        amount: amount,
        team: team,
      };
    }
  });

  // Convert the object into an array of objects and sort by the total amount in descending order
  const sortedSalespeople = Object.keys(salespersonTotals)
    .map((salesperson) => ({
      name: salesperson,
      amount: salespersonTotals[salesperson].amount,
      team: salespersonTotals[salesperson].team,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Function to return icons based on position
  const getIcon = (position) => {
    switch (position) {
      case 1:
        return "🏆"; // Trophy icon
      case 2:
        return "🥈"; // Medal icon
      case 3:
        return "🥉"; // Award icon
      default:
        return "";
    }
  };

  // Return the top 3 salespeople
  return sortedSalespeople.slice(0, 3).map((person, index) => ({
    position: index + 1,
    name: person.name,
    amount: person.amount,
    team: person.team,
    icon: getIcon(index + 1),
  }));
}

const TopThreeSales = () => {
  const { jsonData } = useScaleDataStore();

  const teams = getTopSalespeople(jsonData);

  console.log(jsonData);

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>Top 3 Sales (Person)</CardTitle>
      </CardHeader>

      <CardContent>
        {teams.map((item, i) => (
          <div
            className="flex items-center justify-between border-b last:border-b-0 p-2 text-[12px] hover:bg-gray-50 cursor-pointer dark:hover:bg-white/10"
            key={i}
          >
            <p className="text-gray-600 dark:text-white/80">{item.name}</p>
            <div className="flex items-center gap-x-5">
              <p className="text-green-500 text-[16px] font-medium">
                ${item.amount}
              </p>
              <p>{item.icon}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopThreeSales;
