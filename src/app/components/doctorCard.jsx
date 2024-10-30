"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const DoctorCard = ({ name, image, specialization, timing }) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <Image 
          src={image}
          alt={`Picture of Dr. ${name}`}
          width={400}
          height={300}
          className="rounded-md object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <p className="text-sm text-gray-600">{specialization}</p>
        <p className="text-sm text-gray-500">Timing: {timing}</p>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
