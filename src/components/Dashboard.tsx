import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeSection, setActiveSection] = useState('otherview');

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { id: 'otherview', label: 'Otherview', icon: '📊' },
    { id: 'clips', label: 'Clips', icon: '🎬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'otherview':
        return (
          <div className="content-section">
            <h1>Otherview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Videos</h3>
                <p className="stat-number">45</p>
              </div>
              <div className="stat-card">
                <h3>Total Views</h3>
                <p className="stat-number">12.5K</p>
              </div>
              <div className="stat-card">
                <h3>Subscribers</h3>
                <p className="stat-number">1.2K</p>
              </div>
              <div className="stat-card">
                <h3>Watch Time</h3>
                <p className="stat-number">890h</p>
              </div>
            </div>
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">🎬</span>
                  <span>New clip "Product Demo" uploaded</span>
                  <span className="activity-time">2 hours ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👀</span>
                  <span>Video reached 1K views</span>
                  <span className="activity-time">5 hours ago</span>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👥</span>
                  <span>10 new subscribers this week</span>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'clips':
        return (
          <div className="content-section">
            <h1>Clips</h1>
            <div className="clips-grid">
              <div className="clip-card">
                <div className="clip-thumbnail">🎬</div>
                <h3>Product Demo</h3>
                <p>2:45 • 1.2K views</p>
                <div className="clip-status published">Published</div>
              </div>
              <div className="clip-card">
                <div className="clip-thumbnail">🎥</div>
                <h3>Tutorial Series</h3>
                <p>5:30 • 890 views</p>
                <div className="clip-status draft">Draft</div>
              </div>
              <div className="clip-card">
                <div className="clip-thumbnail">📹</div>
                <h3>Behind the Scenes</h3>
                <p>3:15 • 2.1K views</p>
                <div className="clip-status published">Published</div>
              </div>
              <div className="clip-card">
                <div className="clip-thumbnail">🎞️</div>
                <h3>Company Update</h3>
                <p>1:45 • 567 views</p>
                <div className="clip-status processing">Processing</div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="content-section">
            <h1>Settings</h1>
            <div className="settings-form">
              <div className="setting-item">
                <label>Email Notifications</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="setting-item">
                <label>Dark Mode</label>
                <input type="checkbox" />
              </div>
              <div className="setting-item">
                <label>Language</label>
                <select>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 