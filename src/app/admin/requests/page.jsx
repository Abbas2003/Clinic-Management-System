import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { getRequest } from '@/actions/requests/requests';
import DoctorRequests from '@/components/RequestSection';
import Link from 'next/link';


const Requests = async ({ searchParams }) => {
  const session = await auth();
  const { status } = searchParams;
  const { requests } = await getRequest(status);


  return (
    <div className='container mx-auto'>
      {session?.user?.role == 'admin' ? <>
        <h1 className='text-3xl font-bold my-3'>{`Doctor's`} Request</h1>
        <DoctorRequests requests={requests} status={status} />
      </> : <div className='flex flex-col justify-center items-center min-h-screen'>
        <p className='text-5xl font-extrabold'>You are unauthorized to access</p>
        <Link
          href="/"
          className="mt-4 text-blue-600 underline underline-offset-4 hover:text-blue-800 transition-colors font-medium"
        >
          Go back to home
        </Link>
      </div>}
    </div>
  )
}

export default Requests