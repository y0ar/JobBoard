import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import JobList from "../components/JobList";
import AddJobModal from "../components/AddJobModal";
import { Job, Category } from "../types";
import { getCategories } from "../api/categories";
import { getJobs } from "../api/jobs";

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEmployer, setIsEmployer] = useState(true); // assume role for now

  useEffect(() => {
    getJobs().then(setJobs);
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(job => job.categoryId === selectedCategory);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, jobs]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Board</h1>

      <div className="mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {isEmployer && (
        <div className="mb-6 text-right">
          <AddJobModal />
        </div>
      )}

      <JobList jobs={filteredJobs} />
    </div>
  );
};

export default Home;
