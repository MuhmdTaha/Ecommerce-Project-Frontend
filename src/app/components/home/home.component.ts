import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sliderImages = [
    'https://soliloquywp.com/wp-content/uploads/2018/11/nb_ist_cover.jpg',
    'https://technologywire.net/wp-content/uploads/2020/10/QuickBooks-17.jpg',
    'https://soliloquywp.com/wp-content/uploads/2019/04/nb_esc_cover.jpg',
    'https://tech-store.seaside-themes.com/wp-content/uploads/2018/05/slide4-1.jpg',
    'https://refixya.in/assets/media/uploadhome-slider/sliders/slider-1/laptop_room_on_the_desk_keyboard_mouse_apple_window_interior_73963_3840x1200.jpg',


  ];
  sliderTitles = ['Stay Home', "Don't Save Up", 'Free Shipping','Stay Home','Free Shipping'];
  sliderCaptions = [
    'For a limited time, shipping is free for any where in Egypt!',
    'With delivery to everywhere in Egypt, you can stay safe at home and order any laptop to your doorstep.',
    'With installments, you can buy your dream items right now.',
    'For a limited time, shipping is free for any where in Egypt!',
    'With installments, you can buy your dream items right now.',
  ];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  GetKeys(obj) {
    return Object.keys(obj);
  }

  constructor(
    private productsService: ProductsService,
    public navService: NavbarService,
    private router: Router
  ) {}

  subscriber;
  promotedLaptops;

  ngOnInit(): void {
    this.navService.show();
    this.getPromotedProducts();
  }

  getPromotedProducts() {
    this.subscriber = this.productsService.getPromotedProducts().subscribe(
      (products) => {
        this.promotedLaptops = products;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
  getAllProducts() {
    this.subscriber = this.productsService.getAllProducts().subscribe(
      (products) => {
        if (products) {
          this.productsService.productsList = products;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}