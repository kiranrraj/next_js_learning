export interface Test {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
  childrenGroups?: Group[];
  tests?: Test[];
}

export const medicalTestGroups: Group[] = [
  {
    id: 'grp1',
    name: 'Urine',
    childrenGroups: [
      {
        id: 'grp1-1',
        name: 'Urine Chemistry',
        tests: [
          { id: 'test1', name: 'pH' },
          { id: 'test2', name: 'Specific Gravity' },
          { id: 'test3', name: 'Protein' },
          { id: 'test4', name: 'Glucose' },
        ],
      },
      {
        id: 'grp1-2',
        name: 'Urine Microscopy',
        childrenGroups: [
          {
            id: 'grp1-2-1',
            name: 'Cells',
            tests: [
              { id: 'test10', name: 'Red Blood Cells' },
              { id: 'test11', name: 'White Blood Cells' },
              { id: 'test12', name: 'Epithelial Cells' },
            ],
          },
          {
            id: 'grp1-2-2',
            name: 'Casts and Crystals',
            tests: [
              { id: 'test13', name: 'Casts' },
              { id: 'test14', name: 'Crystals' },
            ],
          },
          {
            id: 'grp1-2-3',
            name: 'Microorganisms',
            tests: [
              { id: 'test15', name: 'Bacteria' },
              { id: 'test16', name: 'Yeasts' },
              { id: 'test17', name: 'Parasites' },
            ],
          },
        ],
      },
      {
        id: 'grp1-3',
        name: 'Urine Culture',
        tests: [
          { id: 'test18', name: 'Bacterial Culture' },
          { id: 'test19', name: 'Fungal Culture' },
          { id: 'test37', name: 'Urine Culture' },
        ],
      },
    ],
    tests: [
      { id: 'test20', name: 'General Urine Test' },
    ],
  },
  {
    id: 'grp2',
    name: 'Blood',
    childrenGroups: [
      {
        id: 'grp2-1',
        name: 'Blood Chemistry',
        childrenGroups: [
          {
            id: 'grp2-1-1',
            name: 'Lipids',
            tests: [
              { id: 'test21', name: 'Cholesterol' },
              { id: 'test22', name: 'Triglycerides' },
              { id: 'test23', name: 'HDL Cholesterol' },
              { id: 'test24', name: 'LDL Cholesterol' },
            ],
          },
          {
            id: 'grp2-1-2',
            name: 'Metabolites',
            tests: [
              { id: 'test25', name: 'Glucose' },
              { id: 'test26', name: 'Blood Urea Nitrogen' },
              { id: 'test27', name: 'Creatinine' },
            ],
          },
          {
            id: 'grp2-1-3',
            name: 'Electrolytes',
            tests: [
              { id: 'test28', name: 'Sodium' },
              { id: 'test29', name: 'Potassium' },
              { id: 'test30', name: 'Chloride' },
            ],
          },
        ],
      },
      {
        id: 'grp2-2',
        name: 'Blood Count',
        tests: [
          { id: 'test31', name: 'Hemoglobin' },
          { id: 'test32', name: 'Hematocrit' },
          { id: 'test33', name: 'White Blood Cell Count' },
          { id: 'test34', name: 'Platelet Count' },
          { id: 'test35', name: 'Red Blood Cell Count' },
        ],
      },
      {
        id: 'grp2-3',
        name: 'Blood Coagulation',
        tests: [
          { id: 'test36', name: 'Prothrombin Time (PT)' },
          { id: 'test38', name: 'International Normalized Ratio (INR)' },
          { id: 'test39', name: 'Activated Partial Thromboplastin Time (aPTT)' },
        ],
      },
    ],
  },
  {
    id: 'grp3',
    name: 'Microbiology',
    childrenGroups: [
      {
        id: 'grp3-1',
        name: 'Bacterial Tests',
        tests: [
          { id: 'test35', name: 'Blood Culture' },
          { id: 'test36', name: 'Sputum Culture' },
          { id: 'test37', name: 'Urine Culture' },
        ],
      },
      {
        id: 'grp3-2',
        name: 'Viral Tests',
        tests: [
          { id: 'test40', name: 'HIV Antibody' },
          { id: 'test41', name: 'Hepatitis B Surface Antigen' },
          { id: 'test42', name: 'Hepatitis C Antibody' },
        ],
      },
    ],
  },
  {
    id: 'grp4',
    name: 'Miscellaneous',
    childrenGroups: [
      {
        id: 'grp4-1',
        name: 'Endocrinology',
        tests: [
          { id: 'test43', name: 'TSH' },
          { id: 'test44', name: 'Free T4' },
          { id: 'test45', name: 'Cortisol' },
        ],
      },
      {
        id: 'grp4-2',
        name: 'Immunology',
        tests: [
          { id: 'test46', name: 'ANA' },
          { id: 'test47', name: 'Rheumatoid Factor' },
        ],
      },
    ],
  },
  {
    id: 'grp5',
    name: 'Multiple Group Tests',
    tests: [
      { id: 'test21', name: 'Cholesterol' },
      { id: 'test37', name: 'Urine Culture' },
      { id: 'test4', name: 'Glucose' },
      { id: 'test35', name: 'Blood Culture' },
    ],
  },
];
