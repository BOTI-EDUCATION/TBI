import { PopoverController } from '@ionic/angular';
import { environment } from './../../../environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  // apiLmsSchool: string = this.router['location']._platformLocation.location.href.split('/')[4];
  apiLmsSchool: string = '';
  course: any = null;
  courseExists: boolean = false;
  showNavigationLevel: boolean = false;
  showMatterLevel: boolean = false;
  niveaux: any;
  ressources: any;
  unites: any;
  rubriques_tree: any;
  rubriques: any;
  unite: any;
  niveau: any;
  course_number: any;
  rub_count: any;
  index_slide: number = 0;
  sildes_count: number;
  filters: any = {
    unite_id: null,
    unite_label: null,
    niveau_id: null,
    niveau_label: null,
  };
  startLearn: boolean = false;
  showObjectifs: boolean = false;
  showSyllabus: boolean = false;
  showInstructions: boolean = false;
  showPrerequis: boolean = false;
  currentRessource: number = 0;
  currentContent: number = 0;
  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.httpClient
      .get(environment.apiLms + this.apiLmsSchool + environment.apiLmsVersion + '/borne_home')
      .subscribe((res: any) => {
        this.niveaux = res.niveaux;
        this.unites = res.unites;
        this.rubriques_tree = res.rubriques_tree;
        this.filters.unite_id = this.unites[0].value;
        this.filters.niveau_id = this.niveaux[0].value;
        this.filters.unite_label = this.unites[0].text;
        this.filters.niveau_label = this.niveaux[0].text;
        this.course = res.rubriques_tree[0].lecons[0];
        this.course_number = 1;
        this.rub_count = res.rubriques_tree[0].lecons.length;
      });
    // check if there is an id on router
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCourse(id);
    }
  }
  // filter course by unite id
  filterCourseByUnite(element) {
    this.filters.unite_id = element.value;
    this.filters.unite_label = element.text;
    this.showMatterLevel = false;
    this.httpClient
      .get(
        `${environment.apiLms + this.apiLmsSchool + environment.apiLmsVersion}/borne_home?niveau_id=${
          this.filters.niveau_id
        }&unite_id=${this.filters.unite_id}`,
      )
      .subscribe((res: any) => {
        this.rubriques_tree = res.rubriques_tree;
        this.course = res.rubriques_tree[0].lecons[0];
        this.course_number = 1;
        this.rub_count = res.rubriques_tree[0].lecons.length;
      });
  }
  // filter data by there niveau id
  filterByNiveau(element) {
    this.filters.niveau_id = element.value;
    this.filters.niveau_label = element.text;
    this.showNavigationLevel = false;
    this.httpClient
      .get(
        `${environment.apiLms + this.apiLmsSchool + environment.apiLmsVersion}/borne_home?niveau_id=${
          this.filters.niveau_id
        }&unite_id=${this.filters.unite_id}`,
      )
      .subscribe((res: any) => {
        this.rubriques_tree = res.rubriques_tree;
        this.course = res.rubriques_tree[0].lecons[0];
        this.course_number = 1;
        this.rub_count = res.rubriques_tree[0].lecons.length;
      });
  }
  // get course by id
  getCourse(value, courseIndex = 0, runCount = 0) {
    this.httpClient
      .get(`${environment.apiLms + this.apiLmsSchool + environment.apiLmsVersion}/lecons/${value}`)
      .subscribe((res: any) => {
        this.course = res.lecon;
        this.filters.unite_id = this.course.unite_id;
        this.filters.niveau_id = this.course.niveau_id;
        this.course_number = courseIndex + 1;
        this.rub_count = runCount;
      });
  }

  // show course
  showCourse(id) {
    this.httpClient
      .get(`${environment.apiLms + this.apiLmsSchool + environment.apiLmsVersion}/borne_lecon/${id}`)
      .subscribe((res: any) => {
        this.ressources = res.ressources;
        this.course = res.lecon;
        this.courseExists = true;
        console.log(res);
      });
  }
  close_modal(target = '') {
    // if (!this.course) {
    this.popoverCtrl.dismiss({
      dismiss: true,
    });
    // } else {
    //   this.courseExists = null;
    //   this.course = null;
    // }
  }
  // ui design
  showLevelNavigation() {
    this.showNavigationLevel = !this.showNavigationLevel;
    this.showMatterLevel = false;
  }
  showMatterNavigation() {
    this.showMatterLevel = !this.showMatterLevel;
    this.showNavigationLevel = false;
  }
  closeCourseModal() {
    this.course = null;
    this.index_slide = 0;
  }

  savePlayer(e) {}

  // slides ui
  prevSlide(i) {
    if (this.index_slide > 0) {
      this.index_slide--;
    }
    if (this.index_slide == -1) {
      this.index_slide = 0;
      console.log('no --');
      console.log(i);
    }
  }
  nextSlide(i) {
    if (this.index_slide >= 0) {
      this.index_slide++;
    }
    if (this.index_slide - i === 0) {
      console.log('no ++');
      this.index_slide = 0;
    }
  }
  // objectifs syllabus introduction Prerequis
  show_objectifs() {
    this.showObjectifs = !this.showObjectifs;
  }
  show_syllabus() {
    this.showSyllabus = !this.showSyllabus;
  }
  show_intro() {
    this.showInstructions = !this.showInstructions;
  }
  show_prerequis() {
    this.showPrerequis = !this.showPrerequis;
  }
  returnToMainPage() {
    this.courseExists = false;
    this.currentRessource = 0;
    this.currentContent = 0;
    this.startLearn = false;
  }
  returnToMainCourse() {
    this.courseExists = true;
    this.currentRessource = 0;
    this.currentContent = 0;
    this.startLearn = false;
  }
  async startCourse(id) {
    this.startLearn = true;
    await this.showCourse(id);
  }
  async nextRessource() {
    if (this.currentContent >= 0 && this.currentContent < this.ressources[this.currentRessource].contents.length - 1) {
      this.currentContent += 1;
    } else {
      if (this.currentRessource >= 0 && this.currentRessource < this.ressources.length - 1) {
        this.currentRessource += 1;
        this.currentContent = 0;
      } else {
        this.currentRessource = 0;
        this.currentContent = 0;
      }
    }
  }
  async previusRessource() {
    if (this.currentContent > 0 && this.currentContent < this.ressources[this.currentRessource].contents.length - 1) {
      this.currentContent--;
      console.log('from prev', this.currentRessource);
      console.log('from prev', this.ressources.length);
    } else {
      if (this.currentRessource >= 0 && this.currentRessource < this.ressources.length - 1) {
        console.log('works', this.currentContent, this.ressources.length - 1);
        this.currentRessource -= this.ressources.length - 1;
        this.currentContent = this.ressources[this.currentRessource].contents.length - 1;
      } else {
        this.currentRessource = this.ressources.length - 1;
        this.currentContent = this.ressources[this.currentRessource].contents.length - 2;
        // this.currentContent = 0;
        console.log('hello', this.ressources.length - 1);
      }
    }
  }
}
