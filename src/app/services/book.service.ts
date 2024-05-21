import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Models/BookInterface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
private apiUrl = 'https://localhost:44331/api/Book';

  constructor(private http: HttpClient) {  }

  getBooks(): Observable<Book[]> 
  {
  return  this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book>
  {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book>
  {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(book: Book): Observable<Book>
  {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<Book>
  {
    return this.http.delete<Book>(`${this.apiUrl}/${id}`);
  }

}
