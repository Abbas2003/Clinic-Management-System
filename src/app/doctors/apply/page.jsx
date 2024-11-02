
import DoctorForm from "@/components/ApplyForm";

export default function ApplyAsDoctor() {
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-2xl mt-10">Apply as a Doctor in our Platform</h1>
      <p className="text-secondary-foreground my-5">
      Join our platform as a doctor and connect with patients who need your expertise! By becoming part of our network, you'll have the opportunity to expand your reach, streamline patient interactions, and provide care to those seeking specialized treatment. Whether you're a general physician or a specialist, our platform is designed to support you in delivering exceptional healthcare. Apply today and make a difference in more lives!
      </p>

      <DoctorForm />
    </div>
  );
}
