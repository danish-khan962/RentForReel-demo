import React, { Suspense } from 'react'
import FindYourSpacePageContent from './FindYourSpacePageContent'

const Page = () => {
  return (
    <Suspense fallback={<p>Loading spaces...</p>}>
      <FindYourSpacePageContent />
    </Suspense>
  )
}

export default Page
