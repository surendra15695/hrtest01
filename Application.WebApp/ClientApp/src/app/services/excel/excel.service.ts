import { Injectable } from '@angular/core';
//INSTALL PACKAGE: 'npm i file-saver', importing this package
import * as FileSaver from 'file-saver'; 

//INSTALL PACKAGE, npm install xlsx --save 
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv'

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }

  public ExportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.SaveAsExcelFile(excelBuffer, excelFileName);
  }

  private SaveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    
    //FROM file-saver PACKAGE
    FileSaver.saveAs(data, fileName + '_EXPORT_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  //added by Sayandeep on 01-04-2024 to remove excel file extension for Reports
  public ExportAsExcelFileForReport(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.SaveAsExcelFileForReport(excelBuffer, excelFileName);
  }
//added by Sayandeep on 01-04-2024 to remove excel file extension for Reports
  private SaveAsExcelFileForReport(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    
    //FROM file-saver PACKAGE
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  public ExportAsCSVFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.SaveAsCSVFile(excelBuffer, excelFileName);
  }
  private SaveAsCSVFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    
    //FROM file-saver PACKAGE
    FileSaver.saveAs(data, fileName + '_EXPORT_' + new Date().getTime() + CSV_EXTENSION);
  }
  excelHeaders: string[] = ["Employee Id", "Employee Name", "Evaluator Comments","Score", "Total Question", "Remarks"];
  templateToExcel: string[][] = [this.excelHeaders, []];

  public exportTemplateAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateToExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "AssessmentTemplate" + ".csv");
  }
}
