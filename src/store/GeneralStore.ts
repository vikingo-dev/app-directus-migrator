import { DirectusClient, RestClient, StaticTokenClient } from '@directus/sdk';
import { Connection, Connections, initConnections, MigrationItem } from '@models/general';
import { create } from 'zustand';

interface GeneralStateProps {
  migrationsCheck: MigrationItem[]
  conections: Connections
  isConnect: boolean
  directusSource: (DirectusClient<any> & StaticTokenClient<any> & RestClient<any>) | null
  directusDestination: (DirectusClient<any> & StaticTokenClient<any> & RestClient<any>) | null
  directusSourceClient: any | null
  directusDestinationClient: any | null
  setIsConnect: (value: boolean) => void
  setConnection: (type: 'source' | 'destination', field: keyof Connection, value: string) => void
  setMigrationsCheck: (newCheck: MigrationItem, clearAll: boolean) => void
  setDirectusClient: (type: 'source' | 'destination', client: any) => void
}

const useGeneralStore = create<GeneralStateProps>((set, get) => ({
  migrationsCheck: [],
  conections: initConnections,
  isConnect: false,
  directusSource: null,
  directusDestination: null,
  directusSourceClient: null,
  directusDestinationClient: null,
  setDirectusClient: (type: 'source' | 'destination', client: any) => {
    set((state) => ({
      [type === 'source' ? 'directusSourceClient' : 'directusDestinationClient']: client,
    }));
  },
  setIsConnect: (value: boolean) => {
    set((state) => ({
      isConnect: value
    }))
  },
  setConnection: (type, field, value) => {
    set((state) => ({
      conections: {
        ...state.conections,
        [type]: {
          ...state.conections[type],
          [field]: value,
        },
      },
    }));
  },
  setMigrationsCheck: (newCheck: MigrationItem, clearAll: boolean) => {
    set((state) => {
      if (clearAll) {
        return {
          migrationsCheck: []
        }
      }
      const exists = state.migrationsCheck.includes(newCheck);
      return {
        migrationsCheck: exists
          ? state.migrationsCheck.filter((item) => item !== newCheck)
          : [...state.migrationsCheck, newCheck],
      };
    });
  },
}));

export default useGeneralStore;