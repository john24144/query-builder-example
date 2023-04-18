import { useState, FunctionComponent } from 'react';
import React = require('react');
import { Database } from './Database';
import DatabaseSelector from './DatabaseSelector';
import SelectedDatabaseList from './SelectedDatabaseList';

const QueryBuilder: FunctionComponent<{}> = () => {
  const [databaseList, setDatabaseList] = useState([] as Database[]);

  const DatabaseSection: FunctionComponent<{}> = () => (
    <Section header="Select Databases">
      <SelectedDatabaseList
        model={databaseList}
        onDatabaseListChange={setDatabaseList}
      />
      <DatabaseSelector
        selectedDatabaseList={databaseList}
        onDatabaseListSelected={setDatabaseList}
      />
    </Section>
  );

  return (
    <div>
      <DatabaseSection />
    </div>
  );
};

const Section: FunctionComponent<{
  header: string;
  children: JSX.Element | JSX.Element[];
}> = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <hr />
      <button onClick={() => setIsOpen(!isOpen)}>Open</button> {header}
      <div hidden={!isOpen}>{children}</div>
    </div>
  );
};

export default QueryBuilder;
