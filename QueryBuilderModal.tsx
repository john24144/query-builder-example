import { Dispatch } from 'react';
import React = require('react');

export default function QueryBuilderModal({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      {children}
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
}

function Filter(props: {
  value: string;
  placeholder: string;
  onChange: Dispatch<string>;
}): JSX.Element {
  const { value, placeholder, onChange } = props;

  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      <button onClick={() => onChange('')}>Clear</button>
    </div>
  );
}

function View<Type>(props: {
  selectedView: Type;
  viewList: Type[];
  onChange: Dispatch<Type>;
}): JSX.Element {
  const { selectedView, viewList, onChange } = props;

  return (
    <div>
      {viewList.map((view) => (
        <button onClick={() => onChange(view)}>
          {view === selectedView ? <b>{view as string}</b> : (view as string)}
        </button>
      ))}
    </div>
  );
}

function List(props: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  const { children } = props;
  return <div>{children}</div>;
}

QueryBuilderModal.Filter = Filter;
QueryBuilderModal.View = View;
QueryBuilderModal.List = List;
