'use client';

import React from 'react';
import styles from './Card.module.css';

interface Patient {
  id: string;
  name: string;
  contact: string;
  address: string;
  created_at: string;
}

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        {patient.name}
      </div>
      <div className={styles["card-body"]}>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>
      <div className={styles["card-footer"]}>
        Created At: {new Date(patient.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default PatientCard;
