import styles from './ContentArea.module.css';
import { LabTestEntry } from '../../types/labTestTypes';

type ContentAreaProps = {
  tests: LabTestEntry[];
};

function ContentArea({ tests }: ContentAreaProps) {
  if (!tests.length) {
    return (
      <div className={styles.testDisplay}>
        <h3>Please select a test from the sidebar</h3>
      </div>
    );
  }

  return (
    <div className={styles.testDisplay}>
      {tests.map(test =>
        'name' in test ? (
          <div key={test.code} className={styles.testCard}>
            <h3 className={styles.testName}>{test.name}</h3>
            <ul className={styles.testDetails}>
              <li><strong>Code:</strong> {test.code}</li>
              <li><strong>Specimen:</strong> {test.specimen}</li>
              <li><strong>Unit:</strong> {test.unit || '—'}</li>
              <li><strong>Normal Range:</strong> {test.normalRange || '—'}</li>
              <li><strong>Condition:</strong> {test.condition || '—'}</li>
              <li><strong>Method:</strong> {test.method || '—'}</li>
              <li><strong>Turnaround Time:</strong> {test.turnaroundTime || '—'}</li>
              <li><strong>Description:</strong> {test.description || '—'}</li>
            </ul>
          </div>
        ) : (
          <div key={test.$ref} className={styles.testCard}>
            <p>This is a reference to another test: <strong>{test.$ref}</strong></p>
          </div>
        )
      )}
    </div>
  );
}

export default ContentArea;
