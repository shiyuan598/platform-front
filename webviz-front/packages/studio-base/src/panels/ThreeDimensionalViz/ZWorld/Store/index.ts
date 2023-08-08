import create, { SetState, GetState } from 'zustand'

import { SettingStore, createSettingSlice } from './Setting'
import { WorldStore, createWorldSlice } from './WorldBase'

export type StoreState = WorldStore&SettingStore
export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T
export const useWorldStore = create<StoreState>((set, get) => ({
  ...createWorldSlice(set, get),
  ...createSettingSlice(set, get),
}))


useWorldStore.getState().initConfig()
