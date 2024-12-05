import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT 
        Status as claim_status,
        COUNT(*) as claim_count,
        SUM(FeeBilled) as total_amount
      FROM claimproc
      WHERE ProcDate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      GROUP BY Status
      ORDER BY Status
    `;

    const results = await executeQuery(query);
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error fetching insurance claims:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insurance claims' },
      { status: 500 }
    );
  }
}
