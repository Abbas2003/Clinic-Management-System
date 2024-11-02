import { AppointmentTable } from "@/components/AppointmentTable/dataTable";
import { columns } from "@/components/AppointmentTable/columns";
import { appointments } from "@/lib/data";

export default function Appointments() {
    return (
        <div className="container mx-auto">
            <div className="my-10">
                <AppointmentTable columns={columns} data={appointments} />
            </div>
        </div>
    )
}