import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { LandingPageComponent } from "./landing-page/landing-page.component"
import { GhPagesComponent } from "./gh-pages/gh-pages.component"
import { VercelComponent } from "./vercel/vercel.component"

const appRoutes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "gh-pages", component: GhPagesComponent },
  { path: "vercel", component: VercelComponent },
  {  path: "**", redirectTo: "", pathMatch: "full" },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
