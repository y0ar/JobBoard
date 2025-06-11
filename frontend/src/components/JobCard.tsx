import type { Job } from '../types';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow hover:shadow-md transition">
      <h2 className="text-lg font-bold">{job.title}</h2>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="mt-2">{job.description.slice(0, 100)}...</p>
    </div>
  );
}
