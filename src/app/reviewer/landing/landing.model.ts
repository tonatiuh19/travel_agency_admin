export const DOMAIN = 'http://localhost:8015/api';

export interface LandingState {
  packages: PackageModel[];
  booking?: BookingModel[];
  bookings?: BookingModel[];
  package?: FullPackageModel;
  payment?: PaymentModel;
  cities?: CitiesWithCountOfPackagesModel[];
  reviews?: ReviewsModel[];
  user?: UserModel;
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
  packPriceMax: number;
  packTransportId: number;
  packTransportDescription: number | string;
  packDateRange: string;
  packDateRangeOff: boolean;
  hotLabel: string;
  imageUrls: string[];
  citName?: string;
}

export interface FullPackageModel {
  packID: number;
  packTitle: string;
  packDescription: string;
  packLocationID: number;
  packHotelID: number;
  packHotelDescription: string;
  packLimit: number;
  packPrice: number;
  packPriceMax: number;
  packTransportId: number;
  packTransportDescription: string;
  packDateRange: string;
  hotLabel: string;
  citName: string;
  totalReviews: number;
  averageRating: number;
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

export interface UserModel {
  custID: string;
  custEmail: string;
  custEmailVerified: string;
  custName: string;
  custSurname: string;
  picture: string;
  custStripeID?: string;
  hasBookings?: boolean;
}

export interface PaymentModel {
  bookingID?: number;
  message: string;
  paymentSuccess: boolean;
  errorCode?: string;
  isProcessing?: number;
}

export interface BookingModel {
  bookID: number;
  bookCustomerID: number;
  bookPackageID: number;
  bookPaid: number;
  bookDate: Date;
  bookDateFor: string;
  bookPaidPrice: number;
  contactName: string;
  contactSurName: string;
  contactEmail: string;
  contactPhone: number;
  passengerName: string;
  passengerSurname: string;
  passengerAge: number;
  packTitle: string;
  packPrice: number;
  packTransportId: number;
  packHotelID: number;
  packID: number;
}
