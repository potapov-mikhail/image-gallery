import { Observable } from 'rxjs';
import { Component } from '@angular/core';

import { Image } from '../app.interfaces';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {

  images$: Observable<Image[]>;

  constructor(private imageService: ImageService) {
    this.images$ = this.imageService.images$;
  }

  handleSearch(search: string) {
    this.imageService.search(search);
  }
}
