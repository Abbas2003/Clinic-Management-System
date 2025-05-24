import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { getRequest } from '@/actions/requests/requests';
import DoctorRequests from '@/components/RequestSection';


const Requests = async ({ searchParams }) => {
  const session = await auth();
  const { status } = searchParams;
  console.log("session ->", session?.user?.role);
  

  if (!session && !session?.user?.role != 'admin') redirect('/')
  const { requests } = await getRequest(status);


  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold my-3'>{`Doctor's`} Request</h1>
     <DoctorRequests requests={requests} status={status} />
    </div>
  )
}

export default Requests