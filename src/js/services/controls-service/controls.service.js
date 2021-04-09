export default class ControlsService {

    constructor(callBacks) {
        this.buffer = {
            squareTarget: null,
        };
        this.callBacks = callBacks;
        this.panelControls();
    }

    squareControls() {
        const self = this;
        document.querySelectorAll('.square').forEach(boardSquare => {
            boardSquare.addEventListener('click', function(event) {
                const targetElement = event.target || event.srcElement;
                const targetSquareName = targetElement.getAttribute('data-square');
                self.checkOnSelectSquare(targetSquareName);
            }, false);
        })

    }


    async checkOnSelectSquare(selectedSquare) {
        if (this.buffer.squareTarget) {
            if (selectedSquare === this.buffer.squareTarget) {
                this.clearBufferAndSelection();
            } else {
                const moved = this.callBacks.movePiecesFromSquares(this.buffer.squareTarget, selectedSquare);
                if (moved) {
                    this.clearBufferAndSelection();
                } else {
                    this.clearSelectedSquareFromBuffer()
                    this.setBufferSquareTarget(selectedSquare);
                }
            }
        } else {
            this.setBufferSquareTarget(selectedSquare);
        }
    }

    panelControls() {
        const self = this;
        document.querySelectorAll('.button-add-fig').forEach(button => {
            button.addEventListener('click', function(event) {
                const targetElement = event.target || event.srcElement;
                const letter = targetElement.getAttribute('data-letter');
                const color = letter === letter.toUpperCase();
                self.callBacks.onAdd(self.buffer.squareTarget, letter.toLowerCase(), color)
                self.clearSelectedSquareFromBuffer();
            }, false);
        })


        document.querySelectorAll('.button-marker').forEach(button => {
            button.addEventListener('click', function(event) {
                const targetElement = event.currentTarget;
                const markerId = targetElement.getAttribute('data-marker-id');
                self.callBacks.onAddMarker(self.buffer.squareTarget, markerId)
                self.clearSelectedSquareFromBuffer();
            }, false);
        })

        const buttonClearSquare = document.getElementById("button-clear-square");
        buttonClearSquare.addEventListener('click', function() {
            self.callBacks.onClearSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);

        const buttonDomainW = document.getElementById("button-paint-domains-w");
        buttonDomainW.addEventListener('click', function() {
            self.callBacks.onDomainW();
        }, false);

        const buttonDomainB = document.getElementById("button-paint-domains-b");
        buttonDomainB.addEventListener('click', function() {
            self.callBacks.onDomainB();
        }, false);


        const buttonClear = document.getElementById("button-clear");
        buttonClear.addEventListener('click', function() {
            self.callBacks.onClear();
        }, false);

        const buttonInit = document.getElementById("button-init");
        buttonInit.addEventListener('click', function() {
            self.callBacks.onInit();
        }, false);

        const buttonDomainsToggle = document.getElementById("button-toggle-domains");
        buttonDomainsToggle.addEventListener('click', function() {
            self.callBacks.onDomainsToggle();
        }, false);



        const buttonSquareDomains = document.getElementById("button-paint-domains-square");
        buttonSquareDomains.addEventListener('click', function() {
            self.callBacks.onDomainsSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);

        const buttonSquareDomainSupport = document.getElementById("button-paint-support-square-domain");
        buttonSquareDomainSupport.addEventListener('click', function() {
            self.callBacks.onShowSquareDomainSupport(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);

        const buttonSquareDomainAttacks = document.getElementById("button-paint-domain-attack-square");
        buttonSquareDomainAttacks.addEventListener('click', function() {
            self.callBacks.onDomainAttacksSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);

        const buttonSquareDomainDanger = document.getElementById("button-paint-domain-danger-square");
        buttonSquareDomainDanger.addEventListener('click', function() {
            self.callBacks.onDomainDangerSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);


        const buttonSquareAttack = document.getElementById("button-paint-attack-square");
        buttonSquareAttack.addEventListener('click', function() {
            self.callBacks.onShowAttackSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);

        const buttonSquareDanger = document.getElementById("button-paint-danger-square");
        buttonSquareDanger.addEventListener('click', function() {
            self.callBacks.onDangerSquare(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);


        const buttonFlipBoard = document.getElementById("button-board-flip");
        buttonFlipBoard.addEventListener('click', function() {
            self.callBacks.onFlip(self.buffer.squareTarget);
        }, false);

        const buttonSquareSupport = document.getElementById("button-paint-support-square");
        buttonSquareSupport.addEventListener('click', function() {
            self.callBacks.onShowSquareSupport(self.buffer.squareTarget);
            self.clearSelectedSquareFromBuffer();
        }, false);



        const buttonVisualsRemove = document.getElementById("button-visuals-remove");
        buttonVisualsRemove.addEventListener('click', function() {
            self.callBacks.onRemoveVisuals();
        }, false);

        const buttonMarkersToggle = document.getElementById("button-markers-toggle");
        buttonMarkersToggle.addEventListener('click', function() {
            self.callBacks.onToggleMarkers();
        }, false);

        const buttonFenCreateBoard = document.getElementById("button-fen-create-board");
        buttonFenCreateBoard.addEventListener('click', function() {
            self.callBacks.onLoadFenFromInput();
        }, false);

        const buttonFenCreateFen = document.getElementById("button-fen-create-fen");
        buttonFenCreateFen.addEventListener('click', function() {
            self.callBacks.onLoadFenToInput();
        }, false);

        const buttonFenCreateLink = document.getElementById("button-fen-create-link");
        buttonFenCreateLink.addEventListener('click', function() {
            self.callBacks.onCreateLink();
        }, false);

        const buttonNavPrev = document.getElementById("button-nav-prev");
        buttonNavPrev.addEventListener('click', function() {
            self.callBacks.onNavPrev();
        }, false);

        const buttonNavNext = document.getElementById("button-nav-next");
        buttonNavNext.addEventListener('click', function() {
            self.callBacks.onNavNext();
        }, false);

        const buttonNavRecord = document.getElementById("button-nav-record");
        buttonNavRecord.addEventListener('click', function() {
            self.callBacks.onNavRecord();
        }, false);

        const buttonLoadPgn = document.getElementById("button-pgn-import");
        buttonLoadPgn.addEventListener('click', function() {
            self.callBacks.onLoadPgn();
        }, false);

        const buttonReportBalanceWhites = document.getElementById("button-paint-report-balance-whites");
        buttonReportBalanceWhites.addEventListener('click', function() {
            self.callBacks.onDisplayReportBalanceWhites();
        }, false);

        const buttonReportBalanceBlacks = document.getElementById("button-paint-report-balance-blacks");
        buttonReportBalanceBlacks.addEventListener('click', function() {
            self.callBacks.onDisplayReportBalanceBlacks();
        }, false);

    }

    async setBufferSquareTarget(squareName) {
        this.buffer.squareTarget = squareName;
        if (squareName) {
            const item = document.getElementById(`base-${squareName}`);

            if (item.classList.contains('with-selection')) {
                item.classList.remove('with-selection');
            } else {
                item.classList.add('with-selection')
            }
        }
    }


    clearSelectedSquareFromBuffer() {
        const squareName = this.buffer.squareTarget;
        if (squareName) {
            const item = document.getElementById(`base-${squareName}`);
            if (item.classList.contains('with-selection')) {
                item.classList.remove('with-selection');
            }
            this.buffer.squareTarget = null;
        }
    }

    clearBufferAndSelection() {
        this.buffer.squareTarget = null;

        document.querySelectorAll('.base').forEach(squareBase => {
            squareBase.classList.remove('with-selection');
        })

    }
}