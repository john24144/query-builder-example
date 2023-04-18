import { FunctionComponent } from 'react';
import React = require('react');

export type Database = {
  name: string;
  type: 'DATABASE' | 'CLUSTER' | 'NEWTYPE';
  selected: boolean;
  favorite: boolean;
};

export function isDatabase(database: any): database is Database {
  return (
    !!database &&
    typeof database.name === 'string' &&
    typeof database.selected === 'boolean' &&
    typeof database.favorite === 'boolean' &&
    (database.type === 'DATABASE' ||
      database.type === 'CLUSTER' ||
      database.type === 'NEWTYPE')
  );
}

const DatabaseComponent: FunctionComponent<{
  model: Database;
  onDatabaseSelected: () => void;
  onDatabaseFavorited: () => void;
}> = ({ model, onDatabaseSelected, onDatabaseFavorited }) => (
  <div>
    <button onClick={() => onDatabaseSelected()}>{model.name}</button>
    {model.selected ? <span>&#x2713;</span> : null}
    <button onClick={() => onDatabaseFavorited()}>
      {model.favorite ? <span>&#9733;</span> : <span>&#9734;</span>}
    </button>
  </div>
);

export default DatabaseComponent;
