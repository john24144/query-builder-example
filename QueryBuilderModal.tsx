import { FunctionComponent, ReactNode } from 'react';
import React = require('react');

function QueryBuilderModal({
  onSubmit,
  children,
}: {
  onSubmit: () => void;
  children?: ReactNode;
}) {
  return (
    <div>
      {children}
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
}

const Filter: FunctionComponent<{
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}> = ({ value, placeholder, onChange }) => (
  <div>
    <input
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
    <button onClick={() => onChange('')}>Clear</button>
  </div>
);

const View: FunctionComponent<{
  selectedView: string;
  viewList: string[];
  onChange: (value: string) => void;
}> = ({ selectedView, viewList, onChange }) => (
  <div>
    {viewList.map((view) => (
      <button onClick={() => onChange(view)}>
        {view === selectedView ? <b>{view}</b> : view}
      </button>
    ))}
  </div>
);

const List: FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => <div>{children}</div>;

QueryBuilderModal.Filter = Filter;
QueryBuilderModal.View = View;
QueryBuilderModal.List = List;
export default QueryBuilderModal;
