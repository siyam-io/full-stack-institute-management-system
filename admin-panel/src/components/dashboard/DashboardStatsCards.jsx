
import {
  Users,
  UserPlus,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const DashboardStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Students */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Total Students</p>
            <p className="text-3xl font-bold mt-2">
              {stats?.totals.students.total.toLocaleString()}
            </p>
          </div>
          <div className="bg-power-red/10 p-3 rounded-lg">
            <Users className="text-power-red" size={24} />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-zinc-500">
            <span className="text-green-400 font-semibold">
              {stats?.totals.students.active} active
            </span>
            {" • "}
            <span className="text-power-red font-semibold">
              {stats?.totals.students.completed} completed
            </span>
          </p>
        </div>
      </div>

      {/* Active Students */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Active Students</p>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {stats?.totals.students.active.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-lg">
            <UserPlus className="text-green-400" size={24} />
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Completed</p>
            <p className="text-3xl font-bold mt-2 text-power-red">
              {stats?.totals.students.completed.toLocaleString()}
            </p>
          </div>
          <div className="bg-power-red/10 p-3 rounded-lg">
            <CheckCircle className="text-power-red" size={24} />
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Courses</p>
            <p className="text-3xl font-bold mt-2">
              {stats?.totals.courses.total.toLocaleString()}
            </p>
          </div>
          <div className="bg-power-red/10 p-3 rounded-lg">
            <BookOpen className="text-power-red" size={24} />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold">{stats?.totals.courses.active} active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCards;