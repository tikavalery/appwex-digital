import React, { useState, useEffect } from 'react';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    // Fetch subscriptions data
    const fetchSubscriptions = async () => {
      const res = await fetch('/api/subscription');
      const data = await res.json();
      setSubscriptions(data);
    };

    fetchSubscriptions();
  }, []);

  const handleChangePlan = async (newPlan) => {
    const res = await fetch('/api/subscription', {
      method: 'PUT',
      body: JSON.stringify({ planId: newPlan }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Plan changed successfully!');
    } else {
      alert('Failed to change plan');
    }
  };

  return (
    <div>
      <h1>Manage Your Subscription</h1>
      <h2>Available Plans</h2>
      <ul>
        {subscriptions.map((plan) => (
          <li key={plan._id}>
            <p>{plan.name}</p>
            <button onClick={() => handleChangePlan(plan._id)}>Change Plan</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionPage;
