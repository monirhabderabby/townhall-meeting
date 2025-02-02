import { fetchExcelData } from "@/lib/excel-parser";
import { useQuery } from "@tanstack/react-query";

export function useGetData(url: string) {
  // Using useQuery hook to fetch data from the Excel file URL
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["salesData", url], // Key that is used for caching and refetching
    queryFn: () => fetchExcelData(url), // Function that fetches the data
    // Optionally, you can add refetch intervals if you want to refresh the data periodically
    refetchInterval: 60000, // For example, refetch every 60 seconds
  });

  // If loading, show loading spinner or message
  if (isLoading) {
    return { data: null, isLoading, error: null };
  }

  // If there is an error, handle it gracefully
  if (isError) {
    return { data: null, isLoading: false, error: error?.message };
  }

  // Return the fetched data when available
  return { data, isLoading: false, error: null };
}
