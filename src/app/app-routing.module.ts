import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {ChatComponent} from "./chat/chat.component";
import {InfoComponent} from "./menu/sub-menus/info/info.component";
import {SettingsComponent} from "./menu/sub-menus/settings/settings.component";

const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'chat/:id', component: ChatComponent, pathMatch: 'full'},
  { path: 'chat', redirectTo: ''},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
