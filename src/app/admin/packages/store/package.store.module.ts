import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PACKAGE_FEATURE_KEY } from './states/package.state';
import { PackageReducer } from './reducers/package.reducer';
import { PackageEffects } from './effects/package.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PACKAGE_FEATURE_KEY, PackageReducer),
    EffectsModule.forFeature([PackageEffects]),
  ],
})
export class PackageStoreModule {}
