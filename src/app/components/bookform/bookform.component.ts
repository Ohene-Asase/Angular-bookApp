import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../Models/BookInterface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookform',
  standalone: true,
  imports: [ FormsModule,ReactiveFormsModule],
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.scss'
})
export class BookformComponent {
bookForm: FormGroup = new FormGroup({});
books: any[] = [];
  constructor( public Fb: FormBuilder,
               private bookService: BookService,
               public  activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.createBookForm();
  }
  createBookForm() {
    this.bookForm = this.Fb.group({
      // id: [''],
      title: new FormControl('',Validators.required),
      author: new FormControl('',Validators.required),
      publicationYear: new FormControl('',Validators.required)
    });
  }
  getBooks() {
    this.bookService.getBooks().subscribe((res: any) => {
      this.books = res;
 
    });
  }

  addBook(book: Book) {
    console.log(book);
    this.bookService.addBook(book).subscribe((res: any) => {
     res = book;
      this.getBooks();
     this.activeModal.close('added');
    });
  }
}
