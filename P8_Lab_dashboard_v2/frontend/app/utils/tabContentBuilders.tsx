// utils/tabContentBuilders.tsx

import React from 'react';
import { Test, Group } from '../components/Sidebar'
import { flattenTests } from './flattenTests'

export function buildTestTabContent(test: Test) {
  return (
    <div>
      <strong>{test.name}</strong>
      <p>Details for <em>{test.name}</em> (ID: {test.id})</p>
    </div>
  );
}

export function buildGroupTabContent(group: Group) {
  const allTests = flattenTests(group);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '10px' }}>
      {allTests.length === 0 && <p>No tests available in this group.</p>}
      {allTests.map(test => (
        <div
          key={test.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '12px',
            width: '200px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <strong>{test.name}</strong>
          <p>ID: {test.id}</p>
        </div>
      ))}
    </div>
  );
}
