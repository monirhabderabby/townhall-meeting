"use client";

import { Card } from "@/components/ui/card";
import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import useScaleDataStore from "@/hooks/useScaleDataStore";
import { ArrowDownIcon, ArrowUpIcon, WalletCards } from "lucide-react";
import { ReactNode } from "react";
import CountUp from "react-countup";

const StatsCards = () => {
  const { jsonData } = useScaleDataStore();

  const totalOrderAmount = jsonData?.reduce((total, order) => {
    return total + order["Amount"];
  }, 0);

  const totalDeliveredAmount = jsonData?.reduce((total, order) => {
    return order["Order Status"] === "Delivered"
      ? total + order["Deli _amount"]
      : total;
  }, 0);

  const totalCancelledAmount = jsonData?.reduce((total, order) => {
    return order["Order Status"] === "Cancelled"
      ? total + order["Amount"]
      : total;
  }, 0);

  return (
    <div className=" relative flex w-full flex-wrap gap-6 md:flex-nowrap">
      <SkeletonWrapper isLoading={false}>
        <StatCard
          value={totalOrderAmount}
          title="Order Amount"
          icon={<ArrowUpIcon className="h-6 w-6 text-emerald-500" />}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={false}>
        <StatCard
          value={totalCancelledAmount}
          title="Cancelled"
          icon={<ArrowDownIcon className="h-6 w-6 text-red-500" />}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={false}>
        <StatCard
          value={totalDeliveredAmount}
          title="Delivered Amount"
          icon={<WalletCards className="h-6 w-6 text-purple-500" />}
        />
      </SkeletonWrapper>
    </div>
  );
};

export default StatsCards;

function StatCard({
  value,
  title,
  icon,
}: {
  value: number;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          className="text-2xl"
          prefix="$"
        />
      </div>
    </Card>
  );
}
