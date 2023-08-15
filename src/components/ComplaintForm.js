

// import React, { useState } from 'react';
// import axios from 'axios';

// const ComplaintForm = () => {
//   const initialComplaintState = {
//     fullName: '',
//     accountNumber: '',
//     contactInformation: '',
//     complaintCategory: '',
//     issueDescription: '',
//     eventDateTime: '',
//     eventLocation: '',
//   };

//   const [complaint, setComplaint] = useState(initialComplaintState);
//   const [submissionStatus, setSubmissionStatus] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const allFieldsFilled = Object.values(complaint).every(value => value.trim() !== '');

//     if (!allFieldsFilled) {
//       console.log('All details should be filled.');
//       setSubmissionStatus('error');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8084/api/complaints', complaint);
//       console.log('Complaint submitted:', response.data);
//       setSubmissionStatus('submitted');
//       setComplaint(initialComplaintState); // Clear the form
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       setSubmissionStatus('error');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setComplaint((prevState) => ({ ...prevState, [name]: value }));
//     if (submissionStatus === 'error') {
//       setSubmissionStatus(null); // Remove the error message when typing starts
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Submit a Complaint</h2>
//       {submissionStatus === 'submitted' && (
//         <div className="alert alert-success" role="alert">
//           Complaint submitted successfully!
//         </div>
//       )}
//       {submissionStatus === 'error' && (
//         <div className="alert alert-danger" role="alert">
//           All details should be filled before submitting.
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="fullName"
//             name="fullName"
//             value={complaint.fullName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="accountNumber">Account Number</label>
//           <input
//             type="text"
//             className="form-control"
//             id="accountNumber"
//             name="accountNumber"
//             value={complaint.accountNumber}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="contactInformation">Contact Information</label>
//           <input
//             type="text"
//             className="form-control"
//             id="contactInformation"
//             name="contactInformation"
//             value={complaint.contactInformation}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="complaintCategory">Complaint Category</label>
//           <select
//             className="form-control"
//             id="complaintCategory"
//             name="complaintCategory"
//             value={complaint.complaintCategory}
//             onChange={handleInputChange}
//           >
//             <option value="">Select a Category...</option>
//             <option value="Account Issues">Account Issues</option>
//             <option value="Transaction Problems">Transaction Problems</option>
//             <option value="Card Related Issues">Card Related Issues</option>
//             <option value="Customer Service Experience">Customer Service Experience</option>
//             <option value="Loan and Mortgage Issues">Loan and Mortgage Issues</option>
//             <option value="Digital Banking Problems">Digital Banking Problems</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="issueDescription">Issue Description</label>
//           <textarea
//             className="form-control"
//             id="issueDescription"
//             name="issueDescription"
//             value={complaint.issueDescription}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventDateTime">Event Date and Time</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             id="eventDateTime"
//             name="eventDateTime"
//             value={complaint.eventDateTime}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventLocation">Event Location</label>
//           <input
//             type="text"
//             className="form-control"
//             id="eventLocation"
//             name="eventLocation"
//             value={complaint.eventLocation}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ComplaintForm;
import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const initialComplaintState = {
    fullName: '',
    accountNumber: '',
    contactInformation: '',
    complaintCategory: '',
    issueDescription: '',
    eventDateTime: '',
    eventLocation: '',
  };

  const [complaint, setComplaint] = useState(initialComplaintState);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [accountNumberError, setAccountNumberError] = useState(null);
  const [contactInformationError, setContactInformationError] = useState(null);
  const [complaintCategoryError, setComplaintCategoryError] = useState(null);
  const [issueDescriptionError, setIssueDescriptionError] = useState(null);

  const validateAccountNumber = (value) => {
    if (!value.startsWith('AXIS') || value.length !== 13 || isNaN(value.substr(4))) {
      return 'Invalid Account.';
    }
    return null;
  };

  
  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name} is required.`;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountNumberValidationError = validateAccountNumber(complaint.accountNumber);
    setAccountNumberError(accountNumberValidationError);

    const contactInformationValidationError = validateField('Contact Information', complaint.contactInformation);
    setContactInformationError(contactInformationValidationError);

    const complaintCategoryValidationError = validateField('Complaint Category', complaint.complaintCategory);
    setComplaintCategoryError(complaintCategoryValidationError);

    const issueDescriptionValidationError = validateField('Issue Description', complaint.issueDescription);
    setIssueDescriptionError(issueDescriptionValidationError);

    if (accountNumberValidationError || contactInformationValidationError ||
        complaintCategoryValidationError || issueDescriptionValidationError) {
      setSubmissionStatus(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8084/api/complaints', complaint);
      console.log('Complaint submitted:', response.data);
      setSubmissionStatus('submitted');
      setComplaint(initialComplaintState);
      setAccountNumberError(null);
      setContactInformationError(null);
      setComplaintCategoryError(null);
      setIssueDescriptionError(null);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmissionStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prevState) => ({ ...prevState, [name]: value }));

    if (submissionStatus === 'error') {
      setSubmissionStatus(null);
    }

    if (name === 'accountNumber') {
      const accountNumberValidationError = validateAccountNumber(value);
      setAccountNumberError(accountNumberValidationError);
    } else {
      const fieldValidationError = validateField(name, value);
      if (name === 'contactInformation') {
        setContactInformationError(fieldValidationError);
      } else if (name === 'complaintCategory') {
        setComplaintCategoryError(fieldValidationError);
      } else if (name === 'issueDescription') {
        setIssueDescriptionError(fieldValidationError);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Submit a Complaint</h2>
      {submissionStatus === 'submitted' && (
        <div className="alert alert-success" role="alert">
          Complaint submitted successfully!
        </div>
      )}
      {(submissionStatus === 'error' || accountNumberError || contactInformationError ||
        complaintCategoryError || issueDescriptionError) && (
        <div className="alert alert-danger" role="alert">
          {accountNumberError || contactInformationError || complaintCategoryError ||
           issueDescriptionError || 'All details should be filled and valid before submitting.'}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={complaint.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            className={`form-control ${accountNumberError ? 'is-invalid' : ''}`}
            id="accountNumber"
            name="accountNumber"
            value={complaint.accountNumber}
            onChange={handleInputChange}
          />
          {accountNumberError && (
            <div className="invalid-feedback">{accountNumberError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contactInformation">Contact Information</label>
          <input
            type="text"
            className={`form-control ${contactInformationError ? 'is-invalid' : ''}`}
            id="contactInformation"
            name="contactInformation"
            value={complaint.contactInformation}
            onChange={handleInputChange}
          />
          {contactInformationError && (
            <div className="invalid-feedback">{contactInformationError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="complaintCategory">Complaint Category</label>
           <select
              className="form-control"
              id="complaintCategory"
              name="complaintCategory"
              value={complaint.complaintCategory}
              onChange={handleInputChange}
            >
              <option value="">Select a Category...</option>
              <option value="Account Issues">Account Issues</option>
              <option value="Transaction Problems">Transaction Problems</option>
              <option value="Card Related Issues">Card Related Issues</option>
              <option value="Customer Service Experience">Customer Service Experience</option>
              <option value="Loan and Mortgage Issues">Loan and Mortgage Issues</option>
              <option value="Digital Banking Problems">Digital Banking Problems</option>
            </select>
          {complaintCategoryError && (
            <div className="invalid-feedback">{complaintCategoryError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="issueDescription">Issue Description</label>
          <textarea
            className={`form-control ${issueDescriptionError ? 'is-invalid' : ''}`}
            id="issueDescription"
            name="issueDescription"
            value={complaint.issueDescription}
            onChange={handleInputChange}
          />
          {issueDescriptionError && (
            <div className="invalid-feedback">{issueDescriptionError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="eventDateTime">Event Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="eventDateTime"
            name="eventDateTime"
            value={complaint.eventDateTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventLocation">Event Location</label>
          <input
            type="text"
            className="form-control"
            id="eventLocation"
            name="eventLocation"
            value={complaint.eventLocation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ComplaintForm;
