var IN_GLOBAL_SCOPE=!0;window.PR_SHOULD_USE_CONTINUATION=!0;var prettyPrintOne,prettyPrint;!function(){function e(e){function t(e){var t=e.charCodeAt(0);if(92!==t)return t;var n=e.charAt(1);return t=p[n],t?t:n>="0"&&"7">=n?parseInt(e.substring(1),8):"u"===n||"x"===n?parseInt(e.substring(2),16):e.charCodeAt(1)}function n(e){if(32>e)return(16>e?"\\x0":"\\x")+e.toString(16);var t=String.fromCharCode(e);return"\\"===t||"-"===t||"]"===t||"^"===t?"\\"+t:t}function r(e){var r=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),a=[],s="^"===r[0],i=["["];s&&i.push("^");for(var l=s?1:0,o=r.length;o>l;++l){var u=r[l];if(/\\[bdsw]/i.test(u))i.push(u);else{var c,p=t(u);o>l+2&&"-"===r[l+1]?(c=t(r[l+2]),l+=2):c=p,a.push([p,c]),65>c||p>122||(65>c||p>90||a.push([32|Math.max(65,p),32|Math.min(c,90)]),97>c||p>122||a.push([-33&Math.max(97,p),-33&Math.min(c,122)]))}}a.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});for(var f=[],d=[],l=0;l<a.length;++l){var h=a[l];h[0]<=d[1]+1?d[1]=Math.max(d[1],h[1]):f.push(d=h)}for(var l=0;l<f.length;++l){var h=f[l];i.push(n(h[0])),h[1]>h[0]&&(h[1]+1>h[0]&&i.push("-"),i.push(n(h[1])))}return i.push("]"),i.join("")}function a(e){for(var t=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),a=t.length,l=[],o=0,u=0;a>o;++o){var c=t[o];if("("===c)++u;else if("\\"===c.charAt(0)){var p=+c.substring(1);p&&(u>=p?l[p]=-1:t[o]=n(p))}}for(var o=1;o<l.length;++o)-1===l[o]&&(l[o]=++s);for(var o=0,u=0;a>o;++o){var c=t[o];if("("===c)++u,l[u]||(t[o]="(?:");else if("\\"===c.charAt(0)){var p=+c.substring(1);p&&u>=p&&(t[o]="\\"+l[p])}}for(var o=0;a>o;++o)"^"===t[o]&&"^"!==t[o+1]&&(t[o]="");if(e.ignoreCase&&i)for(var o=0;a>o;++o){var c=t[o],f=c.charAt(0);c.length>=2&&"["===f?t[o]=r(c):"\\"!==f&&(t[o]=c.replace(/[a-zA-Z]/g,function(e){var t=e.charCodeAt(0);return"["+String.fromCharCode(-33&t,32|t)+"]"}))}return t.join("")}for(var s=0,i=!1,l=!1,o=0,u=e.length;u>o;++o){var c=e[o];if(c.ignoreCase)l=!0;else if(/[a-z]/i.test(c.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){i=!0,l=!1;break}}for(var p={b:8,t:9,n:10,v:11,f:12,r:13},f=[],o=0,u=e.length;u>o;++o){var c=e[o];if(c.global||c.multiline)throw new Error(""+c);f.push("(?:"+a(c)+")")}return new RegExp(f.join("|"),l?"gi":"g")}function t(e,t){function n(e){var o=e.nodeType;if(1==o){if(r.test(e.className))return;for(var u=e.firstChild;u;u=u.nextSibling)n(u);var c=e.nodeName.toLowerCase();("br"===c||"li"===c)&&(a[l]="\n",i[l<<1]=s++,i[l++<<1|1]=e)}else if(3==o||4==o){var p=e.nodeValue;p.length&&(p=t?p.replace(/\r\n?/g,"\n"):p.replace(/[ \t\r\n]+/g," "),a[l]=p,i[l<<1]=s,s+=p.length,i[l++<<1|1]=e)}}var r=/(?:^|\s)nocode(?:\s|$)/,a=[],s=0,i=[],l=0;return n(e),{sourceCode:a.join("").replace(/\n$/,""),spans:i}}function n(e,t,n,r){if(t){var a={sourceCode:t,basePos:e};n(a),r.push.apply(r,a.decorations)}}function r(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling){var r=n.nodeType;t=1===r?t?e:n:3===r?G.test(n.nodeValue)?e:t:t}return t===e?void 0:t}function a(t,r){var a,s={};!function(){for(var n=t.concat(r),i=[],l={},o=0,u=n.length;u>o;++o){var c=n[o],p=c[3];if(p)for(var f=p.length;--f>=0;)s[p.charAt(f)]=c;var d=c[1],h=""+d;l.hasOwnProperty(h)||(i.push(d),l[h]=null)}i.push(/[\0-\uffff]/),a=e(i)}();var i=r.length,l=function(e){for(var t=e.sourceCode,o=e.basePos,c=[o,I],p=0,f=t.match(a)||[],d={},h=0,g=f.length;g>h;++h){var m,v=f[h],y=d[v],b=void 0;if("string"==typeof y)m=!1;else{var x=s[v.charAt(0)];if(x)b=v.match(x[1]),y=x[0];else{for(var w=0;i>w;++w)if(x=r[w],b=v.match(x[1])){y=x[0];break}b||(y=I)}m=y.length>=5&&"lang-"===y.substring(0,5),!m||b&&"string"==typeof b[1]||(m=!1,y=j),m||(d[v]=y)}var S=p;if(p+=v.length,m){var C=b[1],N=v.indexOf(C),_=N+C.length;b[2]&&(_=v.length-b[2].length,N=_-C.length);var P=y.substring(5);n(o+S,v.substring(0,N),l,c),n(o+S+N,C,u(P,C),c),n(o+S+_,v.substring(_),l,c)}else c.push(o+S,y)}e.decorations=c};return l}function s(e){var t=[],n=[];e.tripleQuotedStrings?t.push([A,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push([A,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push([A,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&n.push([A,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);var r=e.hashComments;r&&(e.cStyleComments?(r>1?t.push([R,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]):t.push([R,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),n.push([A,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push([R,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(n.push([R,/^\/\/[^\r\n]*/,null]),n.push([R,/^\/\*[\s\S]*?(?:\*\/|$)/,null]));var s=e.regexLiterals;if(s){var i=s>1?"":"\n\r",l=i?".":"[\\S\\s]",o="/(?=[^/*"+i+"])(?:[^/\\x5B\\x5C"+i+"]|\\x5C"+l+"|\\x5B(?:[^\\x5C\\x5D"+i+"]|\\x5C"+l+")*(?:\\x5D|$))+/";n.push(["lang-regex",RegExp("^"+V+"("+o+")")])}var u=e.types;u&&n.push([T,u]);var c=(""+e.keywords).replace(/^ | $/g,"");c.length&&n.push([k,new RegExp("^(?:"+c.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push([I,/^\s+/,null," \r\n	 "]);var p="^.[^\\s\\w.$@'\"`/\\\\]*";return e.regexLiterals&&(p+="(?!s*/)"),n.push([$,/^@[a-z_$][a-z_$@0-9]*/i,null],[T,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[I,/^[a-z_$][a-z_$@0-9]*/i,null],[$,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[I,/^\\[\s\S]?/,null],[O,new RegExp(p),null]),a(t,n)}function i(e,t,n){function r(e){var t=e.nodeType;if(1!=t||s.test(e.className)){if((3==t||4==t)&&n){var o=e.nodeValue,u=o.match(i);if(u){var c=o.substring(0,u.index);e.nodeValue=c;var p=o.substring(u.index+u[0].length);if(p){var f=e.parentNode;f.insertBefore(l.createTextNode(p),e.nextSibling)}a(e),c||e.parentNode.removeChild(e)}}}else if("br"===e.nodeName)a(e),e.parentNode&&e.parentNode.removeChild(e);else for(var d=e.firstChild;d;d=d.nextSibling)r(d)}function a(e){function t(e,n){var r=n?e.cloneNode(!1):e,a=e.parentNode;if(a){var s=t(a,1),i=e.nextSibling;s.appendChild(r);for(var l=i;l;l=i)i=l.nextSibling,s.appendChild(l)}return r}for(;!e.nextSibling;)if(e=e.parentNode,!e)return;for(var n,r=t(e.nextSibling,0);(n=r.parentNode)&&1===n.nodeType;)r=n;u.push(r)}for(var s=/(?:^|\s)nocode(?:\s|$)/,i=/\r\n?|\n/,l=e.ownerDocument,o=l.createElement("li");e.firstChild;)o.appendChild(e.firstChild);for(var u=[o],c=0;c<u.length;++c)r(u[c]);t===(0|t)&&u[0].setAttribute("value",t);var p=l.createElement("ol");p.className="linenums";for(var f=Math.max(0,t-1|0)||0,c=0,d=u.length;d>c;++c)o=u[c],o.className="L"+(c+f)%10,o.firstChild||o.appendChild(l.createTextNode(" ")),p.appendChild(o);e.appendChild(p)}function l(e){var t=/\bMSIE\s(\d+)/.exec(navigator.userAgent);t=t&&+t[1]<=8;var n=/\n/g,r=e.sourceCode,a=r.length,s=0,i=e.spans,l=i.length,o=0,u=e.decorations,c=u.length,p=0;u[c]=a;var f,d;for(d=f=0;c>d;)u[d]!==u[d+2]?(u[f++]=u[d++],u[f++]=u[d++]):d+=2;for(c=f,d=f=0;c>d;){for(var h=u[d],g=u[d+1],m=d+2;c>=m+2&&u[m+1]===g;)m+=2;u[f++]=h,u[f++]=g,d=m}c=u.length=f;var v,y=e.sourceNode;y&&(v=y.style.display,y.style.display="none");try{for(;l>o;){var b,x=(i[o],i[o+2]||a),w=u[p+2]||a,m=Math.min(x,w),S=i[o+1];if(1!==S.nodeType&&(b=r.substring(s,m))){t&&(b=b.replace(n,"\r")),S.nodeValue=b;var C=S.ownerDocument,N=C.createElement("span");N.className=u[p+1];var _=S.parentNode;_.replaceChild(N,S),N.appendChild(S),x>s&&(i[o+1]=S=C.createTextNode(r.substring(m,x)),_.insertBefore(S,N.nextSibling))}s=m,s>=x&&(o+=2),s>=w&&(p+=2)}}finally{y&&(y.style.display=v)}}function o(e,t){for(var n=t.length;--n>=0;){var r=t[n];H.hasOwnProperty(r)?d.console&&console.warn("cannot override language handler %s",r):H[r]=e}}function u(e,t){return e&&H.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),H[e]}function c(e){var n=e.langExtension;try{var r=t(e.sourceNode,e.pre),a=r.sourceCode;e.sourceCode=a,e.spans=r.spans,e.basePos=0,u(n,a)(e),l(e)}catch(s){d.console&&console.log(s&&s.stack||s)}}function p(e,t,n){var r=document.createElement("div");r.innerHTML="<pre>"+e+"</pre>",r=r.firstChild,n&&i(r,n,!0);var a={langExtension:t,numberLines:n,sourceNode:r,pre:1};return c(a),r.innerHTML}function f(e,t){function n(e){return s.getElementsByTagName(e)}function a(){for(var t=d.PR_SHOULD_USE_CONTINUATION?g.now()+250:1/0;v<u.length&&g.now()<t;v++){for(var n=u[v],s=N,o=n;o=o.previousSibling;){var p=o.nodeType,f=(7===p||8===p)&&o.nodeValue;if(f?!/^\??prettify\b/.test(f):3!==p||/\S/.test(o.nodeValue))break;if(f){s={},f.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){s[t]=n});break}}var h=n.className;if((s!==N||b.test(h))&&!x.test(h)){for(var _=!1,P=n.parentNode;P;P=P.parentNode){var E=P.tagName;if(C.test(E)&&P.className&&b.test(P.className)){_=!0;break}}if(!_){n.className+=" prettyprinted";var L=s.lang;if(!L){L=h.match(y);var A;!L&&(A=r(n))&&S.test(A.tagName)&&(L=A.className.match(y)),L&&(L=L[1])}var k;if(w.test(n.tagName))k=1;else{var R=n.currentStyle,T=l.defaultView,$=R?R.whiteSpace:T&&T.getComputedStyle?T.getComputedStyle(n,null).getPropertyValue("white-space"):0;k=$&&"pre"===$.substring(0,3)}var O=s.linenums;(O="true"===O||+O)||(O=h.match(/\blinenums\b(?::(\d+))?/),O=O?O[1]&&O[1].length?+O[1]:!0:!1),O&&i(n,O,k),m={langExtension:L,sourceNode:n,numberLines:O,pre:k},c(m)}}}v<u.length?setTimeout(a,250):"function"==typeof e&&e()}for(var s=t||document.body,l=s.ownerDocument||document,o=[n("pre"),n("code"),n("xmp")],u=[],p=0;p<o.length;++p)for(var f=0,h=o[p].length;h>f;++f)u.push(o[p][f]);o=null;var g=Date;g.now||(g={now:function(){return+new Date}});var m,v=0,y=/\blang(?:uage)?-([\w.]+)(?!\S)/,b=/\bprettyprint\b/,x=/\bprettyprinted\b/,w=/pre|xmp/i,S=/^code$/i,C=/^(?:pre|code|xmp)$/i,N={};a()}var d=window,h=["break,continue,do,else,for,if,return,while"],g=[h,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],m=[g,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],v=[m,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],y=[m,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],b=[y,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],x="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",w=[m,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],S="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",C=[h,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],N=[h,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],_=[h,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],P=[h,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],E=[v,b,w,S,C,N,P],L=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,A="str",k="kwd",R="com",T="typ",$="lit",O="pun",I="pln",D="tag",z="dec",j="src",B="atn",M="atv",U="nocode",V="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*",G=/\S/,F=s({keywords:E,hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),H={};o(F,["default-code"]),o(a([],[[I,/^[^<?]+/],[z,/^<!\w[^>]*(?:>|$)/],[R,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[O,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),o(a([[I,/^[\s]+/,null," 	\r\n"],[M,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[D,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[B,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[O,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),o(a([],[[M,/^[\s\S]+/]]),["uq.val"]),o(s({keywords:v,hashComments:!0,cStyleComments:!0,types:L}),["c","cc","cpp","cxx","cyc","m"]),o(s({keywords:"null,true,false"}),["json"]),o(s({keywords:b,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:L}),["cs"]),o(s({keywords:y,cStyleComments:!0}),["java"]),o(s({keywords:P,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),o(s({keywords:C,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),o(s({keywords:S,hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),o(s({keywords:N,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),o(s({keywords:w,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]),o(s({keywords:x,hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),o(s({keywords:_,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]),o(a([],[[A,/^[\s\S]+/]]),["regex"]);var q=d.PR={createSimpleLexer:a,registerLangHandler:o,sourceDecorator:s,PR_ATTRIB_NAME:B,PR_ATTRIB_VALUE:M,PR_COMMENT:R,PR_DECLARATION:z,PR_KEYWORD:k,PR_LITERAL:$,PR_NOCODE:U,PR_PLAIN:I,PR_PUNCTUATION:O,PR_SOURCE:j,PR_STRING:A,PR_TAG:D,PR_TYPE:T,prettyPrintOne:IN_GLOBAL_SCOPE?d.prettyPrintOne=p:prettyPrintOne=p,prettyPrint:prettyPrint=IN_GLOBAL_SCOPE?d.prettyPrint=f:prettyPrint=f};"function"==typeof define&&define.amd&&define("google-code-prettify",[],function(){return q})}();