import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginReducer } from './reducers/login.reducer';
import { LOGIN_FEATURE_KEY } from './states/login.state';
import { LoginEffects } from './effects/login.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(LOGIN_FEATURE_KEY, LoginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginStoreModule {}
