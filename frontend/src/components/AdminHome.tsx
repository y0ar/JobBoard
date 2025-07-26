import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

interface AdminHomeProps {
  stats: {
    applications: number;
    jobs: number;
    users: number;
  };
}

export default function AdminHome({ stats }: AdminHomeProps) {
  const cards = [
    {
      title: 'Total Applications',
      value: stats.applications,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Jobs',
      value: stats.jobs,
      icon: Briefcase,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your JobBoard platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-100`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Quick Stats</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Applications per Job</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.jobs > 0 ? (stats.applications / stats.jobs).toFixed(1) : '0'}
            </p>
          </div>
          {/* <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Platform Growth</p>
            <p className="text-2xl font-bold text-green-600">+12%</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
