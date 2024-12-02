import { AppointmentTable } from "@/components/AppointmentTable/dataTable";
import { columns } from "@/components/AppointmentTable/columns";
import { appointments } from "@/lib/data";
import { auth } from "../../../auth";
import { getAppointment } from "@/actions/appointments/appointments";

export default async function Appointments() {

    const session = await auth();
    const response = await getAppointment("user", session.user._id);
    console.log("response->", response);

    return (
        <div className="container mx-auto">
            <div className="my-10">
                {/* <AppointmentTable columns={columns} data={appointments} /> */}
            </div>
        </div>
    )
}