'use client';

import { ResponsiveLine } from '@nivo/line';
import useSWR from 'swr';
import { LoadingCard } from '../ui/LoadingCard';
import { ErrorCard } from '../ui/ErrorCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RevenueChart() {
  const { data: revenueData, error: revenueError } = useSWR('/api/metrics/daily-revenue', fetcher);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Daily Revenue</h2>
      <div className="h-80">
        {!revenueData && !revenueError && <LoadingCard />}
        {revenueError && <ErrorCard message="Failed to load revenue data" />}
        {revenueData?.data && revenueData.data.length > 0 && (
          <ResponsiveLine
            data={[
              {
                id: 'Revenue',
                data: revenueData.data.map((d: any) => ({
                  x: new Date(d.date),
                  y: Number(d.daily_revenue) || 0,
                })),
              },
              {
                id: 'Patients',
                data: revenueData.data.map((d: any) => ({
                  x: new Date(d.date),
                  y: Number(d.patient_count) || 0,
                })),
              }
            ]}
            margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
            xScale={{ 
              type: 'time',
              useUTC: false,
              precision: 'day'
            }}
            yScale={{ 
              type: 'linear',
              min: 'auto',
              max: 'auto'
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              tickValues: 5,
              format: (value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric'
                });
              }
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: value => `$${value.toLocaleString()}`
            }}
            enablePoints={false}
            enableSlices="x"
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        )}
      </div>
    </div>
  );
}
