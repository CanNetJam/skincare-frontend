import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();   

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer({pdfFile}) {
    const [numPages, setNumPages] = useState()

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    return (
        <>
            <Document className='grid gap-2' file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.apply(null, Array(numPages)).map((x, i ) => i + 1).map((page)=>{
                        return (
                            <div key={page}>
                                <Page className='border border-black' pageNumber={page} renderAnnotationLayer={false} renderTextLayer={false}/>
                                <p className='text-center'>
                                    Page {page} of {numPages}
                                </p>
                            </div>
                        )
                    }
                )}
            </Document>
        </>
    )
}