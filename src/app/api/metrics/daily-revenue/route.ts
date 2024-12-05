import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT 
        DATE(ProcDate) as date,
        SUM(ProcFee) as daily_revenue,
        COUNT(DISTINCT PatNum) as patient_count,
        COUNT(*) as procedure_count
      FROM procedurelog
      WHERE ProcDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND ProcDate <= CURDATE()
        AND ProcStatus = 2  -- Completed procedures
      GROUP BY DATE(ProcDate)
      ORDER BY date DESC
    `;

    const results = await executeQuery(query);
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error fetching daily revenue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily revenue' },
      { status: 500 }
    );
  }
}
