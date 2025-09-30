import React, { Suspense } from 'react'
import FindYourSpacePageContent from './FindYourSpacePageContent'

const Page = () => {
  return (
    <Suspense fallback={<p className='py-5 bg-gray-500 font-medium text-center'>Loading spaces...</p>}>
      <FindYourSpacePageContent />
    </Suspense>
  )
}

export default Page
