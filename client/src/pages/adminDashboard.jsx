import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  Plus,
  Search,
  TrendingUp,
  Eye,
  FileText,
  Edit,
  EyeOff,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  History,
} from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Posts",
      value: "128",
      change: "+12.5% from last month",
      icon: FileText,
      iconBg: "bg-[#5671FF]/10",
      iconColor: "text-[#5671FF]",
      trend: "up",
    },
    {
      label: "Active News",
      value: "42",
      subtitle: "Currently visible to students",
      icon: Eye,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      label: "Drafts",
      value: "14",
      subtitle: "Pending review and publish",
      icon: FileText,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "Incoming IT Week 2024: Phase 1",
      description: "Announcement about the upcoming events for the...",
      status: "PUBLISHED",
      category: "Event",
      date: "Oct 12, 2023",
      statusColor: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      id: 2,
      title: "New Membership Fees Announcement",
      description: "Updated breakdown of fees for the second semester of...",
      status: "DRAFT",
      category: "Finance",
      date: "Oct 10, 2023",
      statusColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      id: 3,
      title: "Election Results: Local Chapter Officers",
      description:
        "Official list of elected officers for the PSITS-WIT Chapter.",
      status: "PUBLISHED",
      category: "Organization",
      date: "Oct 05, 2023",
      statusColor: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      id: 4,
      title: "Capstone Design Guidelines 2024",
      description: "Important updates to the documentation requirements...",
      status: "HIDDEN",
      category: "Academic",
      date: "Sep 28, 2023",
      statusColor: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    },
  ];

  const recentLogs = [
    {
      title: 'Admin Updated "IT Week 2024"',
      time: "2 HOURS AGO",
      icon: Edit,
      iconBg: "bg-[#5671FF]/10",
      iconColor: "text-[#5671FF]",
    },
    {
      title: 'New Resource Added: "DBMS Reviewer"',
      time: "5 HOURS AGO",
      icon: Plus,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      title: 'Archived Post "Membership 2023"',
      time: "1 DAY AGO",
      icon: EyeOff,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E1528] text-slate-100 flex overflow-hidden font-['Space_Grotesk',sans-serif]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0E1528] border-r border-[#5671FF]/20 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="bg-[#5671FF]/10 rounded-full p-2 ring-1 ring-[#5671FF]/30">
              <img
                src="/assets/PSITS_logo.png"
                alt="PSITS Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight">
                PSITS-WIT
              </h1>
              <p className="text-[#5671FF]/60 text-xs font-medium">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#5671FF] text-white shadow-lg shadow-[#5671FF]/20"
            >
              <Bell className="w-5 h-5" />
              <p className="text-sm font-semibold">Manage Announcements</p>
            </Link>
            <Link
              to="/admin/news"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all"
            >
              <FileText className="w-5 h-5" />
              <p className="text-sm font-medium">Manage News</p>
            </Link>
            <Link
              to="/admin/resources"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all"
            >
              <FileText className="w-5 h-5" />
              <p className="text-sm font-medium">Academic Resources</p>
            </Link>
            <Link
              to="/admin/logs"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#5671FF]/10 hover:text-[#5671FF] transition-all"
            >
              <History className="w-5 h-5" />
              <p className="text-sm font-medium">User Logs</p>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-[#5671FF]/5 rounded-xl border border-[#5671FF]/10">
            <div className="h-10 w-10 rounded-full bg-[#5671FF]/20 flex items-center justify-center text-[#5671FF] font-bold">
              JD
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-xs font-bold truncate">John Doe</p>
              <p className="text-[10px] text-slate-500">admin@wit.edu.ph</p>
            </div>
          </div>
          <button className="w-full bg-slate-800 text-slate-200 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-[#5671FF]/10 bg-[#0E1528]/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight">
              Manage Announcements
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-[#5671FF]/50 text-white placeholder:text-slate-500"
                placeholder="Search announcements..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/5 rounded-lg text-slate-500 hover:text-[#5671FF] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
            onClick={() => navigate('/admin/create-announcement')}
            className="bg-[#FF602D] hover:bg-[#FF602D]/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#FF602D]/30 flex items-center gap-2 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Add New Post
            </button>
          </div>
        </header>

        <div className="p-10 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-2xl border border-[#5671FF]/5 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div
                    className={`p-2 ${stat.iconBg} ${stat.iconColor} rounded-lg`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                {stat.change && (
                  <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </p>
                )}
                {stat.subtitle && (
                  <p className="text-slate-500 text-sm mt-2">{stat.subtitle}</p>
                )}
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-[#5671FF]/10">
            {["all", "published", "drafts", "archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 border-b-2 text-sm font-bold capitalize ${
                  activeTab === tab
                    ? "border-[#5671FF] text-[#5671FF]"
                    : "border-transparent text-slate-500 hover:text-white transition-colors"
                }`}
              >
                {tab === "all" ? "All Posts" : tab}
              </button>
            ))}
          </div>

          {/* Data Table */}
          <div className="bg-white/5 rounded-2xl border border-[#5671FF]/5 overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  <th className="px-6 py-4">Title & Description</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr
                    key={announcement.id}
                    className="hover:bg-[#5671FF]/5 transition-colors group border-t border-[#5671FF]/5"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <p className="font-bold text-white group-hover:text-[#5671FF] transition-colors">
                          {announcement.title}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {announcement.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border ${announcement.statusColor}`}
                      >
                        {announcement.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-slate-400">
                        {announcement.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {announcement.date}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-500 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 rounded-lg transition-all"
                          title={
                            announcement.status === "HIDDEN" ? "Show" : "Hide"
                          }
                        >
                          {announcement.status === "HIDDEN" ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-[#5671FF]/5 bg-white/5">
              <p className="text-xs text-slate-500">
                Showing 1 to 4 of 128 results
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-[#5671FF]/20 text-slate-500 hover:border-[#5671FF] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 rounded bg-[#5671FF] text-white text-xs font-bold">
                  1
                </button>
                <button className="px-3 py-1 rounded border border-[#5671FF]/20 text-slate-500 hover:border-[#5671FF] transition-colors text-xs font-bold">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-[#5671FF]/20 text-slate-500 hover:border-[#5671FF] transition-colors text-xs font-bold">
                  3
                </button>
                <button className="px-3 py-1 rounded border border-[#5671FF]/20 text-slate-500 hover:border-[#5671FF] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Charts and Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Platform Engagement */}
            <div className="bg-white/5 rounded-2xl p-6 border border-[#5671FF]/5">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#5671FF]" />
                Platform Engagement
              </h4>
              <div className="h-48 flex items-end justify-between gap-2">
                {[40, 60, 85, 70, 95, 50, 80].map((height, index) => (
                  <div
                    key={index}
                    className="w-full bg-[#5671FF]/10 rounded-t-lg relative"
                    style={{ height: `${height}%` }}
                  >
                    <div
                      className={`absolute inset-x-0 bottom-0 rounded-t-lg h-3/4 ${
                        height > 80
                          ? "bg-[#5671FF] shadow-lg shadow-[#5671FF]/20"
                          : "bg-[#5671FF]/30"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 px-1">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-white/5 rounded-2xl p-6 border border-[#5671FF]/5">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-[#5671FF]" />
                Recent Logs
              </h4>
              <div className="space-y-4">
                {recentLogs.map((log, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div
                      className={`p-2 ${log.iconBg} ${log.iconColor} rounded-full`}
                    >
                      <log.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{log.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">
                        {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
