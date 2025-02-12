import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Default to "client"
  
 // const [companyId, setCompanyId] = useState('');
  //const [companies, setCompanies] = useState([]); // To hold companies (if needed)
  const [errorMessage, setErrorMessage] = useState('');
  
  // Fetch list of companies (assuming you have a route to get companies)
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await fetch('/api/companies'); // Endpoint to fetch companies
//         const data = await response.json();
//         setCompanies(data); // Set companies list from the response
//       } catch (error) {
//         setErrorMessage('Error fetching companies');
//       }
//     };

//     fetchCompanies();
//   }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role,
     // company_id: companyId, // Could be null if no company is selected
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Account created successfully!');
        navigate('/plans')
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      setErrorMessage('Error submitting the form. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="content_creator">Content Creator</option>
            <option value="client">Client</option>
          </select>
        </div>

        {/* <div>
          <label htmlFor="companyId">Company</label>
          <select
            id="companyId"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required={role !== 'client'} // Only required for roles other than client
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div> */}

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateUserPage;



// import React, { useState } from 'react';

// const CreateUserPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Handle the form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const userData = {
//       email,
//       password,
//       name,
//     };
// console.log(userData);
//     try {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         // On success, you could redirect the user or show a success message
//         alert('Account created successfully!');
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Something went wrong, please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('Error submitting the form. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default CreateUserPage;
