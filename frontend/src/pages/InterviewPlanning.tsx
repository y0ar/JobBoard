import React, { useState, useEffect } from 'react';
import type { Interview, Application } from '../types';
import { Calendar, MapPin, User, FileText, Edit, Trash2, Plus, Search } from 'lucide-react';
import { getAllInterviews, createInterview, updateInterview, deleteInterview } from '../services/interviewService';
import { getAllApplications } from '../services/applicationService';
import { useAuth } from '../contexts/AuthContext';

export default function InterviewPlanning() {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newInterview, setNewInterview] = useState<Omit<Interview, 'id'>>({
    dateTime: '',
    location: '',
    interviewer: '',
    result: '',
    notes: '',
    applicationId: 0
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllInterviews(), getAllApplications()])
      .then(([intRes, appRes]) => {
        setInterviews(
          Array.isArray(intRes.data)
            ? intRes.data
            : (intRes.data as any).interviews || []
        );
        setApplications(appRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // =========== Restrict interviews to only relevant to the current user ============
  // Candidates see only their interviews; others see all
  let visibleInterviews = interviews;
  if (user?.userType?.toLowerCase() === 'candidate') {
    // Find all application IDs belonging to this candidate
    const candidateAppIds = applications
      .filter(app => app.candidateId === user.id)
      .map(app => app.id);
    visibleInterviews = interviews.filter(iv => candidateAppIds.includes(iv.applicationId));
  }

  // Filtering
  const filteredInterviews = visibleInterviews.filter(interview => {
    const application = applications.find(app => app.id === interview.applicationId);
    const candidateName = application?.candidate
      ? `${application.candidate.firstName} ${application.candidate.lastName}` : '';
    const jobTitle = application?.job?.title || '';

    return interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // CRUD handlers...
  const handleCreateInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterview.applicationId > 0) {
      try {
        const res = await createInterview(newInterview);
        setInterviews([...interviews, res.data]);
        setNewInterview({
          dateTime: '',
          location: '',
          interviewer: '',
          result: '',
          notes: '',
          applicationId: 0
        });
        setShowCreateForm(false);
      } catch (err) {
        alert('Failed to create interview.');
      }
    }
  };

  const handleUpdateInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInterview) {
      try {
        const res = await updateInterview(editingInterview.id, editingInterview);
        setInterviews(interviews.map(iv => iv.id === res.data.id ? res.data : iv));
        setEditingInterview(null);
      } catch (err) {
        alert('Failed to update interview.');
      }
    }
  };

  const handleDeleteInterview = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this interview?')) return;
    try {
      await deleteInterview(id);
      setInterviews(interviews.filter(iv => iv.id !== id));
    } catch {
      alert('Failed to delete interview.');
    }
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading...</div>;

  // Restrict scheduling/editing/deleting to only non-candidates
  const isCandidate = user?.userType?.toLowerCase() === 'candidate';

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Planning</h1>
            <p className="text-gray-600">Manage and schedule interviews for applications</p>
          </div>
          {!isCandidate && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by interviewer, candidate, job title, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Interviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInterviews.map((interview) => {
          const application = applications.find(app => app.id === interview.applicationId);
          return (
            <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {application?.candidate ?
                        `${application.candidate.firstName} ${application.candidate.lastName}` :
                        'Unknown Candidate'
                      }
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {application?.job?.title || 'Unknown Position'}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDateTime(interview.dateTime)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {interview.location}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Interviewer: {interview.interviewer}
                    </div>
                  </div>
                </div>
                {!isCandidate && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => setEditingInterview(interview)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                      title="Edit Interview"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteInterview(interview.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                      title="Delete Interview"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {interview.result && (
                <div className="mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResultColor(interview.result)}`}>
                    {interview.result}
                  </span>
                </div>
              )}

              {interview.notes && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Notes</span>
                  </div>
                  <p className="text-sm text-gray-600">{interview.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No interviews scheduled</p>
        </div>
      )}

      {/* Create Interview Modal */}
      {!isCandidate && showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Schedule New Interview</h2>
            <form onSubmit={handleCreateInterview}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application</label>
                  <select
                    value={newInterview.applicationId}
                    onChange={(e) => setNewInterview({ ...newInterview, applicationId: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value={0}>Select an application</option>
                    {applications.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.candidate ? `${app.candidate.firstName} ${app.candidate.lastName}` : 'Unknown'} - {app.job?.title || 'Unknown Position'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={newInterview.dateTime}
                    onChange={(e) => setNewInterview({ ...newInterview, dateTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newInterview.location}
                    onChange={(e) => setNewInterview({ ...newInterview, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Office, Video call, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                  <input
                    type="text"
                    value={newInterview.interviewer}
                    onChange={(e) => setNewInterview({ ...newInterview, interviewer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Interviewer name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    value={newInterview.notes}
                    onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes or preparation details"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Interview Modal */}
      {!isCandidate && editingInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Interview</h2>
            <form onSubmit={handleUpdateInterview}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={editingInterview.dateTime}
                    onChange={(e) => setEditingInterview({ ...editingInterview, dateTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingInterview.location}
                    onChange={(e) => setEditingInterview({ ...editingInterview, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                  <input
                    type="text"
                    value={editingInterview.interviewer}
                    onChange={(e) => setEditingInterview({ ...editingInterview, interviewer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                  <select
                    value={editingInterview.result}
                    onChange={(e) => setEditingInterview({ ...editingInterview, result: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select result</option>
                    <option value="pending">Pending</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={editingInterview.notes}
                    onChange={(e) => setEditingInterview({ ...editingInterview, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingInterview(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
