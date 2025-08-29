import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DownloadXslx } from '@shared/services/download-xslx';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-excel',
  imports: [MatIcon, MatTooltip],
  templateUrl: './export-excel.html',
})
export class ExportExcel {
  private readonly downloadXslxService = inject(DownloadXslx);
  private readonly spinner = inject(NgxSpinnerService);

  @Input() url: string = '';
  @Input() getInputs: string = '';
  @Input() filename: string = '';

  icCloudDownload = 'cloud_download';
  infoTooltip = 'Descargar resultados en formato Excel';

  download() {
    Swal.fire({
      title: 'Confirmar',
      text: 'Esta acción descargará los registros en formato .xlsx ignorando la paginación.',
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
    this.downloadXslxService
      .executeDownload(this.url + this.getInputs)
      .subscribe((excelData: Blob) => {
        const fileName = this.filename;
        const blobUrl = URL.createObjectURL(excelData);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(blobUrl);
        this.spinner.hide();
      });
  }
}
