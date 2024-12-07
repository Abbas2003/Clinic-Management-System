import { AppointmentTable } from "@/components/AppointmentTable/dataTable";
import { columns } from "@/components/AppointmentTable/columns";
import { appointments } from "@/lib/data";
import { auth } from "../../../auth";
import { getAppointment } from "@/actions/appointments/appointments";

export default async function Appointments() {

    const session = await auth();
    const response = await getAppointment("user", session.user._id);
    console.log("response->", response.appointments);
    
    const formatAppointments = (appointments) => {
        return appointments.map(appointment => ({
          _id: appointment._id,
          doctor: { name: appointment.user.firstName + ' ' + appointment.user.lastName },
          user: { name: appointment.request.user.name || "N/A" },
          appointmentDate: new Date(appointment.request.appointmentTime).toLocaleDateString(),
          appointmentTime: new Date(appointment.request.appointmentTime).toLocaleTimeString(),
          status: appointment.status,
        }))
      }

    return (
        <div className="container mx-auto">
            <div className="my-10">
                {/* <AppointmentTable columns={columns} data={appointments} /> */}
                {
                    <AppointmentTable columns={columns} data={formatAppointments(response.appointments)} />
                }
            </div>
        </div>
    )
}