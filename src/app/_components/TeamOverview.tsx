// @ts-nocheck

"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useScaleDataStore from "@/hooks/useScaleDataStore";

function getDeliveredByTeam(data) {
  // Initialize an object to store the team totals
  const teamDeliveries = {};

  // Iterate through the data
  data?.forEach((item) => {
    // Get the team and the delivered amount
    const team = item.Delivered_By;
    const deliveredAmount = item["Deli _amount"];

    // If the team is already in the object, add the delivered amount to it
    if (teamDeliveries[team]) {
      teamDeliveries[team] += deliveredAmount;
    } else {
      // If the team is not in the object, initialize it with the delivered amount
      teamDeliveries[team] = deliveredAmount;
    }
  });

  // Convert the object into an array of objects in the desired format
  const result = Object.keys(teamDeliveries).map((team) => ({
    team: team,
    delivered: teamDeliveries[team],
  }));

  return result;
}

const TeamOverview = () => {
  const { jsonData } = useScaleDataStore();

  const teams = getDeliveredByTeam(jsonData);

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>Team (Sales)</CardTitle>
      </CardHeader>

      <CardContent>
        {teams.map((item, i) => (
          <div
            className="flex items-center justify-between border-b p-2 text-[12px] hover:bg-gray-50 cursor-pointer dark:hover:bg-white/10 last:border-b-0"
            key={i}
          >
            <p className="text-gray-600 dark:text-white/80">{item.team}</p>
            <p className="text-green-500 text-[16px] font-medium">
              ${item.delivered}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamOverview;
