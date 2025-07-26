import { useState, useEffect } from 'react';
import type { User, Job, Application, Candidate } from '../types';
import AdminHome from '../components/AdminHome';
import UserManagement from '../components/UserManagement';
import JobManagement from '../components/JobManagement';
import CandidateProfile from '../components/CandidateProfile';
import { getAllUsers, updateUser, deleteUser } from '../services/userService';
import { getAllJobs, updateJob, deleteJob } from '../services/jobService';
import { getAllApplications } from '../services/applicationService';
import { getCandidateById } from '../services/candidateService';

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<'admin-dashboard' | 'users' | 'jobs' | 'candidate-profile'>('admin-dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersRes, jobsRes, appsRes] = await Promise.all([
          getAllUsers(),
          getAllJobs(),
          getAllApplications()
        ]);
        setUsers(usersRes.data);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = {
    applications: applications.length,
    jobs: jobs.length,
    users: users.length
  };

  const handleUpdateUser = async (updatedUser: User) => {
  try {
    await updateUser(updatedUser.id, updatedUser);
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    alert('User updated!');
    } catch (e) {
        alert('Failed to update user.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted.');
      } catch (e) {
        alert('Failed to delete user.');
      }
    }
  };

  const handleUpdateJob = async (updatedJob: Job) => {
    try {
      await updateJob(updatedJob.id, updatedJob);
      setJobs(jobs.map(job =>
        job.id === updatedJob.id ? updatedJob : job
      ));
      alert('Job updated!');
    } catch (e) {
      alert('Failed to update job.');
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId);
        setJobs(jobs.filter(job => job.id !== jobId));
        alert('Job deleted.');
      } catch (e) {
        alert('Failed to delete job.');
      }
    }
  };

  const handleViewCandidate = async (candidate: Candidate) => {
    try {
      const res = await getCandidateById(candidate.id);
      setSelectedCandidate(res.data);
      setCurrentPage('candidate-profile');
    } catch (e) {
      // handle error
    }
  };

  const handleBackFromCandidate = () => {
    setSelectedCandidate(null);
    setCurrentPage('users');
  };

  // Main render logic
  const renderCurrentPage = () => {
    if (loading) return <div>Loading...</div>;
    switch (currentPage) {
      case 'admin-dashboard':
        return <AdminHome stats={stats} />;
      case 'users':
        return (
          <UserManagement
            users={users}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onViewCandidate={handleViewCandidate}
          />
        );
      case 'jobs':
        return (
          <JobManagement
            jobs={jobs}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
          />
        );
      case 'candidate-profile':
        return selectedCandidate ? (
          <CandidateProfile
            candidate={selectedCandidate}
            onBack={handleBackFromCandidate}
          />
        ) : null;
      default:
        return <AdminHome stats={stats} />;
    }
  };

  // Sidebar buttons
  const navButton = (id: typeof currentPage, label: string) => (
    <button
      className={`w-full px-4 py-2 text-left rounded-lg mb-2 transition-colors ${
        currentPage === id ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={() => setCurrentPage(id)}
      disabled={currentPage === id}
    >
      {label}
    </button>
  );

  // Layout: Sidebar + Main panel
  return (
    <div className="flex min-h-[80vh]">
      <nav className="w-56 bg-white border-r px-4 py-6">
        <div className="mb-6 font-bold text-lg text-blue-700">Admin Panel</div>
        {navButton('admin-dashboard', 'Dashboard')}
        {navButton('users', 'Users')}
        {navButton('jobs', 'Jobs')}
        {/* If you're in candidate-profile, add a Back button */}
        {currentPage === 'candidate-profile' && (
          <button
            className="w-full px-4 py-2 text-left rounded-lg bg-gray-100 text-gray-700 mb-2"
            onClick={handleBackFromCandidate}
          >
            &larr; Back to Users
          </button>
        )}
      </nav>
      <main className="flex-1 px-6 py-6">{renderCurrentPage()}</main>
    </div>
  );
}
