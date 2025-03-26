import { RootState } from '../store';

export const selectCarouselItems = (state: RootState) => state.carousel.items;
export const selectCarouselFilter = (state: RootState) => state.carousel.filter;
export const selectCarouselFilterType = (state: RootState) => state.carousel.filterType;
export const selectCarouselViewType = (state: RootState) => state.carousel.viewType;
