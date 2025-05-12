'use client';

import { useEffect, useState } from "react";
import PatientCard from "./Card/Card";  // Import the PatientCard component

interface Patient {
  id: string;
  name: string;
  contact: string;
  address: string;
  created_at: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8000/patients");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.message) {
          setError(data.message);
        } else {
          setPatients(data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("An error occurred while fetching patients.");
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Patients List</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : patients.length === 0 ? (
        <p>No patients available</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
}
