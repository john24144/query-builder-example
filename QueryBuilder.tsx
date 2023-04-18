import { useState, createContext } from 'react';
import React = require('react');
import { Database } from './Database';
import DatabaseSelector from './DatabaseSelector';
import SelectedDatabaseList from './SelectedDatabaseList';

export const databaseListContext = createContext()

export default function QueryBuilder(): JSX.Element {
  const [selectedDatabaseList, setSelectedDatabaseList] = useState(
    [] as Database[]
  );

  return (
    <div>
      <QueryBuilder.Section header="Select Databases">
        <SelectedDatabaseList
          model={selectedDatabaseList}
          onDatabaseListChange={setSelectedDatabaseList}
        />
        <DatabaseSelector
          selectedDatabaseList={selectedDatabaseList}
          onDatabaseListSelected={setSelectedDatabaseList}
        />
      </QueryBuilder.Section>
    </div>
  );
}

function Section({
  header,
  children,
}: {
  header: string;
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <hr />
      <button onClick={() => setIsOpen(!isOpen)}>Open</button> {header}
      {isOpen ? children : null}
    </div>
  );
}

QueryBuilder.Section = Section;
