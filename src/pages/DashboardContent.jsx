import React from 'react'
import DashboardKpiSection from '../components/DashboardKpiSection'
import RevenueChart from '../components/RevenueChart'
import SingleLineRevenueChart from '../components/SingleLineRevenueChart'
import DailyTransactionsChart from '../components/DailyTransactionsChart'
import RevenueSplitChart from '../components/RevenueSplitChart'
import RecentActivityFeed from '../components/RecentActivityFeed'
import QuickActions from '../components/QuickActions'

export default function DashboardContent() {
  return (
    <div>
      <div >

        <section>
                  <DashboardKpiSection />
        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 py-10 gap-6'>
          <div>
            <SingleLineRevenueChart />
          </div>
          <div>
            <DailyTransactionsChart />
          </div>
        </section>
        <section className='grid grid-cols-1 md:grid-cols-2 py-0 gap-6'>
          <div>
            <RevenueSplitChart />
          </div>
          <div>
            <RecentActivityFeed />
          </div>
        </section>
        <section>
          <QuickActions />
        </section>
      </div>
    </div>
  )
}
