import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Candidate } from '../types';
import { ArrowLeft, GraduationCap, Briefcase, FileText, Calendar, Building } from 'lucide-react';
import { getCandidateById } from '../services/candidateService';

const backendUrl = 'https://localhost:7180';

interface CandidateProfileProps {
  candidate?: Candidate;
  onBack?: () => void;
}

export default function CandidateProfile({ candidate: candidateProp, onBack }: CandidateProfileProps) {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(candidateProp || null);
  const [loading, setLoading] = useState(!candidateProp);

  useEffect(() => {
    if (!candidateProp && id) {
      setLoading(true);
      getCandidateById(Number(id))
        .then(res => setCandidate(res.data))
        .finally(() => setLoading(false));
    }
  }, [candidateProp, id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!candidate) {
    return <div className="text-center text-gray-500 py-12">Candidate not found.</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </button>
        )}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {candidate.firstName[0]}{candidate.lastName[0]}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {candidate.firstName} {candidate.lastName}
            </h1>
            <p className="text-gray-600">{candidate.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Education Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-6">
              <GraduationCap className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            </div>
            {candidate.studies && candidate.studies.length > 0 ? (
              <div className="space-y-6">
                {candidate.studies.map((study) => (
                  <div key={study.id} className="border-l-4 border-blue-200 pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{study.degree}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(study.startDate)} - {formatDate(study.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {study.institution}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {calculateDuration(study.startDate, study.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No education information available</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Briefcase className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            </div>
            {candidate.experiences && candidate.experiences.length > 0 ? (
              <div className="space-y-6">
                {candidate.experiences.map((experience) => (
                  <div key={experience.id} className="border-l-4 border-green-200 pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{experience.position}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 flex items-center mb-2">
                      <Building className="h-4 w-4 mr-2" />
                      {experience.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Duration: {calculateDuration(experience.startDate, experience.endDate)}
                    </p>
                    {experience.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{experience.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No work experience information available</p>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
            </div>
            {candidate.resume ? (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-800">File Name</span>
                  </div>
                  <p className="text-purple-900 font-semibold">{candidate.resume.fileName}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">File Type</span>
                  </div>
                  <p className="text-gray-900 uppercase font-mono text-sm">{candidate.resume.fileType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Upload Date</span>
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-gray-900">
                    {new Date(candidate.resume.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <a
                  href={`${backendUrl}/resumes/${candidate.resume?.fileName}`}
                  download={candidate.resume?.fileName}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 italic">No resume uploaded</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold text-gray-900">
                  {candidate.applications?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job Alerts</span>
                <span className="font-semibold text-gray-900">
                  {candidate.jobAlerts?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
