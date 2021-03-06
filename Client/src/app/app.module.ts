import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './services/common/token.interceptor';
import { storeReducer } from './store/reducer/reducer';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FeaturesPopupComponent } from './components/features-popup/features-popup.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SharePopupComponent } from './components/share-popup/share-popup.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { FeaturePopupComponent } from './components/feature-popup/feature-popup.component';
import { EffectsModule } from '@ngrx/effects';
import { TraitEffects } from './store/effects/traits.effect';
import { CharacterSheetEffects } from './store/effects/character-sheet.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    FeaturesPopupComponent,
    FeaturePopupComponent,
    SharePopupComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ state : storeReducer }),
    NgSelectModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    SimpleModalModule,
    EffectsModule.forRoot([TraitEffects,CharacterSheetEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
