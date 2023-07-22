import { Component } from '@angular/core';
import words from 'an-array-of-english-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usableWords = words.filter((n:string) => n.length >= 3 && n.length <= 8)

  randomText:string  = this.randomSelection(10)
  inputedText:string = ''
  progress:number    = 0

  timeSpent:number = 0
  started:boolean  = false
  finished:boolean = false
  timer:any

  onType(event: any) {
    if (!this.started && !this.finished) {
      this.started = true
      this.timer = setInterval(() => {this.timeSpent += 1}, 1000);
    }

    let textTyped = String(event.target.value)
    this.inputedText = textTyped

    this.progress = this.inputedText.length / this.randomText.length 
  }

  verify():boolean {
    if (this.inputedText === this.randomText) {
      this.finished = true
      clearInterval(this.timer);
      (<HTMLInputElement>document.getElementById("usrInput")).disabled = true;
      return true
    }
    return false
  }

  compare(randomLetter:string, inputedLetter:string):string {
    if(!inputedLetter)
      return 'pending'

    return randomLetter === inputedLetter ? 'correct' : 'incorrect'
  }

  randomSelection(size:number):string {
    let text:string = ''
    
    for(let i = 0; i < size; i++) {
      text += this.usableWords[(Math.floor(Math.random() * this.usableWords.length))]
      text += i == size-1 ? '' : ' '
    }

    return text
  }

  regen():any {
    this.randomText  = this.randomSelection(10)
    this.inputedText = ''
    this.progress    = 0

    this.timeSpent = 0
    this.started   = false
    this.finished  = false

    const inputTxt = <HTMLInputElement>document.getElementById("usrInput")
    if (inputTxt)
      inputTxt.value = '';

    (<HTMLInputElement>document.getElementById("usrInput")).disabled = false;
  }
}
