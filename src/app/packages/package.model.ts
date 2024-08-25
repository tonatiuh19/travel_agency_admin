export interface PackageState {
  packages: PackageModel[];
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
}

export interface NewPackageModel {
  name: string;
  price: string;
  location: string;
  date: string;
  transport: string;
  hosting: string;
  limit: string;
  transportType: string;
  transportDescription: string;
  hostingType: string;
  hotelDescription: string;
  generalDescription: string;
}
