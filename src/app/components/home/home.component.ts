import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookformComponent } from '../bookform/bookform.component';
import { BookService } from '../../services/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ TableComponent, FormsModule, ReactiveFormsModule]
})
export class HomeComponent {
books: any[] = [];
filterValue: any;

    constructor( private modalService: NgbModal,
                 private bookService: BookService,
    ) { }

    ngOnInit() {
        this.getBooks();
    }
    
    getBooks() {
        this.bookService.getBooks().subscribe((res: any) => {
          this.books = res;
        });
      }

      openModal() {
        const modalRef = this.modalService.open(BookformComponent);
        modalRef.result.then((result) => {
          if (result === 'added') {
            this.getBooks();  // Refresh the book list
          }
        }, (reason) => {
          // Handle dismiss
        });
      }

      setFilterValue(event: Event) {
        this.filterValue = (event.target as HTMLInputElement).value;
      }
}

