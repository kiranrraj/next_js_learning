import styles from './ContentArea.module.css';
import { LabTestEntry } from '../../types/labtestTypes';

type ContentAreaProps = {
  selectedTest: LabTestEntry | null;
};

function ContentArea({ selectedTest }: ContentAreaProps) {
  return (
    <div className={styles.contentArea}>
      {selectedTest ? (
        'name' in selectedTest ? (
          <div>
            <h2>{selectedTest.name}</h2>
            <ul>
              <li><strong>Code:</strong> {selectedTest.code}</li>
              <li><strong>Specimen:</strong> {selectedTest.specimen}</li>
              <li><strong>Unit:</strong> {selectedTest.unit || '—'}</li>
              <li><strong>Normal Range:</strong> {selectedTest.normalRange || '—'}</li>
              <li><strong>Condition:</strong> {selectedTest.condition || '—'}</li>
              <li><strong>Method:</strong> {selectedTest.method || '—'}</li>
              <li><strong>Turnaround Time:</strong> {selectedTest.turnaroundTime || '—'}</li>
              <li><strong>Description:</strong> {selectedTest.description || '—'}</li>
            </ul>
          </div>
        ) : (
          <p>This is a reference to: {selectedTest.$ref}</p>
        )
      ) : (
        <h3>Please select a test from the sidebar</h3>
      )}
    </div>
  );
}

export default ContentArea;
