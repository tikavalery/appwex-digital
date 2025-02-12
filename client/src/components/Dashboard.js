import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [companyData, setCompanyData] = useState(null);
  
  useEffect(() => {
    // Fetch company data (e.g., subscriptions, content, etc.)
    const fetchData = async () => {
      // Example API call
      const res = await fetch('/api/company');
      const data = await res.json();
      setCompanyData(data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {companyData && (
        <div>
          <h2>Your Subscription Info</h2>
          <p>Current Plan: {companyData.plan.name}</p>
          <p>Status: {companyData.status}</p>
          <Link to="/subscription">Manage Subscription</Link>
        </div>
      )}
      <Link to="/content">Go to Content Management</Link>
    </div>
  );
};

export default Dashboard;
