import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {


 @Output() addTodo: EventEmitter<any> = new EventEmitter();
 @Input() isAdmin: boolean;
  constructor() { }
  title: string;
  onSubmit() {
    const todo = {
      title: this.title,
      completed: false
    };

    this.addTodo.emit(todo);
  }

  ngOnInit() {

  }

}
