import React from 'react'
import PaymentsRevenueKpi from '../components/PaymentsRevenueKpi'
import MonthlyRevenueChart from '../components/MonthlyRevenueChart'
import RecentTransactionsTable from '../components/RecentTransactionsTable'

export default function Payments() {
  return (
    <div>
      <PaymentsRevenueKpi />
      <MonthlyRevenueChart />
      <RecentTransactionsTable />
    </div>
  )
}
