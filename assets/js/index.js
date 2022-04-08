
const app = (() => {


    return {
        handleReadFilePdf() {
            url = './assets/pdf/compressed.tracemonkey-pldi-09.pdf';
            var thePdf = null;
            var scale = 1

            pdfjsLib.getDocument(url).promise.then(function (pdf) {
                thePdf = pdf;
                viewer = document.getElementById('pdf-viewer');

                for (page = 1; page <= pdf.numPages; page++) {
                    canvas = document.createElement("canvas");
                    canvas.className = 'pdf-page-canvas';
                    viewer.appendChild(canvas);
                    renderPage(page, canvas);
                }
            });

            function renderPage(pageNumber, canvas) {
                thePdf.getPage(pageNumber).then(function (page) {
                    viewport = page.getViewport({ scale: scale });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport });
                });
            }

        },
        handleEvent() {
            document.querySelector('input[type="submit"]').onclick = this.displayContentPage.bind(app)
            document.querySelector('button.search-btn').onclick = this.handleSearchKeyWord.bind(app)
        },
        displayContentPage() {
            document.querySelector('#pdf-search').style.display = 'none'
            document.querySelector('#pdf-viewer').style.display = 'block'
        },
        handleSearchKeyWord() {

            document.querySelector('#pdf-viewer').style.display = 'none'
            document.querySelector('#pdf-search').style.display = 'flex'
            document.querySelector('#pdf-search input').value = null
            document.querySelector('#pdf-search input').focus()
        },
        init() {
            this.handleEvent()
            this.handleReadFilePdf()
        }
    }
})()

app.init()