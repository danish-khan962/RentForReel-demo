import React, { Suspense } from 'react'
import FindYourSpacePageContent from './FindYourSpacePageContent'

const Page = () => {
  return (
    <Suspense fallback={<p className='py-5 text-gray-300 font-medium text-center'>Loading spaces...</p>}>
      <FindYourSpacePageContent />
    </Suspense>
  )
}

export default Page
