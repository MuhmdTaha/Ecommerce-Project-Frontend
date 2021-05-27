import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  defaultFemale ='https://i2.wp.com/nofiredrills.com/wp-content/uploads/2016/10/myavatar.png?fit=400%2C400&ssl=1';
  defaultMale = 'https://previews.123rf.com/images/yupiramos/yupiramos1705/yupiramos170508326/77699356-young-man-casual-avatar-with-glasses-vector-illustration-design.jpg';
  username: object = [
    'aliibrahim095',
    'aya-maher',
    'MuhmdTaha',
    'MahaElburji',
    'abdullahnegm',
    'Ahmed-behiery',
    'mohamed-elbermawy',
  ];
  team = [
    {
      id: 1,
      Name: 'Ali Ibrahim',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/AlyEbrahim.jpg',
      pic: 'https://avatars.githubusercontent.com/u/77580128?v=4',
      github: `https://www.github.com/${this.username[0]}/`,
    },
    {
      id: 2,
      Name: 'AbdallahSanad',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/AbdallahSanad.jpg',
      pic: this.defaultMale,
      github: `https://www.github.com/${this.username[4]}/`,
    },
    {
      id: 3,
      Name: 'AyaMaher',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/AyaMaher.jpg',
      pic: this.defaultFemale,
      github: `https://www.github.com/${this.username[1]}/`,
    },
    {
      id: 4,
      Name: 'MohamedElbermawy',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/MohamedElbermawy.jpg',
      pic: 'https://avatars.githubusercontent.com/u/73673320?v=4',
      github: `https://www.github.com/${this.username[6]}/`,
    },

    {
      id: 5,
      Name: 'MuhammadTaha',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/MuhammadTaha.jpg',
      pic: this.defaultMale,
      github: `https://www.github.com/${this.username[2]}/`,
    },
    {
      id: 6,
      Name: 'AhmedBeheiry',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/AhmedBeheiry.jpg',
      pic: 'https://avatars.githubusercontent.com/u/62404881?v=4',
      github: `https://www.github.com/${this.username[5]}/`,
    },
    {
      id: 7,
      Name: 'MahaElburj',
      Track: 'Open Source Applications',
      Organization: 'ITI Mansoura Branch',
      Image: 'https://localhost:4001/MahaElburj.jpg',
      pic: 'https://avatars.githubusercontent.com/u/35261148?v=4',

      github: `https://www.github.com/${this.username[3]}/`,
    },
  ];

  constructor(public navService: NavbarService) {}

  ngOnInit(): void {
    this.navService.show();
  }
}