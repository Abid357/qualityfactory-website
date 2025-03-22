import { RootState } from "../store";

export const selectCatalogScrollPosition = (state: RootState) => state.catalog.catalogScrollPosition;