import React, { useState, useEffect } from 'react';

const PlanSelectionPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('/api/plans');
      const data = await res.json();
      setPlans(data);
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId) => {
    const res = await fetch('/api/subscription', {
      method: 'POST',
      body: JSON.stringify({ planId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Plan selected successfully!');
    } else {
      alert('Failed to select plan');
    }
  };

  return (
    <div>
      <h1>Select a Plan</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <p>{plan.name} - {plan.price}</p>
            <button onClick={() => handleSelectPlan(plan._id)}>Select Plan</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanSelectionPage;
