import StatsCards from "@/components/shared/cards/state-card";
import ScaleTableContainer from "./_components/scale-table-container";
import TeamOverview from "./_components/TeamOverview";
import TopThreeSales from "./_components/top-three-sales-person";

export default async function Home() {
  return (
    <div className="container mx-auto p-[30px] ">
      <StatsCards />

      <div className="mt-[30px] grid grid-cols-12 gap-5 ">
        <div className="col-span-8 bg-white p-4 rounded-md ">
          <ScaleTableContainer />
        </div>
        <div className="col-span-4 space-y-5">
          <TopThreeSales />
          <TeamOverview />
        </div>
      </div>
    </div>
  );
}
