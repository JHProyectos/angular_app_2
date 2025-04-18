import type { ApplicationConfig } from "@angular/core"

// No importamos routes directamente para evitar el conflicto
// import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Usamos las rutas definidas en app-routing.module.ts a través del AppRoutingModule
    // No necesitamos provideRouter aquí
  ]
}
