import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BookService } from '../../services/book.service';
import { Book } from '../../Models/BookInterface';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  displayedColumns: string[] = ['title', 'author', 'publicationYear', 'actions'];
  @Input() searchKey: string = '';
  books: any[] = [];
  dataSource = new MatTableDataSource<Book>(this.books);

  bookForm: any;
  @Input() filterValue: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private bookService: BookService,
    public Fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.getBooks();
    this.createBookForm();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue'] && !changes['filterValue'].isFirstChange()) {
      this.applyFilter(this.filterValue);
    }
  }


  createBookForm() {
    this.bookForm = this.Fb.group({
      id: [''],
      title: [''],
      author: [''],
      publicationYear: [''],
    });
  }



  getBooks() {
    this.bookService.getBooks().subscribe((res: any) => {
      this.books = res;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;
    });
  }



  updateBook(book: Book) {
    this.bookService.updateBook(book).subscribe((res: any) => {
      this.getBooks();
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe((res: any) => {
      this.getBooks();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}








