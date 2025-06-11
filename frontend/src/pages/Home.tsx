import { useEffect, useState } from 'react';
import type { Job } from '../types';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import JobFilter from '../components/JobFilter';
import { getAllJobs } from '../services/jobService';
import { Link } from 'react-router-dom';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    getAllJobs().then((res) => {
      setJobs(res.data);
      setFilteredJobs(res.data);
    });
  }, []);

  useEffect(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(job =>
        job.company?.sector?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredJobs(result);
  }, [searchTerm, category, jobs]);

  const sectors = [...new Set(jobs.map(j => j.company?.sector).filter(Boolean))] as string[];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
        <SearchBar onSearch={setSearchTerm} />
        <JobFilter categories={sectors} onSelect={setCategory} />
        <Link to="/add-job" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Job</Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Link to={`/jobs/${job.id}`} key={job.id}>
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}
