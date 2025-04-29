import React from "react";
import { Job } from "../types";

interface Props {
  job: Job;
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600 mb-1">{job.company?.name}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
    </div>
  );
};

export default JobCard;
