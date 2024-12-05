'use client';

import { ResponsivePie } from '@nivo/pie';
import useSWR from 'swr';
import { LoadingCard } from '../ui/LoadingCard';
import { ErrorCard } from '../ui/ErrorCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Status mapping for claims
const claimStatusMap: { [key: number]: string } = {
  0: 'NotReceived',
  1: 'Received',
  2: 'Processed',
  3: 'Pending',
  4: 'Sent',
  5: 'Verified'
};

export function InsuranceClaimsChart() {
  const { data: insuranceData, error: insuranceError } = useSWR('/api/metrics/insurance-claims', fetcher);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Insurance Claims by Status</h2>
      <div className="h-80">
        {!insuranceData && !insuranceError && <LoadingCard />}
        {insuranceError && <ErrorCard message="Failed to load insurance claims data" />}
        {insuranceData?.data && (
          <ResponsivePie
            data={insuranceData.data.map((d: any) => ({
              id: claimStatusMap[d.claim_status] || `Status ${d.claim_status}`,
              label: claimStatusMap[d.claim_status] || `Status ${d.claim_status}`,
              value: d.claim_count
            }))}
            margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 2]]
            }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle'
              }
            ]}
          />
        )}
      </div>
    </div>
  );
}
