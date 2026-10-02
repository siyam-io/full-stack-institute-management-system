// components/dashboard/RecentActivities.jsx
import React from 'react';
import { Users } from 'lucide-react';

const RecentActivities = ({ recentActivities, onRefresh }) => {
  const formatStatusName = (status) => {
    const statusMap = {
      active: "Active",
      completed: "Completed",
      inactive: "Inactive",
      discontinued: "Discontinued",
      on_leave: "On Leave"
    };
    return statusMap[status] || status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <button 
          onClick={onRefresh}
          className="text-sm text-power-red hover:text-power-red/80"
        >
          Refresh
        </button>
      </div>
      <div className="space-y-3">
        {recentActivities && recentActivities.length > 0 ? (
          recentActivities.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:bg-white/5">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded ${
                  activity.status === 'active' ? 'bg-green-500/10' :
                  activity.status === 'completed' ? 'bg-blue-500/10' : 'bg-white/10'
                }`}>
                  <Users size={16} className={
                    activity.status === 'active' ? 'text-green-400' :
                    activity.status === 'completed' ? 'text-blue-400' : 'text-zinc-400'
                  } />
                </div>
                <div>
                  <p className="font-medium">{activity.student_name}</p>
                  <p className="text-sm text-zinc-400">ID: {activity.student_id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium capitalize">
                  {formatStatusName(activity.status)}
                </p>
                <p className="text-xs text-zinc-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500 py-4">No recent activities</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;