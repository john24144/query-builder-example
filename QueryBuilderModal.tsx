import { FunctionComponent, ReactNode } from 'react';
import React = require('react');

const modal: FunctionComponent<{
  onSubmit: () => void;
  children?: ReactNode;
}> = ({ onSubmit, children }) => (
  <div>
    {children}
    <button onClick={() => onSubmit()}>Submit</button>
  </div>
);

const filter: FunctionComponent<{
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

const view: FunctionComponent<{
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

const list: FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => <div>{children}</div>;

const QueryBuilderModal = Object.assign(modal, {
  Filter: filter,
  View: view,
  List: list,
});

export default QueryBuilderModal;
