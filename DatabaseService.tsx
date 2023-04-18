import { Database } from './Database';
import { DatabaseView } from './DatabaseSelector';

export function fetchFullDatabaseList(): Promise<Database[]> {
  return new Promise((resolve) => setTimeout(resolve, 5000)).then(
    () =>
      [
        {
          name: 'CAPLUS',
          type: 'DATABASE',
        },
        {
          name: 'REGISTRY',
          type: 'DATABASE',
          favorite: false,
          falseProperty: 'something',
        },
        {
          name: 'MARPAT',
          type: 'CLUSTER',
          favorite: false,
        },
        {
          name: 'EPFULL',
          type: 'FALSETYPE',
          favorite: true,
        },
        {},
      ] as Database[]
  );
}

export function filterDatabaseList(
  databaseList: Database[],
  filter: string,
  view: DatabaseView
): Database[] {
  const filteredSelectedDatabaseList: Database[] = databaseList
    .filter(
      (database: Database) =>
        database.selected && isFilterMatch(database, filter)
    )
    .sort(sortByDatabaseName);

  const filteredUnselectedDatabaseList: Database[] = databaseList
    .filter(
      (database: Database) =>
        !database.selected &&
        isFilterMatch(database, filter) &&
        isViewMatch(database, view)
    )
    .sort(sortByDatabaseName);

  return filteredSelectedDatabaseList.concat(filteredUnselectedDatabaseList);
}

function isFilterMatch(database: Database, filter: string): boolean {
  return database.name.startsWith(filter.toLocaleUpperCase());
}

function isViewMatch(database: Database, view: DatabaseView): boolean {
  return (
    view === 'ALL' ||
    (view === 'FAVORITES' && database.favorite) ||
    database.type === view
  );
}

function sortByDatabaseName(db1: Database, db2: Database): number {
  return db1.name.localeCompare(db2.name);
}
