import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, Building2, Users, Send } from 'lucide-react';
import { mockJobs } from '../services/mockJobs';
import { getJobById } from '../services/jobService';
import { useAuth } from '../contexts/AuthContext';
import { addApplication } from '../services/applicationService';
import type { Job } from '../types';

export const JobDetails: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
    try {
      const response = await getJobById(parseInt(id));
      setJob(response.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

    fetchJob();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }


  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApply = async () => {
  if (!user || !job) return;

  try {
    await addApplication({
      candidateId: user.id,
      jobId: job.id,
      status: 'pending',
      applicationDate: new Date().toISOString(),
      documents: [],
      evaluations: [],
      interviews: []
    });

    alert('Application submitted successfully!');
    } catch (error) {
      console.error('Failed to apply to job:', error);
      alert('Failed to apply. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">{job.company?.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Full-time
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Remote
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {formatDate(job.postDate)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 lg:ml-8">
                <button
                  onClick={handleApply}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Apply Now
                </button>
                {/* <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Develop and maintain high-quality web applications</li>
                    <li>Collaborate with cross-functional teams to define and implement features</li>
                    <li>Write clean, maintainable, and efficient code</li>
                    <li>Participate in code reviews and technical discussions</li>
                    <li>Stay up-to-date with emerging technologies and best practices</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Bachelor's degree in Computer Science or related field</li>
                    <li>3+ years of experience in web development</li>
                    <li>Proficiency in JavaScript, React, and TypeScript</li>
                    <li>Experience with modern development tools and workflows</li>
                    <li>Strong problem-solving and communication skills</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Competitive salary and equity package</li>
                    <li>Comprehensive health, dental, and vision insurance</li>
                    <li>Flexible work arrangements and remote options</li>
                    <li>Professional development opportunities</li>
                    <li>Generous PTO and parental leave policies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company?.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">{job.company?.sector}</div>
                      <div className="text-sm text-gray-500">Industry</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">{job.company?.address}</div>
                      <div className="text-sm text-gray-500">Location</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">201-500 employees</div>
                      <div className="text-sm text-gray-500">Company size</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-semibold text-gray-900">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Views</span>
                    <span className="font-semibold text-gray-900">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-semibold text-gray-900">{formatDate(job.postDate)}</span>
                  </div>
                </div>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {mockJobs.filter(j => j.id !== job.id).slice(0, 3).map((similarJob) => (
                    <Link
                      key={similarJob.id}
                      to={`/jobs/${similarJob.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-900 mb-1">{similarJob.title}</div>
                      <div className="text-sm text-gray-600 mb-2">{similarJob.company?.name}</div>
                      <div className="text-sm text-green-600 font-semibold">
                        {formatSalary(similarJob.salary)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
