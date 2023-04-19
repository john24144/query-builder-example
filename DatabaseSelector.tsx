import { useState, useEffect, FunctionComponent } from 'react';
import React = require('react');
import DatabaseComponent, { Database, isDatabase } from './Database';
import { fetchFullDatabaseList, filterDatabaseList } from './DatabaseService';
import QueryBuilderModal from './QueryBuilderModal';

export type DatabaseView = 'FAVORITES' | 'ALL' | 'DATABASE' | 'CLUSTER';
const viewList: DatabaseView[] = ['FAVORITES', 'ALL', 'DATABASE', 'CLUSTER'];

function DatabaseSelector({
  selectedDatabaseList,
  onDatabaseListSelected,
}: {
  selectedDatabaseList: Database[];
  onDatabaseListSelected: (value: Database[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [view, setView] = useState('ALL' as DatabaseView);
  const [databaseList, setDatabaseList] = useState([] as Database[]);

  function updateSelectedDatabaseList(
    databaseListToUpdate: Database[]
  ): Database[] {
    return databaseListToUpdate.map((database) => {
      return {
        name: database.name,
        type: database.type,
        selected:
          database.selected &&
          selectedDatabaseList.some(
            (selectedDatabase) => database.name === selectedDatabase.name
          ),
        favorite: database.favorite,
      };
    });
  }

  useEffect(() => {
    fetchFullDatabaseList().then((fullDatabaseList) =>
      setDatabaseList(updateSelectedDatabaseList(fullDatabaseList))
    );
  }, []);

  useEffect(() => {
    updateSelectedDatabaseList(databaseList);
  }, [selectedDatabaseList]);

  function onSubmit(): void {
    setIsOpen(false);
    onDatabaseListSelected(
      databaseList.filter((database) => database.selected)
    );
  }

  const DatabaseSelectorModal: FunctionComponent<{}> = () => (
    <QueryBuilderModal onSubmit={onSubmit}>
      <QueryBuilderModal.Filter
        value={filter}
        placeholder="Filter Databases by Name"
        onChange={setFilter}
      />
      <QueryBuilderModal.View
        selectedView={view}
        viewList={viewList}
        onChange={setView as (value: string) => void}
      />
      <DatabaseSelector.List
        databaseList={databaseList}
        filter={filter}
        view={view}
        setDatabaseList={setDatabaseList}
      />
    </QueryBuilderModal>
  );

  return (
    <div>
      <div hidden={!isOpen}>
        <DatabaseSelectorModal />
      </div>
      <button hidden={isOpen} onClick={() => setIsOpen(true)}>
        Select Database
      </button>
    </div>
  );
}

const List: FunctionComponent<{
  databaseList: Database[];
  filter: string;
  view: DatabaseView;
  setDatabaseList: (value: Database[]) => void;
}> = ({ databaseList, filter, view, setDatabaseList }) => {
  const filteredDatabaseList: Database[] = filterDatabaseList(
    databaseList.filter(isDatabase),
    filter,
    view
  );

  function onDatabaseUpdated(updatedDatabase: Database): void {
    setDatabaseList(
      databaseList
        .filter((database: Database) => database.name !== updatedDatabase.name)
        .concat({
          name: updatedDatabase.name,
          type: updatedDatabase.type,
          selected: updatedDatabase.selected,
          favorite: updatedDatabase.favorite,
        })
    );
  }

  function onDatabaseSelected(database: Database): void {
    database.selected = !database.selected;
    return onDatabaseUpdated(database);
  }

  function onDatabaseFavorited(database: Database): void {
    database.favorite = !database.favorite;
    return onDatabaseUpdated(database);
  }

  return (
    <QueryBuilderModal.List>
      {filteredDatabaseList.map((database) => (
        <DatabaseComponent
          model={database}
          onDatabaseSelected={() => onDatabaseSelected(database)}
          onDatabaseFavorited={() => onDatabaseFavorited(database)}
        />
      ))}
    </QueryBuilderModal.List>
  );
};

DatabaseSelector.List = List;
export default DatabaseSelector;
