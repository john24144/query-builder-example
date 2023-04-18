import { useState, useEffect } from 'react';
import React = require('react');
import DatabaseComponent, { Database } from './Database';
import { fetchFullDatabaseList, filterDatabaseList } from './DatabaseService';
import QueryBuilderModal from './QueryBuilderModal';

export type DatabaseView = 'FAVORITES' | 'ALL' | 'DATABASE' | 'CLUSTER';
const viewList: DatabaseView[] = ['FAVORITES', 'ALL', 'DATABASE', 'CLUSTER'];

/**
 * Wrapper for "Select Database" Modal.
 */
export default function DatabaseSelector({
  selectedDatabaseList,
  onDatabaseListSelected,
}: {
  selectedDatabaseList: Database[];
  onDatabaseListSelected: (value: Database[]) => void;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [view, setView] = useState('ALL' as DatabaseView);
  const [databaseList, setDatabaseList] = useState([] as Database[]);

  function updateSelectedDatabaseList(
    databaseListToUpdate: Database[]
  ): Database[] {
    return databaseListToUpdate.map((database) => {
      console.log(selectedDatabaseList);
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

  const filteredDatabaseList: Database[] = filterDatabaseList(
    databaseList,
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

  function onSubmit(): void {
    setIsOpen(false);
    onDatabaseListSelected(
      databaseList.filter((database) => database.selected)
    );
  }

  return (
    <div>
      {isOpen ? (
        <QueryBuilderModal onSubmit={onSubmit}>
          <QueryBuilderModal.Filter
            value={filter}
            placeholder="Filter Databases by Name"
            onChange={setFilter}
          />
          <QueryBuilderModal.View<DatabaseView>
            selectedView={view}
            viewList={viewList}
            onChange={setView}
          />
          <QueryBuilderModal.List>
            {filteredDatabaseList.map((database) => (
              <DatabaseComponent
                model={database}
                onDatabaseSelected={() => onDatabaseSelected(database)}
                onDatabaseFavorited={() => onDatabaseFavorited(database)}
              />
            ))}
          </QueryBuilderModal.List>
        </QueryBuilderModal>
      ) : (
        <button onClick={() => setIsOpen(true)}>Select Database</button>
      )}
    </div>
  );
}
