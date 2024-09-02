import { PackageState } from '../../package.model';

export const PACKAGE_FEATURE_KEY = 'package';

export const initialPackageState: PackageState = {
  packages: [],
  isLoading: false,
  isError: false,
};
