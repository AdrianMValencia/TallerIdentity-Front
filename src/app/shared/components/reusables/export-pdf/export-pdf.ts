import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DownloadFile } from '@shared/services/download-file';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-pdf',
  imports: [MatIcon, MatTooltip],
  templateUrl: './export-pdf.html',
})
export class ExportPdf {
  private readonly downloadPdfService = inject(DownloadFile);
  private readonly spinner = inject(NgxSpinnerService);

  @Input() url: string = '';
  @Input() getInputs: string = '';
  @Input() filename: string = '';

  icCloudDownload = 'picture_as_pdf';
  infoTooltip = 'Descargar resultados en formato PDF';

  download() {
    Swal.fire({
      title: 'Confirmar',
      text: 'Esta acción descargará los registros en formato .pdf ignorando la paginación.',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#004A89',
      cancelButtonColor: '#ce938b',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeDownload();
      }
    });
  }

  executeDownload() {
    this.spinner.show();
    this.downloadPdfService
      .executeDownload(this.url + this.getInputs)
      .subscribe((pdfData: Blob) => {
        const fileName = this.filename.endsWith('.pdf')
          ? this.filename
          : `${this.filename}.pdf`;
        const blobUrl = URL.createObjectURL(pdfData);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
        this.spinner.hide();
      });
  }
}
