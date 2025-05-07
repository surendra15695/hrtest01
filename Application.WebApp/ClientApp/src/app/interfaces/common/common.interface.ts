export interface IStatus {
    statusId: number;
    statusName: string;
    statusTypeId: number;
    statusTypeName: string;
    statusIcon: string;
}
export interface IPrefix {
    prefixId: number;
    prefixName: string;
    isActive: boolean;
}
export interface ISearchPrefix {
    prefixId: number;
    isActive: boolean;
}

export interface IGender {
    genderId: number;
    genderName: string;
    isActive: boolean;
}
export interface IGenders {
    genderId: number;
    genderName: string;
    isActive: boolean;
}

export interface ISearchGender {
    genderId: number;
    isActive: boolean;
}

export interface IAge {
    ageId: number;
    ageName: string;
    fromAge: number;
    toAge: number;
}
export interface IState {
    stateId: number;
    stateName: string;
}

export interface IExperience {
    experienceId: number;
    experienceName: string;
    fromYear: number;
    toYear: number;
}
export interface IYears {
    yearsId: number;
    yearsName: string;
}
export interface IMonths {
    monthId: number;
    monthName: string;
}

export interface IInterviewName {
    interviewName: string;
}

export interface IFormFiles {
    file: File;
}
export interface IFormFilesTravel {
    file: File;
    fileName: string;
}

export interface IApproverVertical {
    verticalId: number;
    verticalName: string;
}

export interface IApproverFunction {
    functionId: number;
    functionName: string;
}

export interface IApproverDepartment {
    departmentId: number;
    departmentName: string;
}

export interface IApproverVerticalFunctionDepartment {
    verticalId: number;
    verticalName: string;
    functionDepartmentData: IApproverFunctionDepartment[];
}

export interface IApproverFunctionDepartment {
    functionId: number;
    functionName: string;
    departmentData: IApproverDepartment[];
}

export interface IDropDown {
    name: string;
    id: number;
}

export interface IPreviousSalaryAccountHead {
    salaryAccountHeadPreviousId: number;
    salaryAccountHeadPreviousName: string;
    monthlyAmount: number;
    yearlyAmount: number;
}

export interface IDocumentStatus {
    approvalListId: number;
    approvalListName: string;
    isActive: boolean;

}
export interface ISearchDocumentStatus {
    approvalListId: number;
    isActive: boolean;

}
export interface IBatch {
    batchId: number;
    batchName: string;
    batchNo: string;
    vertical: number;
    verticalName: string;
    isActive: boolean
}
export interface ISearchBatch {
    batchId: number;
    vertical: number;
    isActive: boolean;
}

export interface ITrainingTittle {
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
}
export interface IsearchTrainingTittle {
    batchId: number;
    candidateId: number;
}

export interface IsearchTrainingTittleGetAll {
    trainingTittleId: number;
    IsActive: boolean;
}
export interface IProgramCoordinator {
    userRoleId: number;
    roleId: number;
    roleName: string;
    autoUserId: number;
    employeeName: string;
    createdBy: number;
}
export interface ISearchProgramCoordinator {
    roleId: number;
}

export interface IDownloadFileFormData {
    HTMLCode: string;
    FileName: string;
}
export interface ISearchArea {
    LocationId: number;
    IsActive: boolean;
}
   
export interface IHiringStatus {
  hiringStatusId: number;
  hiringStatusName: string;
}
export interface ITravelReimbursementReportList {
  candidateId: number;
  candidateNo: string;
  fullName: string;
  requisitionNo: string;
  verticalName: string;
  locationName: string;
  positionName: string;
  functionName: string;
  departmentName: string;
  reimbursementType: string;
  testInterviewDate: string;
  testInterviewDateTime: Date;
  testInterviewName: string;
  testInterviewVenue: string;
  modeOfJourney: string;
  modeOfTravel: string;
  claimAmount: number;
  claimStatusName: string;
}
export interface IconsultantPerformanceLists {
  requisitionNo: string;
  consultantname: string;
  vendorId: number;
  noofcandidatessubmitted: number;
  noofcandidatesshortlisted: number;
  noofcandidatesnotattendedinterview: number;
  noofcandidatesselected: number;
  noofcandidatesoffered: number;
  noofcandidatesdeclinedaftergivenoffer: number;
  noofcandidatesJoined: number;
  noofcandidatesjoinedwithinTAT: number;
  averageTimeTaken: number;
  noofemployeesstillactive: number;
  noofemployeesresignedin6months: number;
  noofemployeesresignedtotal: number;
}
export interface IClaimStatus {
  claimStatusId: number;
  claimStatusName: string;
  isActive: boolean;
}
export interface ISearchClaimStatus {
  claimStatusId: number;
  claimStatusName: string;
  isActive: boolean;
}
export interface IFatherOccupation {
    OccupationId: number;
    OccupationName: string;
  }
  //arg
  export interface ISearchFatherOccupation {
    OccupationId: number;
  }
//arg

export interface ICompanyDoctorReportList {
  candidateId: number;
  candidateNo: string;
  empId: number;
  empNo: string;
  fullName: string;
  requisitionNo: string;
  verticalName: string;
  locationName: string;
  functionName: string;
  departmentName: string;
  designation: string;
  gradeName: string;
  DOJ: string;
  preEmploymentMedicalStatus: string;
  remarks: string;
}

export interface IRecruiterPerformanceReportList {
  requisitionId: number;
  requisitionNo: string;
  positionId: number;
  noOfPosition: number;
  position: string;
  recruiterName: string;
  noofcandidatessourced: number;
  noofcandidatesshortlisted: number;
  noofcandidatesnotattendedinterview: number;
  noofcandidatesselected: number;
  yettoputupforapproval: number;
  awaitingCMDsapproval: number;
  noofcandidatesoffered: number;
  noofcandidatesdeclined: number;
  noofcandidatesJoined: number;
  daystakenRequisitiontojoining: number;
  daystakenRequisitiontoselection: number;
  daysTakenSelectiontoCMDApvl: number;
  daystakenCMDApvltoJoining: number;
  noofdayssinceopen: number;
  noofpositionsclosedwithinTAT: number;
  noofemployeesstillactive: number;
  noofemployeesresignedinsixmonths: number;
  noofemployeesresignedtotal: number;
}
export interface EmployeeDetails {
    "Personnel Number":string;
    "Formatted Name of Employee or Applicant":string;
    "Organizational Unit" : string;
    "Position ":string;
    "Employee Group":string;
    "Employee Subgroup" :string;
    "Personnel Subarea" :string;
    "Cost center text":string;
    "Cost Center":string;
    "Date of Birth":string;
    "Entry Date":string;
    "Leaving date":string;
    "Mail ID" :string;
    "Aadhar No" :string;
    "Update Status" : string;
    "Update Status Remarks" : string;
    
}
export interface ISearchFlexiHeader {
  headerId: number,
  isActive: boolean,
  headerType:number
}
export interface IFlexiHeaderList {
  reportHeaderId: number,
  reportHeaderName: string;
  isActive: boolean
}
