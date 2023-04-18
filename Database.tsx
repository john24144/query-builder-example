import React = require('react');

export type Database = {
  name: string;
  type: 'DATABASE' | 'CLUSTER';
  selected: boolean;
  favorite: boolean;
};

export default function DatabaseComponent(props: {
  model: Database;
  onDatabaseSelected: () => void;
  onDatabaseFavorited: () => void;
}) {
  const { model, onDatabaseSelected, onDatabaseFavorited } = props;
  return (
    <div>
      <button onClick={() => onDatabaseSelected()}>{model.name}</button>
      {model.selected ? <span>&#x2713;</span> : null}
      <button onClick={() => onDatabaseFavorited()}>
        {model.favorite ? <span>&#9733;</span> : <span>&#9734;</span>}
      </button>
    </div>
  );
}
