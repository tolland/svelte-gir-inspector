/*

 */
import type {GirRepository, SelectedItem} from "./types";

// export const selectedItem: SelectedItem | undefined = $state(undefined);

interface AppState  {
  repositories: GirRepository[],
  activeRepositoryId: string | undefined,
  selectedItem?: SelectedItem,
  searchTerm: string,
  isLoading: boolean,
  error: string
}

export const appState: AppState = $state( {
  repositories: [],
  activeRepositoryId: undefined,
  selectedItem: undefined,
  searchTerm: '',
  isLoading: false,
  error: ''
})

// Define GIR files to preload.
export const PRELOAD_FILES: string[] = [
  // 'gir/Babl-0.1.gir',
  // 'gir/Gegl-0.4.gir',
  'gir/Gimp-3.0.gir',
  'gir/GimpUi-3.0.gir',
  'gir/Gtk-3.0.gir',
];

