export const DOMAIN = 'http://localhost:8015/api';

export interface LandingState {
  packages: PackageModel[];
  cities?: CitiesWithCountOfPackagesModel[];
  reviews?: ReviewsModel[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface PackageModel {
  packID: number;
  packTitle: string;
  packDescription: string;
  packLocationID: number;
  packHotelID: number;
  packHotelDescription: number | string;
  packLimit: number;
  packPrice: number;
  packTransportId: number;
  packTransportDescription: number | string;
  packDateRange: string;
  hotLabel: string;
  imageUrls: string[];
  citName?: string;
}

export interface CitiesWithCountOfPackagesModel {
  citID: number;
  citName: string;
  cityStatus: number;
  ctryID: number;
  packageCount: number;
}

export interface ReviewsModel {
  reviewID: number;
  packID: number;
  custID: number;
  rating: number;
  comment: string;
  reviewDate: Date;
  custName: string;
  custSurname: string;
}
