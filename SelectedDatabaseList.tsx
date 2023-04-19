import { FunctionComponent } from 'react';
import React = require('react');
import { Database } from './Database';

const SelectedDatabase: FunctionComponent<{}> = 

const DatabaseComponent: FunctionComponent<{
  model: Database[];
  onDatabaseListChange: (value: Database[]) => void;
}> = ({ model, onDatabaseListChange }) => {
  function onDatabaseRemoved(removedDatabase: Database): void {
    onDatabaseListChange(
      model.filter((database) => database.name !== removedDatabase.name)
    );
  }

  return (
    <div>
      {model.map((database) => (
        <div>
          {database.name}
          <button onClick={() => onDatabaseRemoved(database)}>Deselect</button>
        </div>
      ))}
    </div>
  );
};

export default DatabaseComponent;
