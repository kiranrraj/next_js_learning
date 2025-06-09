'use client'

import styles from './MainContainer.module.css'
import SideBar from './SideBar'
import ContentArea from './ContentArea'
import rawData from '../../data/lab_test_groups.json';
import { useState } from 'react'
import { LabTestData, LabTestGroup, LabTestSubGroup, LabTestEntry } from '../../types/labtestTypes';

function MainContainer() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const labData: LabTestData = rawData as LabTestData;
    const groupNames = Object.keys(labData);
    const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);
    const [selectedSubGroupName, setSelectedSubGroupName] = useState<string | null>(null);
    const [selectedTest, setSelectedTest] = useState<LabTestEntry | null>(null);

    const handleGroupSelect = (groupName: string) => {
        setSelectedGroupName(groupName);
        setSelectedSubGroupName(null); // clear selection below
        setSelectedTest(null);
    };

    const handleSubGroupSelect = (subGroupName: string) => {
        setSelectedSubGroupName(subGroupName);
        setSelectedTest(null);
    };

    const handleTestSelect = (test: LabTestEntry) => {
        setSelectedTest(test);
    };

    const currentGroup: LabTestGroup | undefined = selectedGroupName ? labData[selectedGroupName] : undefined;
    const currentSubGroup: LabTestSubGroup | undefined = (currentGroup && selectedSubGroupName) ? currentGroup[selectedSubGroupName] : undefined;


    return (
        <div className={styles.main}>
            <SideBar
                groupNames={groupNames}
                onGroupSelect={handleGroupSelect}
                onSubGroupSelect={handleSubGroupSelect}
                onTestSelect={handleTestSelect}
                selectedGroupName={selectedGroupName}
                selectedSubGroupName={selectedSubGroupName}
                selectedTest={selectedTest}
                currentGroup={currentGroup}
                currentSubGroup={currentSubGroup}
            />
            <ContentArea selectedTest={selectedTest} />
        </div>
    );
}

export default MainContainer;