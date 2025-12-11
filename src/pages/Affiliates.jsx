import React from 'react'
import AffiliatesKpiSection from '../components/AffiliatesKpiSection'
import AffiliatesHead from '../components/AffiliatesHead'
import AffiliatesPayoutsTable from '../components/AffiliatesPayoutsTable'

export default function Affiliates() {
  return (
    <div>
        <AffiliatesHead />
        <AffiliatesKpiSection />
        <AffiliatesPayoutsTable />
    </div>
  )
}
