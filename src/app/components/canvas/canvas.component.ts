import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { ActionHandlerService } from 'src/app/service/action-handler.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  deleteContent: Boolean;
  saveContent: Boolean;

  @ViewChild('canvas') public canvas: ElementRef;

  //TODO: size 
  @Input() public width = 1000;
  @Input() public height = 500;

  private cx: CanvasRenderingContext2D;

  constructor(private actionHanler: ActionHandlerService) { }

  public ngAfterViewInit() {

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);

    this.actionHanler.deleteState.subscribe(state => {
      console.log(state);
      if (state == true) {
        this.cx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }
    })

    this.actionHanler.saveState.subscribe(state => {
      console.log(state);
      if (state == true) {
        let dataURL = canvasEl.toDataURL('image/png');
        console.log(dataURL); //TODO: send Data URL to server 
        alert('Saved Canvas Drawing successful');
      }
    })

  }

  ngOnInit() {
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);

      });

  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {

    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, currentPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

}
