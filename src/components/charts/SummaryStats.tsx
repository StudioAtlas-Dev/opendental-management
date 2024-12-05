'use client';

import useSWR from 'swr';
import { LoadingCard } from '../ui/LoadingCard';
import { ErrorCard } from '../ui/ErrorCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SummaryStats() {
  const { data: revenueData, error: revenueError } = useSWR('/api/metrics/daily-revenue', fetcher);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {!revenueData && !revenueError && <LoadingCard />}
        {revenueError && <ErrorCard message="Failed to load summary data" />}
        {revenueData?.data && (
          <>
            <div>
              <h3 className="text-lg font-semibold">Total Revenue (30 days)</h3>
              <p className="text-2xl">
                ${revenueData.data.reduce((sum: number, d: any) => sum + Number(d.daily_revenue), 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Patients</h3>
              <p className="text-2xl">
                {revenueData.data.reduce((sum: number, d: any) => sum + Number(d.patient_count), 0).toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
