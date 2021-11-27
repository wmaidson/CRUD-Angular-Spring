import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable <Course[]>;
  displayedColumns = ['name','category'];

  // courseService: CoursesService;
  constructor(
    private  courseService: CoursesService,
    public dialog: MatDialog ) {
    // this.courses = [];
    // this.courseService = new CoursesService();
    this.courses$ = this.courseService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');

        return of([])

      })
    )

  }

  onError(ErrorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: ErrorMsg
    });
  }
  ngOnInit(): void {
  }

}
