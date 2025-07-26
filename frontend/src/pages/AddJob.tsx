import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { addJob } from '../services/jobService';

export const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    companyName: '',
    companySector: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    jobType: 'full-time',
    workMode: 'remote',
    expirationDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const jobToSend = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        salary: parseFloat(formData.salary),
        workMode: formData.workMode,
        jobType: formData.jobType,
        publicationDate: new Date().toISOString(),
        expirationDate: formData.expirationDate ?? new Date(formData.expirationDate).toISOString(),
        companyId: 1,
        applications: [],
      };

      await addJob(jobToSend);
      navigate('/');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
          <div className="text-center">
            <div className="bg-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4">
              <Plus className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
            <p className="text-gray-600">Find the perfect candidate for your open position</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="e.g. Casablanca, Morocco"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Salary (MAD) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="salary"
                      name="salary"
                      type="number"
                      required
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="120000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    required
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="workMode" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Mode *
                  </label>
                  <select
                    id="workMode"
                    name="workMode"
                    required
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="remote">Remote</option>
                    <option value="on-site">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Expiration Date */}
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date *
                  </label>
                  <input
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    required
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Describe the role, responsibilities, requirements, and benefits..."
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            {/* <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Company Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g. TechCorp Solutions"
                  />
                </div>

                <div>
                  <label htmlFor="companySector" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry/Sector *
                  </label>
                  <input
                    id="companySector"
                    name="companySector"
                    type="text"
                    required
                    value={formData.companySector}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g. Technology, Healthcare, Finance"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address *
                  </label>
                  <input
                    id="companyAddress"
                    name="companyAddress"
                    type="text"
                    required
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="e.g. 123 Tech Street, San Francisco, CA 94105"
                  />
                </div>

                <div>
                  <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Phone *
                  </label>
                  <input
                    id="companyPhone"
                    name="companyPhone"
                    type="tel"
                    required
                    value={formData.companyPhone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Email *
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    required
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </div> */}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                {isLoading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddJob;
