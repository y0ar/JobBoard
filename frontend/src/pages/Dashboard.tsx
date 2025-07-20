import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  MapPin,
  Building2,
  Save,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Users
} from 'lucide-react';
import { getRecruiterById } from '../services/recruiterService';
import { addStudy, deleteStudy } from '../services/studyService';
import { addExperience, deleteExperience } from '../services/experienceService';
import { updateCandidate, getCandidateById, getExperiencesByCandidateId, getStudiesByCandidateId, getApplicationsByCandidateId } from '../services/candidateService';
import { getApplicationsByRecruiterId } from '../services/recruiterService';
import { getAllJobs } from '../services/jobService';
import { uploadResume, deleteResume } from '../services/resumeService';
import { useAuth } from '../contexts/AuthContext';
import type { Candidate, Recruiter, Experience, Study, Application, Job } from '../types';

export const Dashboard: React.FC = () => {
  const backendUrl = 'https://localhost:7180';
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const userType = user?.userType?.toLowerCase() as 'candidate' | 'recruiter' | undefined;
  const [isEditing, setIsEditing] = useState(false);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: '',
  });

  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [newStudy, setNewStudy] = useState<Partial<Study>>({
    degree: '',
    institution: '',
    startDate: '',
    endDate: ''
  });

  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddStudy, setShowAddStudy] = useState(false);

  useEffect(() => {
  if (!user || !userType) return;

  const fetchData = async () => {
    try {
      const userId = user.id;

      if (userType === 'candidate') {
        const [cand, exps, studies, apps] = await Promise.all([
          getCandidateById(userId),
          getExperiencesByCandidateId(userId),
          getStudiesByCandidateId(userId),
          getApplicationsByCandidateId(userId),
        ]);

        setCandidate({ ...cand.data, experiences: exps, studies: studies, applications: apps });
      } else if (userType === 'recruiter') {
        const [rec, apps, jobs] = await Promise.all([
          getRecruiterById(userId),
          getApplicationsByRecruiterId(userId),
          getAllJobs(),
        ]);

        setRecruiter(rec.data);
        setApplications(apps);
        setJobs(jobs.data.filter((job) => job.companyId === rec.data.companyId));
      }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchData();
  }, [user, userType]);


  useEffect(() => {
    if (userType === 'candidate' && candidate) {
        setProfileForm({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phoneNumber: '',
        department: ''
        });
    } else if (userType === 'recruiter' && recruiter) {
        setProfileForm({
        firstName: recruiter.firstName,
        lastName: recruiter.lastName,
        email: recruiter.email,
        phoneNumber: recruiter.phoneNumber || '',
        department: recruiter.department || ''
        });
    }
  }, [candidate, recruiter, userType]);


  const handleProfileSave = async () => {
    if (userType === 'candidate' && candidate) {
      // Mock update for candidate
      const updatedCandidate: Candidate = {
        ...candidate,
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email
      };
      setCandidate(updatedCandidate);
      setIsEditing(false);

      try {
        const response = await updateCandidate(candidate.id, updatedCandidate);
        setCandidate(response.data);
        setIsEditing(false);
      } catch (error) {
          console.error('Failed to update candidate profile:', error);
      }
    } else if (userType === 'recruiter' && recruiter) {
      // Mock update for recruiter
      const updatedRecruiter: Recruiter = {
        ...recruiter,
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phoneNumber: profileForm.phoneNumber,
        department: profileForm.department
      };
      setRecruiter(updatedRecruiter);
      setIsEditing(false);
    }
  };

  const handleAddExperience = async () => {
    if (!candidate || !newExperience.position || !newExperience.company || !newExperience.startDate) return;

    try {
      const experienceToAdd: Omit<Experience, 'id'> = {
        position: newExperience.position,
        company: newExperience.company,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate || '',
        description: newExperience.description || '',
        candidateId: candidate.id
      };

      const response = await addExperience(experienceToAdd);

      setCandidate({
        ...candidate,
        experiences: [...(candidate.experiences || []), response.data]
      });

      setNewExperience({ position: '', company: '', startDate: '', endDate: '', description: '' });
      setShowAddExperience(false);
    } catch (error) {
        console.error('Failed to save experience:', error);
    }
  };

  const handleAddStudy = async () => {
    if (!candidate || !newStudy.degree || !newStudy.institution || !newStudy.startDate) return;

    try {
      const studyToAdd: Omit<Study, 'id'> = {
        degree: newStudy.degree,
        institution: newStudy.institution,
        startDate: newStudy.startDate,
        endDate: newStudy.endDate || '',
        candidateId: candidate.id
      };

      const response = await addStudy(studyToAdd);

      setCandidate({
        ...candidate,
        studies: [...(candidate.studies || []), response.data]
      });

      setNewStudy({ degree: '', institution: '', startDate: '', endDate: '' });
      setShowAddStudy(false);
    } catch (error) {
      console.error('Failed to save study:', error);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!candidate) return;

    try {
      await deleteExperience(id);
      setCandidate({
        ...candidate,
        experiences: candidate.experiences.filter(exp => exp.id !== id)
      });
    } catch (error) {
        console.error('Failed to delete experience:', error);
    }
  };

  const handleDeleteStudy = async (id: number) => {
    if (!candidate) return;

    try {
      await deleteStudy(id);
      setCandidate({
        ...candidate,
        studies: candidate.studies.filter(study => study.id !== id)
      });
    } catch (error) {
        console.error('Failed to delete study:', error);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !candidate) return;

    const file = event.target.files[0];
    setSelectedResume(file);
    setUploading(true);

    try {
      if (candidate.resume?.id) {
        await deleteResume(candidate.resume.id);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('candidateId', candidate.id.toString());

      const response = await uploadResume(formData);

      setCandidate({
        ...candidate,
        resume: response.data,
      });
    } catch (error) {
        console.error('Resume upload failed', error);
    } finally {
        setUploading(false);
    }
  };

  const handleStatusUpdate = (applicationId: number, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus }
        : app
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'interview': return <Calendar className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const renderCandidateContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleProfileSave}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{candidate?.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{candidate?.lastName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{candidate?.email}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Management</h2>
            
            {candidate?.resume ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Resume</h3>
                <p className="text-gray-600 mb-4">{candidate?.resume?.fileName}</p>
                <p className="text-sm text-gray-500 mb-6">
                  Uploaded on {new Date(candidate?.resume?.uploadDate).toLocaleDateString()}
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Eye className="h-4 w-4 mr-2" />
                    View Resume
                  </button>
                  <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Replace Resume
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleResumeUpload}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
                <p className="text-gray-600 mb-6">
                  Upload your resume to make it easier for employers to find you
                </p>
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  <Upload className="h-5 w-5 mr-2" />
                  {uploading ? 'Uploading...' : 'Choose File'}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleResumeUpload}
                  />
                </label>
              </div>
            )}
          </div>
        );

      case 'applications':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h2>
            
            <div className="space-y-4">
              {candidate?.applications?.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {application.job?.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>{application.job?.company?.name}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Applied on {new Date(application.applicationDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </span>
                      <button
                        onClick={() => navigate(`/jobs/${application.jobId}`)}
                        className="inline-flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8">
            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                <button
                  onClick={() => setShowAddExperience(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </button>
              </div>

              {showAddExperience && (
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Position Title"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="End Date (Optional)"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Job Description"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddExperience}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Save Experience
                    </button>
                    <button
                      onClick={() => setShowAddExperience(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {candidate?.experiences?.map((experience) => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{experience.position}</h3>
                        <p className="text-gray-600 mb-2">{experience.company}</p>
                        <p className="text-sm text-gray-500 mb-3">
                          {new Date(experience.startDate).toLocaleDateString()} - 
                          {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                        </p>
                        <p className="text-gray-700">{experience.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(experience.id)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                <button
                  onClick={() => setShowAddStudy(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </button>
              </div>

              {showAddStudy && (
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={newStudy.degree}
                      onChange={(e) => setNewStudy({ ...newStudy, degree: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={newStudy.institution}
                      onChange={(e) => setNewStudy({ ...newStudy, institution: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newStudy.startDate}
                      onChange={(e) => setNewStudy({ ...newStudy, startDate: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="End Date (Optional)"
                      value={newStudy.endDate}
                      onChange={(e) => setNewStudy({ ...newStudy, endDate: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddStudy}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Save Education
                    </button>
                    <button
                      onClick={() => setShowAddStudy(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {candidate?.studies?.map((study) => (
                  <div key={study.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{study.degree}</h3>
                        <p className="text-gray-600 mb-2">{study.institution}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(study.startDate).toLocaleDateString()} - 
                          {study.endDate ? new Date(study.endDate).toLocaleDateString() : 'Present'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteStudy(study.id)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderRecruiterContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recruiter Profile</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleProfileSave}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{recruiter?.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{recruiter?.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{recruiter?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileForm.phoneNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{recruiter?.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 py-3">{recruiter?.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <p className="text-gray-900 py-3">{recruiter?.company?.name}</p>
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Job Posts</h2>
              <button
                onClick={() => navigate('/add-job')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </button>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Posted on {new Date(job.postDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <button
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="inline-flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'applicants':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Applicants</h2>
            
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-blue-600 p-2 rounded-full">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.candidate?.firstName} {application.candidate?.lastName}
                          </h3>
                          <p className="text-gray-600">{application.candidate?.email}</p>
                        </div>
                      </div>
                      
                      <div className="ml-14">
                        <p className="text-gray-700 mb-2">
                          Applied for: <span className="font-medium">{application.job?.title}</span>
                        </p>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Applied on {new Date(application.applicationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status}</span>
                        </span>
                        <button className="inline-flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 transition-colors duration-200">
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </button>
                      </div>
                      
                      {/* Status Update Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'accepted')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'interview')}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                        >
                          Interview
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'rejected')}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userType === 'candidate' ? 'Candidate Dashboard' : 'Recruiter Dashboard'}
                </h1>
                <p className="text-gray-600">
                  {userType === 'candidate' 
                    ? 'Manage your profile, applications, and career information'
                    : 'Manage your job posts and review applicants'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {userType === 'candidate' 
                        ? `${candidate?.firstName ?? ''} ${candidate?.lastName ?? ''}`
                        : `${recruiter?.firstName ?? ''} ${recruiter?.lastName ?? ''}`}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">{userType}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {(userType === 'candidate'
                    ? [
                        { id: 'profile', label: 'Profile Settings', icon: Settings },
                        { id: 'resume', label: 'Resume', icon: FileText },
                        { id: 'applications', label: 'My Applications', icon: Briefcase },
                        { id: 'experience', label: 'Experience & Education', icon: GraduationCap },
                      ]
                    : [
                        { id: 'profile', label: 'Profile Settings', icon: Settings },
                        { id: 'jobs', label: 'My Job Posts', icon: Briefcase },
                        { id: 'applicants', label: 'Applicants', icon: Users },
                      ]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              {userType === 'candidate' ? renderCandidateContent() : renderRecruiterContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
