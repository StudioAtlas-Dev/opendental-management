'use client';

import DashboardMetrics from '@/components/DashboardMetrics';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            OpenDental Management Dashboard (Work in Progress)
          </h1>
          <h2>
            <span className="text-2xl font-bold text-gray-900">Requirements per Provider (Mike): </span>
            <span className="text-2xl font-bold text-gray-900">1. </span>
            <span className="text-2xl font-bold text-gray-900">2. </span> 
          </h2>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <DashboardMetrics />
        </div>
      </main>
    </div>
  );
}