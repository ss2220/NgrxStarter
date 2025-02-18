import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
        
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
