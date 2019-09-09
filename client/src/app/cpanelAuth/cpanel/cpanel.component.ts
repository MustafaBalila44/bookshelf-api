import { Component, OnInit } from '@angular/core';
import { Book, Author } from '../cpanelclass';
import { CpanelService } from '../cpanel.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})
export class CpanelComponent implements OnInit {
  public files: any[];

  // variable name : type = value
  book: Book = new Book();
  author: Author = new Author();
  authors: Author[] = [];
  constructor(private cpanelService : CpanelService,  private formBuilder: FormBuilder) { }
  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  bookform = this.formBuilder.group({
    image: [''],
 
  });
  ngOnInit() {
    this.cpanelService.getAuthors().subscribe(response => {
      this.authors = response.authors;
    });
  }


  onAddBook() {
    const formData = new FormData();
    
      formData.append('image',this.selectedFile, this.selectedFile.name);
  
      formData.append('name', this.book.name);
      formData.append('priceSdg', this.book.priceSdg.toString());
      formData.append('priceXp', this.book.priceXp.toString());
      formData.append('author', this.book.author);
      formData.append('description', this.book.description);
      formData.append('note', this.book.note);
      formData.append('pages', this.book.pages.toString());
      formData.append('status', this.book.status);
      formData.append('category', this.book.category);

    this.cpanelService.addBook(formData).subscribe((response) => {
      console.log(response);
     });
  }

  onAddAuthor() {
    this.cpanelService.addAuthor(this.author).subscribe((response) => {
      console.log(response);
     });
  }

  onAddUserPoints() {
    this.cpanelService.addBook(this.book).subscribe((response) => {
      console.log(response);
     });
  }

  onAddPonits() {

  }
}
