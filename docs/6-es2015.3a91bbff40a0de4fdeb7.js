(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"2uiD":function(n,t,o){"use strict";o.r(t);var e=o("2kYt"),c=o("i9Na"),i=o("8MJP"),s=o("1VvW"),l=o("ppiH"),r=o("EM62");const a=[{path:"",component:(()=>{class n{constructor(n,t){this._host=n,this._scrollSpyService=t,this.markdown=o("vRLj")}ngOnInit(){l.add(this._host.nativeElement.querySelector("nav")),this._scrollSpyService.setOffset("window",100)}}return n.\u0275fac=function(t){return new(t||n)(r.Pb(r.n),r.Pb(i.e))},n.\u0275cmp=r.Jb({type:n,selectors:[["app-test-case1"]],decls:18,vars:1,consts:[["uniScrollItem","section1"],["uniScrollItem","section2"],["uniScrollItem","section3"],["uniScrollItem","section4"],["uniScrollSpy","section1",1,"section1"],["uniScrollSpy","section2",1,"section2"],["uniScrollSpy","section3",1,"section3"],["uniScrollSpy","section4",1,"section4"]],template:function(n,t){1&n&&(r.Sb(0,"markdown"),r.oc(1),r.Rb(),r.Sb(2,"h2"),r.oc(3,"Example"),r.Rb(),r.Sb(4,"nav"),r.Sb(5,"ul"),r.Sb(6,"li",0),r.oc(7,"Section 1"),r.Rb(),r.Sb(8,"li",1),r.oc(9,"Section 2"),r.Rb(),r.Sb(10,"li",2),r.oc(11,"Section 3"),r.Rb(),r.Sb(12,"li",3),r.oc(13,"Section 4"),r.Rb(),r.Rb(),r.Rb(),r.Qb(14,"section",4),r.Qb(15,"section",5),r.Qb(16,"section",6),r.Qb(17,"section",7)),2&n&&(r.Fb(1),r.pc(t.markdown.default))},directives:[c.a,i.c,i.d],styles:["[_nghost-%COMP%]{display:block;padding:1rem}[_nghost-%COMP%]   nav[_ngcontent-%COMP%]{position:-webkit-sticky;position:sticky;top:50px;background-color:#ff9240}[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0;padding:0;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;margin:0;padding:1rem;color:#eaecee}[_nghost-%COMP%]   nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]{color:#ff9240;background-color:#fff}[_nghost-%COMP%]   section[_ngcontent-%COMP%]{height:1000px}[_nghost-%COMP%]   section.section1[_ngcontent-%COMP%]{background-color:#036}[_nghost-%COMP%]   section.section2[_ngcontent-%COMP%]{background-color:#369}[_nghost-%COMP%]   section.section3[_ngcontent-%COMP%]{background-color:#69c}[_nghost-%COMP%]   section.section4[_ngcontent-%COMP%]{background-color:#9cf}"]}),n})()}];let p=(()=>{class n{}return n.\u0275mod=r.Nb({type:n}),n.\u0275inj=r.Mb({factory:function(t){return new(t||n)},imports:[[s.e.forChild(a)],s.e]}),n})();o.d(t,"TestCase1Module",(function(){return u}));let u=(()=>{class n{}return n.\u0275mod=r.Nb({type:n}),n.\u0275inj=r.Mb({factory:function(t){return new(t||n)},imports:[[e.c,c.b,p,i.a.forRoot({lookAhead:!0})]]}),n})()},vRLj:function(n,t,o){"use strict";o.r(t),t.default='You can find the complete test case at GitHub. [Test Case 1](https://github.com/uniprank/ngx-scrollspy/tree/master/library/TestCases/src/app/modules/test-case1)\n\n## TestCase1Component\n\n```js\n@Component({\n    selector: \'app-test-case1\',\n    templateUrl: \'./test-case1.component.html\',\n    styleUrls: [\'./test-case1.component.scss\']\n})\nexport class TestCase1Component implements OnInit {\n    constructor(private _scrollSpyService: ScrollSpyService) {}\n\n    ngOnInit() {\n        this._scrollSpyService.setOffset(\'window\', 100);\n    }\n}\n```\n\n## TestCase1Component HTML\n\n```html\n<nav>\n    <ul>\n        <li uniScrollItem="section1">Section 1</li>\n        <li uniScrollItem="section2">Section 2</li>\n        <li uniScrollItem="section3">Section 3</li>\n        <li uniScrollItem="section4">Section 4</li>\n    </ul>\n</nav>\n<section uniScrollSpy="section1"></section>\n<section uniScrollSpy="section2"></section>\n<section uniScrollSpy="section3"></section>\n<section uniScrollSpy="section4"></section>\n```\n'}}]);