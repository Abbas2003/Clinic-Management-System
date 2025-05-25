import React from 'react'
import DoctorsSection from '../../components/DoctorsSection'
import { getRequest } from '@/actions/requests/requests';

const Doctors = async ({ params }) => {
     const {requests} = await getRequest();
    return (
        <section>
            <DoctorsSection requests={requests} />
        </section>
    )
}

export default Doctors