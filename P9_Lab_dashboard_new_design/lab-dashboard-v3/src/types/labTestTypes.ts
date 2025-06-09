// \src\types\labTestTypes.ts

// ? represents optional values
export type LabTest = {
  code: string;
  name: string;
  description?: string;
  specimen: string;
  unit?: string;
  normalRange?: string;
  method?: string;
  condition?: string;
  turnaroundTime?: string;
};

// Represents a test reference using a $ref to another test.
// when one test appears in multiple groups or panels.
export type LabTestRef = {
  $ref: string;
};

//A lab test entry can be either a full test or a reference.
export type LabTestEntry = LabTest | LabTestRef;

/**
 * Level 3: A collection of individual lab tests (the leaf nodes).
 * This maps test IDs (e.g., "CBC", "TSH") to their corresponding test objects.
 */
export type LabTestSubGroup = {
  [testCode: string]: LabTestEntry;
};

/**
 * Level 2: A collection of subgroups within a top-level group (Level 1).
 * Example: "Biochemistry" → "Lipid Panel" → "LDL"
 */
export type LabTestGroup = {
  [subGroupName: string]: LabTestSubGroup;
};

// Level 1: The top-level structure that holds all lab test groups.
export type LabTestData = {
  [groupName: string]: LabTestGroup;
};
