import React from 'react'
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { getRequest } from '@/actions/requests/requests';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ClockIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DoctorDetailSheet from '@/components/DoctorDetailSheet';
import DoctorRequests from '@/components/RequestSection';


const Requests = async ({ searchParams }) => {
  const session = await auth();
  const { status } = searchParams;
  // console.log("searchParams ->", searchParams);
  

  if (!session && !session?.user?.role != 'admin') redirect('/')
  const { requests } = await getRequest(status);

  // console.log("Requests ->", requests);

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold my-3'>{`Doctor's`} Request</h1>
     <DoctorRequests requests={requests} status={status} />
    </div>
  )
}

export default Requests