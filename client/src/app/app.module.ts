import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    ImageGalleryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
