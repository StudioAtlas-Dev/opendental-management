import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const query = `
      SELECT 
        DATE(AptDateTime) as date,
        COUNT(*) as total_appointments,
        SUM(CASE WHEN AptStatus = 1 THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN AptStatus = 6 THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN AptStatus = 2 THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN AptStatus = 4 THEN 1 ELSE 0 END) as ASAP,
        SUM(CASE WHEN AptStatus = 5 THEN 1 ELSE 0 END) as broken
      FROM appointment
      WHERE AptDateTime >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND AptDateTime <= CURDATE()
      GROUP BY DATE(AptDateTime)
      ORDER BY date DESC
    `;

    const results = await executeQuery(query);
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error fetching appointment metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment metrics' },
      { status: 500 }
    );
  }
}
