'use client';

import { RevenueChart } from './charts/RevenueChart';
import { AppointmentsChart } from './charts/AppointmentsChart';
import { InsuranceClaimsChart } from './charts/InsuranceClaimsChart';
import { SummaryStats } from './charts/SummaryStats';

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <RevenueChart />
      {/* <AppointmentsChart />
      <InsuranceClaimsChart />
      <SummaryStats /> */}
    </div>
  );
}