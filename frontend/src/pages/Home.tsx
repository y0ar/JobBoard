import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { JobCard } from '../components/JobCard';
import type { Job } from '../types';
import { getAllJobs } from '../services/jobService';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const lowerLocation = searchLocation.toLowerCase();

    const filtered = jobs.filter((job) => {
      const matchesQuery =
        searchQuery === '' ||
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery) ||
        job.company?.name.toLowerCase().includes(lowerQuery);

      const matchesLocation =
        searchLocation === '' ||
        job.location.toLowerCase().includes(lowerLocation);

      return matchesQuery && matchesLocation;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, searchLocation]);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const handleJobClick = (job: Job) => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <main className="flex-1">
      <SearchBar onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery || searchLocation ? 'Search Results' : 'Latest Job Opportunities'}
          </h2>
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {searchLocation && ` in ${searchLocation}`}
          </p>
        </div>

        {/* Job Listings */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={handleJobClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available positions.
              </p>
              <button
                onClick={() => handleSearch('', '')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View All Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
