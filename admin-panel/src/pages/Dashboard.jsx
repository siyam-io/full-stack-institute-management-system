import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import { fetchDashboardStats } from "../api/dashboard.api.js";
import {
  RefreshCw,
  AlertCircle,
  Users,
  Layers,
  UserPlus,
  ClipboardList,
  CreditCard,
  Settings,
  Wallet,
  GraduationCap,
  Package,
  CalendarCheck,
  Building2,
  BookOpen
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

// ============================================================================
// 🌐 GOOGLE ANALYTICS 4 (GA4) INITIALIZATION
// ============================================================================
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // 🔴 REPLACE WITH YOUR ACTUAL GA4 ID
if (!window.GA_INITIALIZED) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  window.GA_INITIALIZED = true;
}

// ============================================================================
// 🧩 MICRO-COMPONENTS
// ============================================================================
const QuickActionButton = ({ label, icon: Icon, to, colorClass, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:shadow-md hover:border-power-red/40 transition-all group h-full"
  >
    <div
      className={`p-3 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon size={22} strokeWidth={2.5} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-power-red transition-colors text-center leading-tight">
      {label}
    </span>
  </Link>
);

const KPICard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  isCurrency = false,
}) => (
  <div className="bg-white/5 rounded-[2rem] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3.5 rounded-2xl ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-black text-white tracking-tight">
        {isCurrency
          ? `৳ ${value?.toLocaleString()}`
          : value?.toLocaleString() || 0}
      </h3>
      <p className="text-sm font-bold text-zinc-500 mt-1">{title}</p>
    </div>
    <div
      className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-10 blur-2xl transition-transform group-hover:scale-150 ${colorClass.split(" ")[0]}`}
    />
  </div>
);

// ============================================================================
// 📊 MAIN DASHBOARD
// ============================================================================
const Dashboard = () => {
  // 🟢 GA4 Pageview Tracking
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Super Admin Dashboard",
    });
  }, []);

  const trackAction = (actionName) => {
    ReactGA.event({
      category: "Dashboard",
      action: "Quick_Action",
      label: actionName,
    });
  };

  // 🟢 Fetch Data
  const {
    data: dashboardData,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000,
  });

  const stats = dashboardData || {};
  const { totals = {}, charts = {} } = stats;

  // 🚀 QUICK ACTIONS ARRAY CONFIGURATION
  const QUICK_ACTIONS = [
    { label: "New Student", icon: UserPlus, to: "/admin/add-student", color: "bg-blue-500/10 text-blue-400" },
    { label: "Collect Fee", icon: CreditCard, to: "/admin/all-students", color: "bg-emerald-500/10 text-emerald-400" },
    { label: "New Batch", icon: Layers, to: "/admin/add-batch", color: "bg-indigo-500/10 text-indigo-400" },
    { label: "Class Workspace", icon: ClipboardList, to: "/admin/manage-batches", color: "bg-amber-500/10 text-amber-400" },
    { label: "Attendance", icon: CalendarCheck, to: "/admin/attendance-book", color: "bg-power-red/10 text-power-red" },
    { label: "Inventory", icon: Package, to: "/admin/inventory", color: "bg-cyan-500/10 text-cyan-400" },
    { label: "Staff", icon: GraduationCap, to: "/admin/all-employees", color: "bg-purple-500/10 text-purple-400" },
    { label: "Courses", icon: BookOpen, to: "/admin/all-courses", color: "bg-fuchsia-500/10 text-fuchsia-400" },
    { label: "Branches", icon: Building2, to: "/admin/branches", color: "bg-teal-500/10 text-teal-400" },
    { label: "Holidays", icon: Settings, to: "/admin/manage-holidays", color: "bg-white/10 text-zinc-400" },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <RefreshCw className="animate-spin text-power-red w-10 h-10" />
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">
          Initializing Command Center...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-power-red/5 border border-power-red/20 rounded-3xl p-10 flex flex-col items-center text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-power-red mb-4" />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            System Offline
          </h2>
          <p className="text-sm text-zinc-400 font-medium mt-2 mb-6">
            Failed to aggregate dashboard data from DB.
          </p>
          <button
            onClick={() => refetch()}
            className="btn-danger"
          >
            Reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight italic uppercase">
            Command Center
          </h1>
          <p className="text-xs font-bold text-zinc-500 mt-1 uppercase tracking-widest">
            Enterprise Analytics & Finance
          </p>
        </div>
        <button
          onClick={() => {
            trackAction("Refresh");
            refetch();
          }}
          disabled={isRefetching}
          className="btn-secondary"
        >
          <RefreshCw
            size={16}
            className={isRefetching ? "animate-spin text-prestige-gold" : ""}
          />
          {isRefetching ? "Syncing..." : "Sync Data"}
        </button>
      </div>

      {/* 2. EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={totals?.finance?.collected || 0}
          icon={Wallet}
          colorClass="bg-emerald-500/10 text-emerald-400"
          isCurrency={true}
        />
        <KPICard
          title="Active Students"
          value={totals?.students?.active}
          icon={Users}
          colorClass="bg-blue-500/10 text-blue-400"
        />
        <KPICard
          title="Active Batches"
          value={totals?.batches?.active}
          icon={Layers}
          colorClass="bg-indigo-500/10 text-indigo-400"
        />
        <KPICard
          title="Total Instructors"
          value={totals?.staff?.instructors}
          icon={GraduationCap}
          colorClass="bg-purple-500/10 text-purple-400"
        />
      </div>

      {/* 3. QUICK ACCESS GRID (Mapped from array) */}
      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-sm">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-5 pl-2">
          System Shortcuts
        </h3>
        {/* Adjusted grid for better responsiveness when array is larger */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
          {QUICK_ACTIONS.map((action, index) => (
            <QuickActionButton
              key={index}
              label={action.label}
              icon={action.icon}
              to={action.to}
              colorClass={action.color}
              onClick={() => trackAction(action.label)}
            />
          ))}
        </div>
      </div>

      {/* 4. MAIN ANALYTICS GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: REVENUE GROWTH (Clean Area Chart) */}
        <div className="bg-white/5 rounded-[2rem] shadow-sm border border-white/10 p-6 md:p-8 flex flex-col min-h-[450px]">
          <div className="mb-8">
            <h3 className="text-lg font-black text-white tracking-tight">
              Revenue Growth
            </h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Monthly Cash Inflow ({new Date().getFullYear()})
            </p>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={charts?.monthlyRevenue}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF233C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF233C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#71717a", fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#71717a", fontWeight: 700 }}
                  tickFormatter={(value) => `৳${value}`}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EF233C"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{
                    r: 6,
                    fill: "#EF233C",
                    stroke: "#fff",
                    strokeWidth: 3,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: DIGITAL BATCH DISTRIBUTION */}
        <div className="bg-white/5 rounded-[2rem] shadow-sm border border-white/10 p-6 md:p-8 flex flex-col min-h-[450px]">
          <div className="mb-8">
            <h3 className="text-lg font-black text-white tracking-tight">
              Batch Population
            </h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Active students per batch digitally aligned
            </p>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={charts?.batchDistribution}
                layout="vertical"
                margin={{ top: 0, right: 80, left: 40, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#a1a1aa", fontWeight: "bold" }}
                  width={120}
                />
                <RechartsTooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "bold",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#EF233C"
                  radius={[0, 8, 8, 0]}
                  barSize={24}
                >
                  <LabelList
                    dataKey="count"
                    position="right"
                    fill="#EF233C"
                    fontWeight="black"
                    fontSize={12}
                    formatter={(val) => `${val} Students`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;