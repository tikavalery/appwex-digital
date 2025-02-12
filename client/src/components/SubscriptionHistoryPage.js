import React, { useState, useEffect } from 'react';

const SubscriptionHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('/api/subscription/history');
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h1>Subscription History</h1>
      <ul>
        {history.map((entry) => (
          <li key={entry._id}>
            <p>{entry.date}: {entry.plan.name}</p>
            <p>Status: {entry.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionHistoryPage;
