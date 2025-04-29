import React from "react";
import { Job } from "../types";
import JobCard from "./JobCard";

interface Props {
  jobs: Job[];
}

const JobList: React.FC<Props> = ({ jobs }) => {
  if (jobs.length === 0) {
    return <p className="text-gray-500">No jobs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
