// src/stores.ts
import { writable } from 'svelte/store';
import type {SelectedItem} from "./types";

export const selectedItem = writable<SelectedItem|undefined>(undefined);
