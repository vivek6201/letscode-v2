import AddTutorialDialog from "@/components/AdminDashboard/TutorialBuilder/AddTutorialDialog";
import TutorialTable from "@/components/AdminDashboard/TutorialBuilder/TutorialTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorial Builder | Lets Code",
  description: "Here we build tutorials from our main website",
};

const TutorialBuilder = () => {
  return (
    <div className="p-5 md:px-10 py-5">
      <div className="flex justify-between items-center py-5 px-2">
        <p className="font-bold text-xl">All Tutorials</p>
        <AddTutorialDialog />
      </div>

      <TutorialTable />
    </div>
  );
};

export default TutorialBuilder;
