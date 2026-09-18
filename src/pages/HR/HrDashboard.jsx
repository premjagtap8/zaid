import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaCalendarCheck,
  FaCalendarAlt,
  FaUserPlus,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import "./HrDashboard.css";

// Adjust this to wherever your API is actually mounted.
// e.g. if your user router is mounted at app.use("/api/users", userRouter),
// EMPLOYEES stays "/users/employees". Update as needed.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const ENDPOINTS = {
  employees: `${API_BASE}/users/employees`,
  leaves: `${API_BASE}/leaves`,
  holidays: `${API_BASE}/leaves/holidays`,
  attendance: `${API_BASE}/newAttendance`,
};

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function formatHolidayDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardHome() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [attendancePercent, setAttendancePercent] = useState(0);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const [employeesRes, leavesRes, holidaysRes, attendanceRes] =
          await Promise.all([
            fetch(ENDPOINTS.employees, { headers: authHeaders() }),
            fetch(ENDPOINTS.leaves, { headers: authHeaders() }),
            fetch(ENDPOINTS.holidays, { headers: authHeaders() }),
            fetch(ENDPOINTS.attendance, { headers: authHeaders() }),
          ]);

        const [employeesData, leavesData, holidaysData, attendanceData] =
          await Promise.all([
            employeesRes.json(),
            leavesRes.json(),
            holidaysRes.json(),
            attendanceRes.json(),
          ]);

        // ---- Employees ----
        const employees = employeesData.data || employeesData || [];
        const employeeCount = Array.isArray(employees) ? employees.length : 0;
        setTotalEmployees(employeeCount);

        // ---- Pending leaves ----
        const leaves = leavesData.data || leavesData || [];
        const pendingCount = Array.isArray(leaves)
          ? leaves.filter((l) => l.status === "PENDING" || l.status === "pending").length
          : 0;
        setPendingLeaves(pendingCount);

        // ---- Today's attendance % ----
        const attendanceRecords = attendanceData.data || attendanceData || [];
        const today = todayStr();
        const todayRecords = Array.isArray(attendanceRecords)
          ? attendanceRecords.filter((a) => {
              const recordDate =
                typeof a.date === "string" ? a.date.split("T")[0] : "";
              return recordDate === today;
            })
          : [];
        const presentToday = todayRecords.filter(
          (a) => a.status === "PRESENT"
        ).length;
        const percent =
          employeeCount > 0
            ? Math.round((presentToday / employeeCount) * 100)
            : 0;
        setAttendancePercent(percent);

        // ---- Upcoming holidays ----
        const holidays = holidaysData.data || holidaysData || [];
        const upcoming = Array.isArray(holidays)
          ? holidays
              .filter((h) => new Date(h.date) >= new Date(today))
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 2)
          : [];
        setUpcomingHolidays(upcoming);
      } catch (err) {
        console.error("DASHBOARD LOAD ERROR:", err);
        setError("Couldn't load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const stats = [
    {
      label: "Total employees",
      value: totalEmployees,
      icon: <FaUsers />,
      tone: "blue",
    },
    {
      label: "Pending leaves",
      value: pendingLeaves,
      icon: <FaClipboardList />,
      tone: "amber",
    },
    {
      label: "Today's attendance",
      value: `${attendancePercent}%`,
      icon: <FaCalendarCheck />,
      tone: "green",
    },
    {
      label: "Upcoming holidays",
      value: upcomingHolidays.length,
      icon: <FaCalendarAlt />,
      tone: "purple",
    },
  ];

  if (loading) {
    return <div className="dash-state">Loading dashboard…</div>;
  }

  if (error) {
    return <div className="dash-state dash-state-error">{error}</div>;
  }

  return (
    <div className="dash-root">
      <div className="dash-header">
        <h1>HR dashboard</h1>
        <p>Quick overview of employees, leaves, attendance and holidays</p>
      </div>

      <div className="dash-stats-grid">
        {stats.map((s) => (
          <div className="dash-stat-card" key={s.label}>
            <div className={`dash-stat-icon dash-stat-icon-${s.tone}`}>
              {s.icon}
            </div>
            <div>
              <div className="dash-stat-value">{s.value}</div>
              <div className="dash-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-panels-grid">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Upcoming holidays</h2>
            <button
              type="button"
              className="dash-link-btn"
              onClick={() => navigate("/hr-dashboard/holidays")}
            >
              View all
            </button>
          </div>

          {upcomingHolidays.length === 0 ? (
            <p className="dash-empty">No upcoming holidays.</p>
          ) : (
            <ul className="dash-holiday-list">
              {upcomingHolidays.map((h) => (
                <li key={h._id || h.name}>
                  <span className="dash-holiday-dot" />
                  <div>
                    <strong>{h.name}</strong>
                    <div className="dash-holiday-date">
                      {formatHolidayDate(h.date)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Quick actions</h2>
          </div>

          <div className="dash-quick-actions">
            <button
              type="button"
              onClick={() => navigate("/hr-dashboard/employees/add")}
            >
              <FaUserPlus />
              Add employee
            </button>
            <button
              type="button"
              onClick={() => navigate("/hr-dashboard/shifting/add")}
            >
              <FaClock />
              Add shifting
            </button>
            <button
              type="button"
              onClick={() => navigate("/hr-dashboard/salary")}
            >
              <FaMoneyBillWave />
              View salary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
