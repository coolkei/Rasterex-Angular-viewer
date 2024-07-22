import { Component, HostListener, OnInit } from '@angular/core';
import { AnnotationToolsService } from '../annotation-tools.service';
import { RXCore } from 'src/rxcore';
import { IMarkup } from 'src/rxcore/models/IMarkup';
import { MARKUP_TYPES } from 'src/rxcore/constants';
import { RxCoreService } from 'src/app/services/rxcore.service';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Subscription, audit, retry } from 'rxjs';

declare var LeaderLine: any;

@Component({
  selector: 'rx-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class NotePanelComponent implements OnInit {
  visible: boolean = false;
  list: { [key: string]: Array<IMarkup> };
  search: string;
  panelwidth: number = 300;


  /*added for comment list panel */
  note: any[] = [];
  connectorLine: any;
  lineConnectorNativElement: any = document.getElementById('lineConnector');
  activeMarkupNumber: number = -1;
  markupNoteList: number[] = [];
  noteIndex: number;
  annotation: any = null;
  isHideAnnotation: boolean = false;
  annotations: any[] = [];
  annotationSet: Set<string> = new Set<string>();
  pagenumbers: any[] = [];
  pagenumberSet: Set<number> = new Set<number>();
  //sortByField: 'created' | 'author' = 'created';
  sortByField: 'created' | 'position' | 'author' | 'pagenumber' | 'annotation' = 'created';

  sortOptions = [
    { value: "created", label: "Created day" },
    { value: "author", label: "Author" },
    { value: "pagenumber", label: "Page" },
    { value: "position", label: "Position" },
    { value: "annotation", label: "Annotation Type" }
  ];

  /*added for comment list panel */


  sortOrder = (a, b): number => 0;
  filterVisible: boolean = false;
  createdByFilterOptions: Array<any> = [];
  createdByFilter: Set<string> = new Set<string>();
  dateFilter: {
    startDate: dayjs.Dayjs | undefined,
    endDate: dayjs.Dayjs | undefined
  } = { startDate: undefined, endDate: undefined };

  /*added for comment list panel */
  private guiOnPanUpdatedSubscription: Subscription;
  /*added for comment list panel */

  leaderLine: any = undefined;
  rectangle: any;

  constructor(
    private readonly rxCoreService: RxCoreService,
    private readonly annotationToolsService: AnnotationToolsService) {
    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    dayjs.updateLocale('en', {
      relativeTime: {
        past: "%s",
        s: 'A few seconds ago',
        m: "A minute ago",
        mm: function (number) {
          return number > 10 ? `${number} minutes ago` : "A few minutes ago";
        },
        h: "An hour ago",
        hh: "Today",
        d: "Yesterday",
        dd: function (number) {
          return number > 1 ? `${number} days ago` : "Yesterday";
        },
        M: "A month ago",
        MM: "%d months ago",
        y: "A year ago",
        yy: "%d years ago"
      }
    });
  }

  private _showLeaderLine(markup: IMarkup): void {
    this._hideLeaderLine();

    const start = document.getElementById(`note-panel-${markup.markupnumber}`);
    if (!start) return;

    const end = document.createElement('div');
    end.style.position = 'fixed';
    end.style.left = `${markup.xscaled + 92}px`;
    end.style.top = `${markup.yscaled + 58}px`;
    end.className = 'leader-line-end';
    document.body.appendChild(end);

    this.leaderLine = new LeaderLine({
      start,
      end,
      color: document.documentElement.style.getPropertyValue("--accent"),
      size: 2,
      path: 'grid',
      endPlug: 'arrow2',
      endPlugSize: 1.5
    });
  }

  private _hideLeaderLine(): void {
    if (this.leaderLine) {
      this.leaderLine.remove();
      this.leaderLine = undefined;
    }
    document.querySelectorAll(".leader-line-end,.leader-line").forEach(el => el.remove());
  }

  private _processList(list: Array<IMarkup> = []): void {
    const query = list
      .filter((i: any) => {
        if (this.search) {
          if (this.connectorLine)
            this.connectorLine.hide();
          let searchQuery = this.search.toLocaleLowerCase();
          let comments: any = i.comments.map((i: any) => { return i.value.toLocaleLowerCase(); });

          if (comments.find((x: string) => x.includes(searchQuery))) {
            return (this.dateFilter.startDate ? dayjs(i.timestamp).isSameOrAfter(this.dateFilter.startDate) : true)
              && (this.dateFilter.endDate ? dayjs(i.timestamp).isSameOrBefore(this.dateFilter.endDate.endOf('day')) : true) && !i.bisTextArrow
          } else {
            return false;
          }
        } else {
          return (this.dateFilter.startDate ? dayjs(i.timestamp).isSameOrAfter(this.dateFilter.startDate) : true)
            && (this.dateFilter.endDate ? dayjs(i.timestamp).isSameOrBefore(this.dateFilter.endDate.endOf('day')) : true) && !i.bisTextArrow
        }
      }
      )
      .filter((item: any) => {
        return this.annotationSet.has(item.getMarkupType().label) && this.pagenumberSet.has(item.pagenumber + 1)
      })
      .map((item: any) => {
        item.author = RXCore.getDisplayName(item.signature);
        item.createdStr = dayjs(item.timestamp).format(`MMM D,${dayjs().year() != dayjs(item.timestamp).year() ? 'YYYY ' : ''} h:mm A`);
        //item.IsExpanded = item?.IsExpanded;
        item.IsExpanded = this.activeMarkupNumber > 0 ? item?.IsExpanded : false;
        return item;
      })
      .sort((a, b) => {
        switch (this.sortByField) {
          case 'created':
            return b.timestamp - a.timestamp;
          case 'author':
            return a.author.localeCompare(b.author);
          case 'position':
            return a.y - b.y;
        }
      });

    if (this.sortByField == 'created') {
      this.list = query.reduce((list, item) => {
        const date = dayjs(item.timestamp).fromNow();
        if (!list[date]) {
          list[date] = [item];
        } else {
          list[date].push(item);
        }

        return list;
      }, {});
    } else if (this.sortByField === 'author') {
      this.list = query.reduce((list, item) => {
        const author = item.author
        if (!list[author]) {
          list[author] = [item];
        } else {
          list[author].push(item);
        }
        return list;
      }, {});
    } else if (this.sortByField === 'pagenumber') {
      this.list = query.reduce((list, item) => {
        const page = item.pagenumber
        if (!list[page]) {
          list[page] = [item];
        } else {
          list[page].push(item);
        }
        return list;
      }, {});
    } else if (this.sortByField === 'annotation') {
      this.list = query.reduce((list, item) => {
        const annotation = item.getMarkupType().label
        if (!list[annotation]) {
          list[annotation] = [item];
        } else {
          list[annotation].push(item);
        }
        return list;
      }, {});
    } else {
      this.list = {
        "": query
      }
    }
  }

  ngOnInit(): void {
    this.annotationToolsService.notePanelState$.subscribe(state => {
      /*added for comment list panel */
      this.activeMarkupNumber = state?.markupnumber;
      this.visible = state?.visible
      if (this.activeMarkupNumber) {
        this.markupNoteList.push(this.activeMarkupNumber);
        this.markupNoteList = [...new Set(this.markupNoteList)];
        let markupList = this.rxCoreService.getGuiMarkupList();
        this._processList(markupList);
      }
      /*added for comment list panel */
      this._hideLeaderLine();
    });

    function checkIfOptionChanged(array1: any[], array2: any[]) {
      if (array1.length != array2.length) return false;
      else {
        let value = true;
        array1.forEach((item, id) => {
          if (item.label != array2[id].label || item.value != array2[id].value) {
            value = false;
          }
        })
        return value;
      }
    }

    this.rxCoreService.guiMarkupList$.subscribe((list = []) => {
      const createdByFilter = new Set<any>();
      const annotationSet = new Set<any>();
      const createdByFilterOptions: any[] = [];
      const annotations: any[] = [];
      const pagenumberSet = new Set<any>();
      const pagenumbers: any[] = [];
      list.forEach((item: any) => {
        if (!item.author) return
        const index = createdByFilterOptions.findIndex(value => value.label === item.author)
        if (index != -1) return;
        createdByFilter.add(item.author)
        createdByFilterOptions.push({
          value: item.author,
          label: item.author,
          selected: true
        })
      })
      list.forEach((item: any) => {
        if (!item.getMarkupType().label) return;
        const label = item.getMarkupType().label;
        const index = annotations.findIndex(value => value.label === label)
        if (index != -1) return;
        annotationSet.add(label);
        annotations.push({
          value: label,
          label: label,
          selected: true
        })
      })
      list.forEach((item: any) => {
        const page = item.pagenumber + 1;
        const index = pagenumbers.findIndex(value => value.label == page)
        if (index != -1) return;
        pagenumberSet.add(page);
        pagenumbers.push({
          value: page,
          label: page,
          selected: true
        })
      })
      if (!checkIfOptionChanged(annotations, this.annotations)) {
        this.annotations = annotations;
        this.annotationSet = annotationSet;
      }
      if (!checkIfOptionChanged(createdByFilterOptions, this.createdByFilterOptions)) {
        this.createdByFilter = createdByFilter;
        this.createdByFilterOptions = createdByFilterOptions;
      }

      if (!checkIfOptionChanged(pagenumbers, this.pagenumbers)) {
        this.pagenumbers = pagenumbers;
        this.pagenumberSet = pagenumberSet;
      }

      if (list.length > 0 && !this.isHideAnnotation) {
        setTimeout(() => {
          if (list.find(itm => itm.getselected()) === undefined)
            this.activeMarkupNumber = -1;
          //console.log(itm.selected);

          this._processList(list);
        }, 250);
      } else {
        this._processList(list);
      }


    });


    this.rxCoreService.guiPage$.subscribe((state) => {
      //this.currentPage = state.currentpage;
      if (this.connectorLine) {
        //RXCore.unSelectAllMarkup();
        this.annotationToolsService.hideQuickActionsMenu();
        this.connectorLine.hide();
        this._hideLeaderLine();
      }

    });



    this.rxCoreService.guiMarkupIndex$.subscribe(({ markup, operation }) => {
      this._hideLeaderLine();

      if (operation.modified || operation.created) {
        this.SetActiveCommentSelect(markup);
      }

      if (operation.created) {

        this.addTextNote(markup);
      }


    });


    this.rxCoreService.guiMarkup$.subscribe(({ markup, operation }) => {
      this._hideLeaderLine();

      if (operation.modified || operation.created) {
        this.SetActiveCommentSelect(markup);
      }

      if (operation.created) {

        this.addTextNote(markup);
      }


    });

    this.guiOnPanUpdatedSubscription = this.rxCoreService.guiOnPanUpdated$.subscribe(({ sx, sy, pagerect }) => {
      if (this.connectorLine) {
        //RXCore.unSelectAllMarkup();
        this.annotationToolsService.hideQuickActionsMenu();
        this.connectorLine.hide();
        this._hideLeaderLine();
      }
    });

    this.guiOnPanUpdatedSubscription = this.rxCoreService.resetLeaderLine$.subscribe((response: boolean) => {
      if (this.connectorLine) {
        //RXCore.unSelectAllMarkup();
        this.annotationToolsService.hideQuickActionsMenu();
        this.connectorLine.hide();
        this._hideLeaderLine();
      }
    });


    this.rxCoreService.guiOnMarkupChanged.subscribe(({ annotation, operation }) => {
      //this.visible = false;
      this._hideLeaderLine();
    });


  }

  get isEmpytyList(): boolean {
    return Object.keys(this.list || {}).length == 0 || this.list[""]?.length == 0;
  }

  get isFilterActive(): boolean {
    return this.filterVisible == true
      || this.createdByFilterOptions.length != this.createdByFilter.size
      || this.annotations.length != this.annotationSet.size
      || this.dateFilter.startDate != undefined
      || this.dateFilter.endDate != undefined;
  }

  onNoteClick(markup: IMarkup): void {
    //RXCore.unSelectAllMarkup();
    RXCore.selectMarkUpByIndex(markup.markupnumber);
    this.rxCoreService.setGuiMarkupIndex(markup, {});
    //this._showLeaderLine(markup);
  }

  onSearch(event): void {
    this._processList(this.rxCoreService.getGuiMarkupList());
  }

  onSortFieldChanged(event): void {
    this.sortByField = event.value;
    this._processList(this.rxCoreService.getGuiMarkupList());
  }

  onCreatedByFilterChange(values): void {
    this.createdByFilter = new Set(values);
  }

  onDateSelect(dateRange: { startDate: dayjs.Dayjs, endDate: dayjs.Dayjs }): void {
    this.dateFilter = dateRange;
  }

  onPageChange(values): void {
    this.pagenumberSet = new Set(values);
  }

  onAnnotationChange(values): void {
    this.annotationSet = new Set(values);
  }

  onFilterApply(): void {
    this._processList(this.rxCoreService.getGuiMarkupList());
    this.filterVisible = false;
  }

  onClose(): void {
    this.visible = false;
    this._hideLeaderLine();
    RXCore.setLayout(0, 0, false);
    RXCore.doResize(false, 0, 0);/*added for comment list panel */
    this.rxCoreService.setCommentSelected(false);
  }

  onWindowResize(event): void {
    this._hideLeaderLine();
  }

  formatDate(date) {
    return dayjs(date).format(`MMM D,${dayjs().year() != dayjs(date).year() ? 'YYYY ' : ''} h:mm A`);
  }

  addTextNote(markup: any): void {
    if (markup.type == 9 || markup.type == 10) {
      this.note[markup.markupnumber] = markup.text;
    }

  }

  onAddNote(markup: any): void {
    if (this.note[markup.markupnumber]) {
      if (this.noteIndex >= 0) {
        markup.editComment(this.noteIndex, this.note[markup.markupnumber]);
        this.noteIndex = -1;
      } else if (this.noteIndex === -100) {
        this.noteIndex = -1;
        markup.setText(this.note[markup.markupnumber])
      } else {
        markup.AddComment(
          markup.comments.length,
          markup.signature,
          this.note[markup.markupnumber])
      }
      this.note[markup.markupnumber] = "";
    }
    else
      return;
  }


  GetCommentLength(): number {

    let noOfComments = 0;

    Object.values(this.list || {}).forEach(comment => {
      noOfComments += comment.length;
    });
    return noOfComments;

    //return Object.keys(this.list || {}).length;
  }


  OnEditMarkup(markup) {
    this.noteIndex = -100;
    if (markup.text != "") {
      this.note[markup.markupnumber] = markup.text
    } else {
      this.note[markup.markupnumber] = markup.dimtext
    }
  }

  OnRemoveMarkup(markup) {
    RXCore.deleteMarkupbyGUID(markup.uniqueID)
  }


  OnEditComment(event, markupNo: any, itemNote: any): void {
    event.stopPropagation();

    this.noteIndex = itemNote.id;
    this.note[markupNo] = itemNote.value;
  }


  OnRemoveComment(event, markup: any, id: number, index: number): void {
    event.stopPropagation();

    markup.deleteComment(id);
    if (markup.comments.length === 0) {
      if (this.connectorLine)
        this.connectorLine.hide();
      this.markupNoteList = this.markupNoteList.filter(item => { return item !== markup.markupnumber; });
      this._processList(this.rxCoreService.getGuiMarkupList());
    }
    if (index === 0) {
      markup.comments = [];
      //markup.selected = true;

      markup.deleteComment(id);
      //RXCore.deleteMarkUp();


    }
  }


  DrawConnectorLine(startElem, endElem) {
    if (startElem !== null && endElem !== null) {
      if (this.connectorLine)
        this.connectorLine.hide();
      this.connectorLine = new LeaderLine(
        startElem,
        endElem, {
        startPlug: 'square',
        endPlug: 'square',
        endPlugOutline: false,
        size: 2.5,
        color: '#14ab0a',
        path: 'grid',
        startSocketGravity: 0,
        animOptions: { duration: 300, timing: 'linear' }
      });
    }
  }

  SetActiveCommentSelect(markup: any) {

    if (markup.bisTextArrow && markup.textBoxConnected != null) {
      markup = markup.textBoxConnected;
    }

    let markupNo = markup.markupnumber;

    if (markupNo) {
      this.activeMarkupNumber = markupNo;
      //this.onSelectAnnotation(markup);
      this._setPosition(markup);
    }

  }

  setActiveMarkUp(event, markup) {
    if (this.activeMarkupNumber != markup.markupnumber) {
      RXCore.gotoPage(markup.pagenumber)
      RXCore.zoomMarkup(markup)
    }
    event.stopPropagation()
    setTimeout(() => {
      if (markup) {
        if (this.connectorLine) {
          RXCore.unSelectAllMarkup();
          this.annotationToolsService.hideQuickActionsMenu();
          this.connectorLine.hide();
          this._hideLeaderLine();
        }
        Object.values(this.list || {}).forEach(comments => {
          comments.forEach((comment: any) => {
            if (comment.markupnumber === markup.markupnumber) {
              comment.IsExpanded = !comment.IsExpanded
            } else {
              comment.IsExpanded = false;
            }
          })
        })
        if (this.activeMarkupNumber != markup.markupnumber) {
          this.activeMarkupNumber = markup.markupnumber;
          this.onSelectAnnotation(markup);
          setTimeout(() => {
            this._setPosition(markup);
          }, 100);
        }
      }
    }, 100)

    event.preventDefault()
  }

  trackByFn(index, item) {
    return item.id;
  }


  ngOnDestroy(): void {
    this.guiOnPanUpdatedSubscription.unsubscribe();
  }

  onSelectAnnotation(markup: any): void {
    //RXCore.unSelectAllMarkup();
    //RXCore.selectMarkUp(true);
    RXCore.selectMarkUpByIndex(markup.markupnumber);
    //markup.selected = true;
    this.rxCoreService.setGuiMarkupIndex(markup, {});

  }


  private _setPosition(markup: any): void {
    //RXCore.unSelectAllMarkup();
    //this.rxCoreService.setGuiMarkup(markup, {});
    //this.lineConnectorNativElement.style.top = (markup.yscaled + (markup.hscaled / 2) - 10) + 'px';
    //this.lineConnectorNativElement.style.left = (markup.xscaled + markup.wscaled - 5) + 'px';
    //this.DrawConnectorLine(document.getElementById('note-panel-' + this.activeMarkupNumber), this.lineConnectorNativElement);

    if (markup.bisTextArrow && markup.textBoxConnected != null) {
      markup = markup.textBoxConnected;
    }

    if (markup.type !== MARKUP_TYPES.COUNT.type) {
      const wscaled = (markup.wscaled || markup.w) / window.devicePixelRatio;
      const hscaled = (markup.hscaled || markup.h) / window.devicePixelRatio;
      const xscaled = (markup.xscaled || markup.x) / window.devicePixelRatio;
      const yscaled = (markup.yscaled || markup.y) / window.devicePixelRatio;
      let rely = yscaled + (hscaled * 0.5);
      let absy = yscaled + ((hscaled - yscaled) * 0.5);

      let sidepointabs = {
        x: wscaled,
        y: absy
      }

      let sidepointrel = {
        x: xscaled + wscaled,
        y: rely
      }




      let _dx = window == top ? 0 : - 82;
      let _dy = window == top ? 0 : -48;

      let dx = 0 + _dx;
      let dy = -10 + _dy;

      switch (markup.type) {
        case MARKUP_TYPES.ERASE.type:
        case MARKUP_TYPES.SHAPE.POLYGON.type:
        case MARKUP_TYPES.PAINT.POLYLINE.type:
        case MARKUP_TYPES.MEASURE.PATH.type:
        case MARKUP_TYPES.MEASURE.AREA.type: {
          let p = markup.points[0];
          for (let point of markup.points) {
            if (point.y < p.y) {
              p = point;
            }
          }
          this.rectangle = {
            //x: (p.x / window.devicePixelRatio) - (markup.subtype == MARKUP_TYPES.SHAPE.POLYGON.subType ? 26 : 4),
            //y: (p.y / window.devicePixelRatio) - 16,
            x: sidepointabs.x,
            y: sidepointabs.y,
            //x_1: xscaled + wscaled - 20,
            x_1: wscaled - 20,
            y_1: yscaled - 20,
          };
          break;
        }
        case MARKUP_TYPES.NOTE.type:
          dx = (wscaled / 2) - 5 + _dx;
          dy = -10 + _dy;
          this.rectangle = {
            //x: xscaled + dx,
            //y: yscaled + dy,
            x: sidepointrel.x,
            y: sidepointrel.y,
            x_1: xscaled + wscaled - 20,
            y_1: yscaled - 20,
          };
          break;
        /*case MARKUP_TYPES.ERASE.type:
          dx = ((wscaled - xscaled) / 2) - 5 + _dx;
          this.rectangle = {
            x: xscaled + dx,
            y: yscaled + dy,
            x_1: xscaled + wscaled - 20,
            y_1: yscaled - 20,
          };
          break;*/
        case MARKUP_TYPES.ARROW.type:
          dx = -26 + _dx;
          this.rectangle = {
            x: xscaled + dx,
            y: yscaled + dy,
            x_1: xscaled + wscaled - 20,
            y_1: yscaled - 20,
          };
          break;
        case MARKUP_TYPES.MEASURE.LENGTH.type:
          this.rectangle = {
            x: xscaled - 5,
            y: yscaled - 5,
            x_1: xscaled + wscaled - 20,
            y_1: yscaled - 20,
          };
          break;
        default:
          dx = (wscaled / 2) - 24 + _dx;
          this.rectangle = {

            /* bugfix 2 */
            x: xscaled + dx + (wscaled / 2) + 20,
            y: yscaled + dy + (hscaled / 2) + 10,
            //x: xscaled + dx,
            //y: yscaled + dy,
            /* bugfix 2 */
            x_1: xscaled + wscaled - 20,
            y_1: yscaled - 20,
          };
          break;
      }

      if (this.rectangle.y < 0) {
        this.rectangle.y += hscaled + 72;
        this.rectangle.position = "bottom";
      } else {
        this.rectangle.position = "top";
      }

      if (this.rectangle.x < 0) {
        this.rectangle.x = 0;
      }

      if (this.rectangle.x > document.body.offsetWidth - 200) {
        this.rectangle.x = document.body.offsetWidth - 200;
      }
      /* bugfix 2 */
      //this.lineConnectorNativElement.style.top = this.rectangle.y + (hscaled / 2) + 10 + 'px';
      //this.lineConnectorNativElement.style.left = this.rectangle.x + (wscaled / 2) + 20 + 'px';

      this.lineConnectorNativElement.style.top = this.rectangle.y + 'px';
      this.lineConnectorNativElement.style.left = this.rectangle.x + 'px';
      /* bugfix 2 */

      this.lineConnectorNativElement.style.position = this.rectangle.position;

      /* bugfix 2 */
      //this.DrawConnectorLine(document.getElementById('note-panel-' + this.activeMarkupNumber), this.lineConnectorNativElement);

      const lineConnectorEnd = document.getElementById('note-panel-' + this.activeMarkupNumber);
      if (lineConnectorEnd && this.lineConnectorNativElement)
        this.DrawConnectorLine(document.getElementById('note-panel-' + this.activeMarkupNumber), this.lineConnectorNativElement);
      /* bugfix 2 */

    } else {
      //this.onSelectAnnotation(markup);
    }

  }

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {
    if (event.type == 'scroll') {
      event.preventDefault();
      if (this.connectorLine) {
        //RXCore.unSelectAllMarkup();
        this.annotationToolsService.hideQuickActionsMenu();
        this.connectorLine.hide();
        this._hideLeaderLine();
        event.stopPropagation();
      }

    }
  }

}
