import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  course_id : any;
  course:any;
  contents:any;
  ressources:any;
  showModal:boolean = false;
  startContents:boolean = false;
  content_index:number = -1;
  currentContent:number = 1;
  currentRessource:number = 0;
  hideNextEtape:boolean = false;
  constructor(private http:HttpClient, private route: ActivatedRoute,private router:Router ) { }

  ngOnInit() {
    this.course_id = this.route.snapshot.paramMap.get('id');
    this.getCourse(this.course_id);

  }


  // get the course from api 
  async getCourse(id){
    if(id){
      await this.http.get(`http://localhost/lms//lms_api/borne_lecon/${id}`).subscribe((res:any)=>{
        console.log(res);
        this.ressources = res.ressources;
        this.course = res.lecon;
      })
    }
    return;
  }
  // about modals 
  showContents(){
    this.showModal = true;
  }
  closeModal(){
    this.showModal = false;
  }
  // start learnig 
  startLearning(){
    this.startContents = true;
    this.content_index = 1;
    this.currentContent = 1;
  this.currentRessource = 0;
  }

  showNextContent(index){
    this.content_index =index;
    this.currentContent += 1;
    console.log(this.content_index)
    // if(this.content_index < this.contents.length){
    //   this.content_index += 1;
    // }else{
    //   console.log('stoping')
    // }
  }
  // show next ressource 
  showNextRessource(){
    if(this.currentRessource < this.ressources.length  ){
      this.currentRessource += 1;
    }
    else{
      this.hideNextEtape = true;
    }
  }
  redirectToCourses(){
    this.hideNextEtape = false;
    this.startLearning();
    this.router.navigate(['/courses']);
  }
}
