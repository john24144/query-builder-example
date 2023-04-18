import { FunctionComponent } from 'react';
import React = require('react');
import { Database } from './Database';

type DatabaseProps = {
  model: Database[];
  onDatabaseListChange: (value: Database[]) => void;
};

const DatabaseComponent: FunctionComponent<DatabaseProps> = ({
  model,
  onDatabaseListChange,
}) => {
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
