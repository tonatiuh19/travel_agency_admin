import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SETTINGS_FEATURE_KEY } from './states/settings.state';
import { SettingsReducer } from './reducers/settings.reducer';
import { SettingsEffects } from './effects/settings.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, SettingsReducer),
    EffectsModule.forFeature([SettingsEffects]),
  ],
})
export class SettingsStoreModule {}
