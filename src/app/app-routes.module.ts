
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelResultComponent } from './hotel-result/hotel-result.component';
import { SearchResolver } from './resolvers/search-resolver.service';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';



const appRouts: Routes = [
  { path: '', redirectTo: '/hotels/home', pathMatch: 'full' },

  { path: 'hotels/home', component: SearchHotelComponent,  runGuardsAndResolvers: 'always' },
  { path: 'hotels/results', component: HotelResultComponent, resolve: { hotelSearchRes: SearchResolver }, runGuardsAndResolvers: 'always' },

  { path: '**', redirectTo: '/' },




];
@NgModule({
  imports: [RouterModule.forRoot(appRouts, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutesModule { }

//  imports: [RouterModule.forRoot(appRouts,{onSameUrlNavigation: 'reload',enableTracing:true})], 
