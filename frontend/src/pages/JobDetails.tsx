import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Job } from '../types';
import { getJobById } from '../services/jobService';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      getJobById(parseInt(id)).then(res => setJob(res.data));
    }
  }, [id]);

  if (!job) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="mt-4">{job.description}</p>
      <p className="mt-4 font-bold">Salary: ${job.salary}</p>
      <p className="mt-4 text-sm text-gray-500">Posted by: {job.company?.name}</p>
    </div>
  );
}
