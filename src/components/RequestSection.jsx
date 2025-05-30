"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { updateRequest } from "@/actions/requests/requests";
import DoctorCard from "./DoctorCard";


export default function DoctorRequests({ requests, status }) {
    
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState({
    type: null,
    requestId: null,
  });
  const [activeFilter, setActiveFilter] = useState(status);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleAction = (type, requestId) => {
    setSelectedAction({ type, requestId });
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    if (selectedAction.type === "accept") {
      console.log("selectedAction=>", selectedAction);
      await updateRequest(selectedAction.requestId, "accepted");
    } else if (selectedAction.type === "reject") {
      console.log("selectedAction=>", selectedAction);
      await updateRequest(selectedAction.requestId, "rejected");
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (activeFilter) {
      params.set("status", activeFilter);
      params.set("page", "1");
      params.set("limit", "30");
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);

  }, [activeFilter]);

  
  const renderRequestCard = (request) => (
    <DoctorCard
      key={request._id}
      request={request}
      isAdmin={true}
      onAccept={() => handleAction("accept", request._id)}
      onReject={() => handleAction("reject", request._id)}
    />
  );

  return (
    <>
      <div className="grid w-full gap-4 md:w-1/2 mx-auto grid-cols-4">
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            activeFilter == "all" && "bg-primary text-center text-white dark:text-black dark:bg-white"
          }`}
          value="all"
          onClick={() => setActiveFilter("all")}
        >
          All
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            activeFilter == "pending" && "bg-primary text-center text-white dark:text-black dark:bg-white"
          }`}
          value="pending"
          onClick={() => setActiveFilter("pending")}
        >
          Pending
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            activeFilter == "accepted" && "bg-primary text-center text-white dark:text-black dark:bg-white"
          }`}
          value="accepted"
          onClick={() => setActiveFilter("accepted")}
        >
          Accepted
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            activeFilter == "rejected" && "bg-primary text-center text-white dark:text-black dark:bg-white"
          }`}
          value="rejected"
          onClick={() => setActiveFilter("rejected")}
        >
          Rejected
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/*  change it later -> requests.map(renderRequestCard) */}
        {requests.map(renderRequestCard)} 
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedAction.type} this doctor
              request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}