import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenueComponent} from "./menue/menue.component";
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  { path: '', component: MenueComponent, pathMatch: 'full' },
  { path: 'chat/:id', component: ChatComponent, pathMatch: 'full'},
  { path: 'chat', redirectTo: ''},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
