import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LandingPageComponent } from "./landing-page/landing-page.component"
import { GhPagesComponent } from "./gh-pages/gh-pages.component"
import { VercelComponent } from "./vercel/vercel.component"
import { SharedModule } from './shared/shared.module';
import { BackButtonComponent } from "./back-button/back-button.component"; 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"


@NgModule({
  declarations: [
    AppComponent,
    // Quitamos los componentes standalone de las declaraciones
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    // Importamos los componentes standalone
    LandingPageComponent,
    GhPagesComponent,
    VercelComponent,
    SharedModule,
    BackButtonComponent
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}