import React = require('react');
import { Database } from './Database';

export default function DatabaseComponent({
  model,
  onDatabaseListChange,
}: {
  model: Database[];
  onDatabaseListChange: (value: Database[]) => void;
}): JSX.Element {
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
}
