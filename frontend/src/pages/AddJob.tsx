import { useState } from 'react';
import { addJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';

export default function AddJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    companyId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      salary: parseFloat(form.salary),
      companyId: parseInt(form.companyId)
    };
    await addJob(payload as any);
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
      <input name="title" placeholder="Title" className="input" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" className="input" value={form.description} onChange={handleChange} />
      <input name="location" placeholder="Location" className="input" value={form.location} onChange={handleChange} />
      <input name="salary" placeholder="Salary" className="input" value={form.salary} onChange={handleChange} />
      <input name="companyId" placeholder="Company ID" className="input" value={form.companyId} onChange={handleChange} />
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
