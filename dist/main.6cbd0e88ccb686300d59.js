(()=>{"use strict";class e{constructor(e){this.letterW=e.letterW,this.iconW=e.iconW,this.letterB=e.letterB,this.iconB=e.iconB}asLetter(e=!0){return e?this.letterW:this.letterB}asIcon(e=!0){return e?this.iconW:this.iconB}}const t=[8,7,6,5,4,3,2,1],r=["a","b","c","d","e","f","g","h"],a="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",n=["c","d","e","f"],s=!0,o=!1,i={b:new e({letterW:"B",iconW:"♗",letterB:"b",iconB:"♝"}),r:new e({letterW:"R",iconW:"♖",letterB:"r",iconB:"♜"}),n:new e({letterW:"N",iconW:"♘",letterB:"n",iconB:"♞"}),k:new e({letterW:"K",iconW:"♔",letterB:"k",iconB:"♚"}),q:new e({letterW:"Q",iconW:"♕",letterB:"q",iconB:"♛"}),p:new e({letterW:"P",iconW:"♙",letterB:"p",iconB:"♟"})};function c(e){return`${window.location.origin}${window.location.pathname}?fen=${e}`}function l(e,t){return`${e}${t}`}function u(e,t=!0){return e?{letter:e,color:t}:null}const d={getCellKey:l,createSquaresMap:function(e,t){const r=[];return e.forEach((e=>{t.forEach((t=>{const a=l(t,e);r.push([a,null])}))})),new Map(r)},createMarkersMap:function(e,t){const r=[];return e.forEach((e=>{t.forEach((t=>{const a=l(t,e);r.push([a,[]])}))})),new Map(r)},parseFenStrToObject:function(e){const t={},a=["r","n","b","k","q","p","R","N","B","K","Q","P"];return e.split(" ")[0].split("/").forEach(((e,n)=>{const s=8-n;let o=1;e.split("").forEach((e=>{if(a.includes(e)){const a=l(r[o-1],s),n=e==e.toUpperCase(),i=e.toLowerCase();t[a]=u(i,n),o+=1}else{const a=parseInt(e,10);for(let e=o;e<a+o;e++){const a=l(r[e-1],s);t[a]=null}o+=parseInt(e,10)}}))})),t},parseMapToFenStr:function(e){const t=[8,7,6,5,4,3,2,1],r=["a","b","c","d","e","f","g","h"];let a="",n=0;return t.forEach(((s,o)=>{n=0,r.forEach((t=>{const r=l(t,s),o=e.get(r);if(o){0!==n&&(a+=n.toString(),n=0);const e=o.color?o.letter.toUpperCase():o.letter.toLowerCase();a+=e}else n+=1})),0!==n&&(a+=n.toString()),o<t.length-1&&(a+="/")})),`${a} w KQkq - 0 1`},asSquare:u,parseConfig:function(e){return{flip:"flip"in e&&e.flip,asIcon:!("asIcon"in e)||e.asIcon,asLines:!("asLines"in e)||e.asLines,withLimitation:"withLimitation"in e&&e.withLimitation}},getAbsoluteRouteWithFen:c,changeHistoryWithFen:function(e){const t=c(e);history.pushState({id:"game-move"},"",t)}};class h{constructor(){this.moves=[],this.moveIdx=0}saveMove(e,t,r){const a={from:e,to:t,fen:d.parseMapToFenStr(r)},n=this.moveIdx;this.moves.length=n+1,this.moves.push(a),this.moveIdx=this.moves.length-1}get currentMoveIdx(){return this.moveIdx}get currentMove(){return this.moves[this.moveIdx]}get prevMove(){console.log(this.moves),console.log(this.moveIdx);let e=this.moveIdx-1;return console.log(e),e<=0&&(e=0),this.moveIdx=e,this.moves[e]}get nextMove(){let e=this.moveIdx+1;return e>=this.moves.length&&(e=this.moves.length-1),this.moveIdx=e,this.moves[e]}getMoveByIdx(e){return e<this.moves.length?this.moves[this.moveIdx]:null}}const m=function(e,t,a,n=!1){const s=r.indexOf(t),o=[];for(let r=a-1;r>=1;r--){o.push(d.getCellKey(t,r));const a=o[o.length-1];if(e.get(a)&&n)break}for(let r=a+1;r<=8;r++){o.push(d.getCellKey(t,r));const a=o[o.length-1];if(e.get(a)&&n)break}for(let t=s+1;t<r.length;t++){o.push(d.getCellKey(r[t],a));const s=o[o.length-1];if(e.get(s)&&n)break}for(let t=s-1;t>=0;t--){o.push(d.getCellKey(r[t],a));const s=o[o.length-1];if(e.get(s)&&n)break}return o},f=function(e,t){const a=r.indexOf(e),n=[];return[[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]].forEach((e=>{const s=t+e[0],o=a+e[1];o>=0&&o<r.length&&s>0&&s<=8&&n.push(d.getCellKey(r[o],s))})),n},p=function(e,t,a){const n=r.indexOf(e),s=[],o=a?t+1:t-1;return[[1,o],[-1,o]].forEach((e=>{const t=n+e[0],a=e[1];t>=0&&t<r.length&&a>0&&a<=8&&s.push(d.getCellKey(r[t],a))})),s},g=function(e,t,a,n=!1){const s=r.indexOf(t),o=[];let i=1;for(let t=a-1;t>=0;t--){const a=s+i;if(a>=0&&a<r.length&&t>0&&t<=8){o.push(d.getCellKey(r[a],t)),i++;const s=o[o.length-1];if(e.get(s)&&n)break}}i=1;for(let t=a-1;t>=0;t--){const a=s-i;if(a>=0&&a<r.length&&t>0&&t<=8){o.push(d.getCellKey(r[a],t)),i++;const s=o[o.length-1];if(e.get(s)&&n)break}}i=1;for(let t=a+1;t<=8;t++){const a=s-i;if(a>=0&&a<r.length&&t>0&&t<=8){o.push(d.getCellKey(r[a],t)),i++;const s=o[o.length-1];if(e.get(s)&&n)break}}i=1;for(let t=a+1;t<=8;t++){const a=s+i;if(a>=0&&a<r.length&&t>0&&t<=8){o.push(d.getCellKey(r[a],t)),i++;const s=o[o.length-1];if(e.get(s)&&n)break}}return o},q=function(e,t){const a=r.indexOf(e),n=[];return[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]].forEach((e=>{const s=a+e[0],o=t+e[1];s>=0&&s<r.length&&o>0&&o<=8&&n.push(d.getCellKey(r[s],o))})),n},k=90/8;function S(e,t=null){let r="neutral";t===s?r="white":!1===t&&(r="black");const a=document.getElementById(`markers-${e}`),n=document.createElementNS("http://www.w3.org/2000/svg","use");n.setAttribute("href",`#marker-circle-${r}`),n.setAttribute("data-square",`${e}`),a.appendChild(n)}function w(e,t=!0){let r=t?"ok":"error";const a=document.getElementById(`markers-${e}`),n=document.createElementNS("http://www.w3.org/2000/svg","use");n.setAttribute("href",`#marker-rect-${r}`),n.setAttribute("data-square",`${e}`),a.appendChild(n)}function B(e){const t=document.getElementById(`markers-${e}`),r=document.createElementNS("http://www.w3.org/2000/svg","use");r.setAttribute("href","#marker-move-last"),r.setAttribute("data-square",`${e}`),t.appendChild(r)}const b=function(e){return e?"with-domain-white":"with-domain-black"},v=function(e){return e?"marker-circle-white":"marker-circle-black"},M=function(e,t,r,a,n=!0){const s=d.getCellKey(e,r),o=k*t,i=k*a,c=`\n        <title>${s}</title>\n        <rect id="base-${s}" \n            data-square="${s}"\n            class="base" \n            width="11.25%" \n            height="11.25%"  />\n        <g id="markers-${s}" \n            data-square="${s}"\n            class="markers" \n            width="11.25%" \n            height="11.25%"  \n            fill="transparent"\n            />\n        <text id="piece-${s}" \n            data-square="${s}"\n            class="piece ${n?"asIcon":""}" \n            text-anchor="start" \n            x="${n?1.5:4}" \n            y="${n?-1.5:8}" \n            dy="${n?10:0}"\n         ></text>\n    `,l=document.createElementNS("http://www.w3.org/2000/svg","g");return l.setAttribute("class","square"),l.setAttribute("id",`${s}`),l.setAttribute("data-square",`${s}`),l.setAttribute("data-square-col",`${e}`),l.setAttribute("data-square-row",`${r}`),l.setAttribute("transform",`translate(${o},${i})`),l.innerHTML=c,l},E=function(e,t="",r=!0){const a=document.getElementById(`piece-${e}`),n=r?"white":"black";a.classList.add(n);const s=r?"black":"white";r&&a.classList.contains(s)&&a.classList.remove(s),a.textContent=t},y=function(e,t){const r=[];return t.forEach(((e,t)=>{const a=document.createElementNS("http://www.w3.org/2000/svg","text"),n=document.createTextNode(e);a.setAttribute("x",k*t+"%"),a.setAttribute("y","0"),a.setAttribute("dy","0"),a.setAttribute("dx","1"),a.setAttribute("data-coord-col",`${e}`),a.setAttribute("class","board-coordinate board-coordinate-col"),a.setAttribute("text-anchor","start"),a.appendChild(n),r.push(a)})),e.forEach(((e,t)=>{const a=document.createElementNS("http://www.w3.org/2000/svg","text"),n=document.createTextNode(e);a.setAttribute("x","0"),a.setAttribute("y",k*t+"%"),a.setAttribute("dy","6"),a.setAttribute("dx","-3"),a.setAttribute("data-coord-row",`${e}`),a.setAttribute("class","board-coordinate board-coordinate-row"),a.setAttribute("text-anchor","start"),a.appendChild(n),r.push(a)})),r},T=function(e){const t=document.getElementById(`markers-${e}`).children;for(var r=t.length-1;r>=0;--r)t[r].remove()},I=function(){const e=document.querySelectorAll(".markers"),t="marker-invisible";e.forEach((e=>{e.classList.contains(t)?e.classList.remove(t):e.classList.add(t)}))},F=function(e,t){switch(t){case"marker-circle-white":S(e,!0);break;case"marker-circle-neutral":S(e);break;case"marker-circle-black":S(e,!1);break;case"marker-move-last":B(e);break;case"marker-rect-ok":w(e,!0);break;case"marker-rect-error":w(e,!1)}},C=function(e){try{let t=document.createElement("input");t.type="text",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("Copy"),document.body.removeChild(t)}catch(e){console.error("[Clipboard] addTextToClipboard:",e)}};class D{constructor(e){this.buffer={squareTarget:null},this.callBacks=e,this.panelControls()}squareControls(){const e=this;document.querySelectorAll(".square").forEach((t=>{t.addEventListener("click",(function(t){const r=(t.target||t.srcElement).getAttribute("data-square");e.checkOnSelectSquare(r)}),!1)}))}async checkOnSelectSquare(e){this.buffer.squareTarget?e===this.buffer.squareTarget||await this.callBacks.movePiecesFromSquares(this.buffer.squareTarget,e)?this.clearBufferAndSelection():(this.clearSelectedSquareFromBuffer(),this.setBufferSquareTarget(e)):this.setBufferSquareTarget(e)}panelControls(){const e=this;document.querySelectorAll(".button-add-fig").forEach((t=>{t.addEventListener("click",(function(t){const r=(t.target||t.srcElement).getAttribute("data-letter"),a=r===r.toUpperCase();e.callBacks.onAdd(e.buffer.squareTarget,r.toLowerCase(),a),e.clearSelectedSquareFromBuffer()}),!1)})),document.querySelectorAll(".button-marker").forEach((t=>{t.addEventListener("click",(function(t){const r=t.currentTarget.getAttribute("data-marker-id");e.callBacks.onAddMarker(e.buffer.squareTarget,r),e.clearSelectedSquareFromBuffer()}),!1)})),document.getElementById("button-clear-square").addEventListener("click",(function(){e.callBacks.onClearSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-domains-w").addEventListener("click",(function(){e.callBacks.onDomainW()}),!1),document.getElementById("button-paint-domains-b").addEventListener("click",(function(){e.callBacks.onDomainB()}),!1),document.getElementById("button-clear").addEventListener("click",(function(){e.callBacks.onClear()}),!1),document.getElementById("button-init").addEventListener("click",(function(){e.callBacks.onInit()}),!1),document.getElementById("button-toggle-domains").addEventListener("click",(function(){e.callBacks.onDomainsToggle()}),!1),document.getElementById("button-paint-domains-square").addEventListener("click",(function(){e.callBacks.onDomainsSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-support-square-domain").addEventListener("click",(function(){e.callBacks.onShowSquareDomainSupport(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-domain-attack-square").addEventListener("click",(function(){e.callBacks.onDomainAttacksSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-domain-danger-square").addEventListener("click",(function(){e.callBacks.onDomainDangerSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-attack-square").addEventListener("click",(function(){e.callBacks.onShowAttackSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-paint-danger-square").addEventListener("click",(function(){e.callBacks.onDangerSquare(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-board-flip").addEventListener("click",(function(){e.callBacks.onFlip(e.buffer.squareTarget)}),!1),document.getElementById("button-paint-support-square").addEventListener("click",(function(){e.callBacks.onShowSquareSupport(e.buffer.squareTarget),e.clearSelectedSquareFromBuffer()}),!1),document.getElementById("button-visuals-remove").addEventListener("click",(function(){e.callBacks.onRemoveVisuals()}),!1),document.getElementById("button-markers-toggle").addEventListener("click",(function(){e.callBacks.onToggleMarkers()}),!1),document.getElementById("button-fen-create-board").addEventListener("click",(function(){e.callBacks.onLoadFenFromInput()}),!1),document.getElementById("button-fen-create-fen").addEventListener("click",(function(){e.callBacks.onLoadFenToInput()}),!1),document.getElementById("button-fen-create-link").addEventListener("click",(function(){e.callBacks.onCreateLink()}),!1),document.getElementById("button-nav-prev").addEventListener("click",(function(){e.callBacks.onNavPrev()}),!1),document.getElementById("button-nav-next").addEventListener("click",(function(){e.callBacks.onNavNext()}),!1),document.getElementById("button-nav-record").addEventListener("click",(function(){e.callBacks.onNavRecord()}),!1)}async setBufferSquareTarget(e){if(this.buffer.squareTarget=e,e){const t=document.getElementById(`base-${e}`);t.classList.contains("with-selection")?t.classList.remove("with-selection"):t.classList.add("with-selection")}}clearSelectedSquareFromBuffer(){const e=this.buffer.squareTarget;if(e){const t=document.getElementById(`base-${e}`);t.classList.contains("with-selection")&&t.classList.remove("with-selection"),this.buffer.squareTarget=null}}clearBufferAndSelection(){this.buffer.squareTarget=null,document.querySelectorAll(".base").forEach((e=>{e.classList.remove("with-selection")}))}}const A=function(e){const t={};let r=document.createElement("a");r.href=e;const a=r.search.substring(1);if(!a)return t;const n=a.split("&");for(let e=0;e<n.length;e++){const r=n[e].split("=");t[r[0]]=decodeURIComponent(r[1])}return t}(window.location.href);let L=null;"fen"in A&&(L=A.fen);const x={fen:L,asIcon:!0,asLines:!0,withLimitation:!0,flip:!1};new class{constructor(e){this.config=d.parseConfig(e),this.figures=i,this.colors={white:s,black:o},this.movesRegistry=new h,this.squaresMap=d.createSquaresMap(t,r),this.markersMap=d.createMarkersMap(t,r);const n=e.fen||a;this.fenToMap(n),this.render(),this.chessControls=new D(this.actionsBridge),this.state={isDomainWhiteOn:!1,isDomainBlackOn:!1,move:null}}lab(){}labMoves(){}fenToMap(e){if(!e||""===e)return;const t=d.parseFenStrToObject(e);this.squaresMap=new Map(Object.entries(t))}async render(){this.drawBoard().then((()=>{this.chessControls.squareControls(),this.lab()}))}flipBoard(){this.config.flip=!this.config.flip;const e=document.querySelectorAll(".square"),t=document.querySelectorAll(".board-coordinate");e.forEach((e=>{e.remove()})),t.forEach((e=>{e.remove()})),this.render()}async move(e,t){const r=this.squaresMap.get(e);if(r){this.setFigureInSquare(t,r.letter,r.color),this.setFigureInSquare(e,null),this.drawPiecesFromMap();const a=d.parseMapToFenStr(this.squaresMap);return d.changeHistoryWithFen(a),this.state.move={from:e,to:t},this.state.isDomainWhiteOn&&this.drawDomainByColor(s),this.state.isDomainBlackOn&&this.drawDomainByColor(o),!0}}loadFenFromInput(){const e=document.getElementById("fen-input").value;this.fenToMap(e),d.changeHistoryWithFen(e),this.drawPiecesFromMap()}loadFenToInput(){const e=d.parseMapToFenStr(this.squaresMap);d.changeHistoryWithFen(e),document.getElementById("fen-input").value=e}drawFromMove(e){this.fenToMap(e.fen),this.drawPiecesFromMap(),d.changeHistoryWithFen(e.fen),this.state.isDomainWhiteOn&&this.drawDomainByColor(s),this.state.isDomainBlackOn&&this.drawDomainByColor(o)}setFigureInSquare(e,t,r=!0){this.squaresMap.set(e,d.asSquare(t,r))}addMarkerToSquare(e,t,r=!1){if(!e)return;const a=this.markersMap.get(e),n=a.indexOf(t);-1===n&&(a.push(t),this.markersMap.set(e,a),F(e,t)),r&&n>-1&&(a.splice(n,1),this.markersMap.set(e,a),this.drawMarkersFromMapBySquareName(e))}drawFlankCenterDomains(){const e=[6,5,4,3];n.forEach((t=>{e.forEach((e=>{const r=d.getCellKey(t,e);document.getElementById(`base-${r}`).classList.add("with-flank")}))}))}drawRemoveLastStepMoveMarker(){this.markersMap.forEach((e=>{const t=e.indexOf("marker-move-last");t>-1&&e.splice(t,1)})),this.drawMarkersFromMap()}async drawBoard(){const e=document.getElementById("svg-squares"),a=document.getElementById("svg-coordinates"),n=this.config.flip,s=n?[...t].reverse():t,o=n?[...r].reverse():r;s.forEach(((t,r)=>{o.forEach(((a,n)=>{const s=M(a,n,t,r,this.config.asIcon);e.appendChild(s)}))})),this.drawPiecesFromMap(),y(s,o).forEach((e=>{a.appendChild(e)}))}drawPiecesFromMap(){this.squaresMap.forEach(((e,t)=>{if(e){let r="";const a=i[e.letter];r=!0===this.config.asIcon?a.asIcon(e.color):a.asLetter(e.color),E(t,r,e.color)}else E(t)}))}drawMarkersFromMap(){this.markersMap.forEach(((e,t)=>{T(t),e.forEach((e=>{F(t,e)}))}))}drawMarkersFromMapBySquareName(e){T(e),this.markersMap.get(e).forEach((t=>{F(e,t)}))}drawRemoveAllMarkers(){this.markersMap=d.createMarkersMap(t,r),this.drawMarkersFromMap()}getSquarePieceAllowedSquares(e,t=null){const r=this.config.withLimitation,a=[];if(!e)return;const n=e.split(""),s=n[0],o=parseInt(n[1],10),{letter:i,color:c}=t||this.squaresMap.get(e);if("r"===i){const e=m(this.squaresMap,s,o,r);a.push(...e)}if("n"===i){const e=f(s,o);a.push(...e)}if("p"===i){const e=p(s,o,c);a.push(...e)}if("b"===i){const e=g(this.squaresMap,s,o,r);a.push(...e)}if("q"===i){const e=m(this.squaresMap,s,o,r),t=g(this.squaresMap,s,o,r);a.push(...e,...t)}if("k"===i){const e=q(s,o);a.push(...e)}return a}drawDomainByColor(e=!0){this.drawClearDomains(e),e?this.state.isDomainWhiteOn=!0:this.state.isDomainBlackOn=!0;const t=b(e),r=[];return this.squaresMap.forEach(((t,a)=>{if(t&&t.color===e){const e=this.getSquarePieceAllowedSquares(a);r.push(...e)}})),r.forEach((e=>{document.getElementById(`base-${e}`).classList.add(t)})),r}drawDomainBySquare(e){const t=this.squaresMap.get(e);if(t){const r=v(t.color);this.addMarkerToSquare(e,r),this.getSquarePieceAllowedSquares(e).forEach((e=>{const r=b(t.color);document.getElementById(`base-${e}`).classList.add(r)}))}}drawClearDomains(e=!0){e?this.state.isDomainWhiteOn=!1:this.state.isDomainBlackOn=!1;const t=b(e);this.squaresMap.forEach(((e,r)=>{document.getElementById(`base-${r}`).classList.remove(t)}))}drawAttackFromSquare(e){if(!e)return;const t=this.squaresMap.get(e);if(t){const r=this.getSquarePieceAllowedSquares(e),a=v(t.color);r.forEach((e=>{const r=this.squaresMap.get(e);r&&r.color!==t.color&&this.addMarkerToSquare(e,a)}))}}drawAttackFromSquareDomain(e){if(!e)return;const t=this.squaresMap.get(e);if(t){const r=v(t.color),a=this.getSquarePieceAllowedSquares(e);this.drawDomainBySquare(e),a.forEach((a=>{const n=t;this.getSquarePieceAllowedSquares(a,n).forEach((n=>{const s=this.squaresMap.get(n);s&&s.color!==t.color&&(this.addMarkerToSquare(e,"marker-circle-neutral"),this.addMarkerToSquare(a,r),this.addMarkerToSquare(n,r))}))}))}}drawDangerToSquare(e){if(!e)return;let t=!0;const r=this.squaresMap.get(e);if(r)if(this.squaresMap.forEach(((a,n)=>{if(n!==e&&a&&a.color!==r.color&&this.getSquarePieceAllowedSquares(n).includes(e)){t=!1;const e=v(a.color);this.addMarkerToSquare(n,e),this.drawDomainBySquare(n)}})),t)this.addMarkerToSquare(e,"marker-rect-ok");else{const t=v(r.color);this.addMarkerToSquare(e,t)}}drawDangerToSquareDomain(e){if(!e)return;let t=!0;const r=this.squaresMap.get(e);if(r){const a=this.getSquarePieceAllowedSquares(e);a.forEach((n=>{this.drawDomainBySquare(e),this.squaresMap.forEach(((n,s)=>{if(s!==e&&n&&n.color!==r.color){const e=this.getSquarePieceAllowedSquares(s),r=a.filter((t=>e.includes(t)));r.forEach((e=>{const t=v(n.color);this.addMarkerToSquare(s,t),this.addMarkerToSquare(e,t)})),r.length>0&&(t=!1)}}))})),t?this.addMarkerToSquare(e,"marker-rect-ok"):this.addMarkerToSquare(e,"marker-circle-neutral")}}drawSupportToSquare(e){if(!e)return;let t=!1;const r=this.squaresMap.get(e);r&&(this.squaresMap.forEach(((a,n)=>{if(n!==e&&a&&a.color===r.color){const r=this.getSquarePieceAllowedSquares(n);if(console.debug("[CHESS] drawSupportToSquare: mapOptions",r),r.includes(e)){t=!0;const e=v(a.color);this.addMarkerToSquare(n,e),this.drawDomainBySquare(n)}}})),t?this.addMarkerToSquare(e,"marker-rect-ok"):this.addMarkerToSquare(e,"marker-rect-error"))}drawSupportToSquareDomain(e){if(!e)return;let t=!1;const r=this.squaresMap.get(e);if(r){this.drawDomainBySquare(e);const a=this.getSquarePieceAllowedSquares(e);a.forEach((n=>{this.squaresMap.forEach(((n,s)=>{if(s!==e&&n&&n.color===r.color){const e=this.getSquarePieceAllowedSquares(s),r=a.filter((t=>e.includes(t)));r.forEach((e=>{const t=v(n.color);this.addMarkerToSquare(s,t),this.addMarkerToSquare(e,t)})),r.length>0&&(t=!0)}}))})),t?this.addMarkerToSquare(e,"marker-circle-neutral"):this.addMarkerToSquare(e,"marker-rect-error")}}get actionsBridge(){return{onShowSquareSupport:e=>{this.drawSupportToSquare(e)},onShowSquareDomainSupport:e=>{this.drawSupportToSquareDomain(e)},onFlip:()=>{this.flipBoard()},movePiecesFromSquares:async(e,t)=>this.move(e,t),onAddMarker:(e,t)=>{this.addMarkerToSquare(e,t,!0)},onAdd:(e,t,r)=>{if(!e)return;this.setFigureInSquare(e,t,r);const a=d.parseMapToFenStr(this.squaresMap);d.changeHistoryWithFen(a),this.drawPiecesFromMap()},onClearSquare:e=>{if(!e)return;this.setFigureInSquare(e,null);const t=d.parseMapToFenStr(this.squaresMap);d.changeHistoryWithFen(t),this.drawPiecesFromMap()},onClear:()=>{this.squaresMap=d.createSquaresMap(t,r),this.drawPiecesFromMap();const e=d.parseMapToFenStr(this.squaresMap);d.changeHistoryWithFen(e)},onInit:()=>{this.fenToMap(a),this.drawPiecesFromMap(),d.changeHistoryWithFen(a)},onDomainW:async()=>{this.state.isDomainWhiteOn?this.drawClearDomains(s):this.drawDomainByColor(s)},onDomainB:async()=>{this.state.isDomainBlackOn?this.drawClearDomains(o):this.drawDomainByColor(o)},onDomainsToggle:async()=>{this.state.isDomainWhiteOn||this.state.isDomainBlackOn?(this.drawClearDomains(s),this.drawClearDomains(o)):(this.drawDomainByColor(s),this.drawDomainByColor(o))},onDomainsSquare:async e=>{this.drawDomainBySquare(e)},onDomainDangerSquare:async e=>{this.drawDangerToSquareDomain(e)},onDomainAttacksSquare:async e=>{this.drawAttackFromSquareDomain(e)},onShowAttackSquare:async e=>{this.drawAttackFromSquare(e)},onDangerSquare:async e=>{this.drawDangerToSquare(e)},onRemoveVisuals:()=>{this.drawRemoveAllMarkers(),this.drawClearDomains(s),this.drawClearDomains(o)},onToggleMarkers:()=>{I()},onLoadFenFromInput:()=>{this.loadFenFromInput()},onLoadFenToInput:()=>{this.loadFenToInput()},onCreateLink:()=>{const e=d.parseMapToFenStr(this.squaresMap),t=d.getAbsoluteRouteWithFen(e);C(t)},onNavPrev:()=>{const e=this.movesRegistry.prevMove;e&&this.drawFromMove(e)},onNavNext:()=>{const e=this.movesRegistry.nextMove;e&&this.drawFromMove(e)},onNavRecord:()=>{const e=this.state.move?this.state.move.from:null;this.state.move&&this.state.move.to,this.movesRegistry.saveMove(e,e,this.squaresMap)}}}}(x)})();
//# sourceMappingURL=main.6cbd0e88ccb686300d59.js.map