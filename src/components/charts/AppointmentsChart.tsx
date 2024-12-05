'use client';

import { ResponsiveBar } from '@nivo/bar';
import useSWR from 'swr';
import { LoadingCard } from '../ui/LoadingCard';
import { ErrorCard } from '../ui/ErrorCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AppointmentsChart() {
  const { data: appointmentData, error: appointmentError } = useSWR('/api/metrics/appointments', fetcher);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Appointments by Status</h2>
      <div className="h-80">
        {!appointmentData && !appointmentError && <LoadingCard />}
        {appointmentError && <ErrorCard message="Failed to load appointment data" />}
        {appointmentData?.data && (
          <ResponsiveBar
            data={appointmentData.data}
            keys={['completed', 'scheduled', 'ASAP', 'broken', 'cancelled']}
            indexBy="date"
            margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="stacked"
            axisBottom={{
              tickRotation: -45,
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
              format: value => Math.round(value).toString()
            }}
            colors={{ scheme: 'nivo' }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                symbolSize: 12
              }
            ]}
          />
        )}
      </div>
    </div>
  );
}
