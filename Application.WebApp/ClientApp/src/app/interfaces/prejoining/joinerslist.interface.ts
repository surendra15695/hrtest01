export interface IJoinersList {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    requisitionNo: string;
    candidateFullName: string;
    candidateJoiningTypeDetailsId: number;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    currentLocationId: number;
    currentLocationName: string;
    gradeId: number;
    gradeName: string;
    emailId: string;
    contact: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: number;
    experienceYear: number;
    experienceMonth: number;
    stateId: number;
    stateName: string;
    dateofJoining: string;
    modeofJoining: number;
    modeofJoiningName: string;
    positionCode: string;
    remarks: string;
    docApprovalStatusId: number;
    docApprovalStatus: string;
    docApprovalEMPNo: string;
    docApprovalEmpName: string;
    docApprovalDesignation: string;
    hiringStatusId: number;
    hiringStatusName: string;
    candidateOnBoardingId: number;
    onBoardingCoordinator: number;
    popoverContent: string;
    monthlyGross: number;
    onBoardingCoordinatorName: string;
    recruitmentManagerNotApproveDoc: string;
    onboardingManagerNotApproveDoc: string;
    onboardingCordinatorNotApproveDoc: string;
    communicationAddress: string;
    communicationState: number;
    communicationStateName: string;
    communicationPin: string;
    checked: boolean;
    coordinatorName: string; //arg
}

export interface IPendingScheduleIndividual {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    requisitionNo: string;
    candidateFullName: string;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    currentLocationId: number;
    currentLocationName: string;
    gradeId: number;
    gradeName: string;
    emailId: string;
    contact: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: number;
    experienceYear: number;
    experienceMonth: number;
    stateId: number;
    stateName: string;
    dateofJoining: string;
    modeofJoining: number;
    modeofJoiningName: string;
    positionCode: string;
    remarks: string;
    docApprovalStatusId: number;
    docApprovalStatus: string;
    docApprovalEMPNo: string;
    docApprovalEmpName: string;
    docApprovalDesignation: string;
    hiringStatusId: number;
    hiringStatusName: string;
    candidateOnBoardingId: number;
    onBoardingCoordinator: number;
    candidateOnBoardingCoordinatorName: string;
    inductionProgrammeCoOrdinatior: number;
    inductionProgrammeCoOrdinatiorName: string;
    candidateReprtingVenueId: number;
    popoverContent: string;
    monthlyGross: number;
    onBoardingCoordinatorName: string;
    recruitmentManagerNotApproveDoc: string;
    onboardingManagerNotApproveDoc: string;
    onboardingCordinatorNotApproveDoc: string;
    communicationAddress: string;
    communicationState: number;
    communicationStateName: string;
    communicationPin: string;
    checked: boolean;
    coordinatorName: string; //arg
}

export interface IPendingScheduleBatchWise {
    batchId: number;
    batchNo: string;
    onBoardingcoordinator: number;
    userId: string;
    dateofJoining: string;
    candidateOnBoardingId: number;
    inductionProgrammeCoOrdinatior: number;
    inductionProgrammeCoOrdinatiorName: string;
    totalCandidates: number;
    candidateOnBoardingCoordinatorName: string;
}

export interface IScheduledIndividually {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    requisitionNo: string;
    candidateFullName: string;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    currentLocationId: number;
    currentLocationName: string;
    gradeId: number;
    gradeName: string;
    emailId: string;
    contact: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: number;
    experienceYear: number;
    experienceMonth: number;
    stateId: number;
    stateName: string;
    dateofJoining: string;
    modeofJoining: number;
    modeofJoiningName: string;
    positionCode: string;
    remarks: string;
    docApprovalStatusId: number;
    docApprovalStatus: string;
    docApprovalEMPNo: string;
    docApprovalEmpName: string;
    docApprovalDesignation: string;
    hiringStatusId: number;
    hiringStatusName: string;
    candidateOnBoardingId: number;
    onBoardingCoordinator: number;
    candidateReprtingVenueId: number;
    inductionProgrammeCoOrdinatior: number;
    inductionProgrammeCoOrdinatiorName: string;
    popoverContent: string;
    accomadationStatus: string;
    accomadationStatusId: number;
    candidateInductionScheduleId: number;
    monthlyGross: number;
    recruitmentManagerNotApproveDoc: string;
    onboardingManagerNotApproveDoc: string;
    onboardingCordinatorNotApproveDoc: string;
    communicationAddress: string;
    communicationState: number;
    communicationStateName: string;
    communicationPin: string;
    checked: boolean;
    coordinatorName: string; //arg
    candidateAccomodationHeaderId:number;
}

export interface IScheduledBatchWise {
    batchId: number;
    batchNo: string;
    onBoardingcoordinator: number;
    CandidateOnBoardingCoordinatorName: string;
    userId: string;
    dateofJoining: string;
    onBoardingManagerId: number;
    modeofJoining: number;
    modeofJoiningName: string;
    accomadationStatus: string;
    accomadationStatusId: number;
    candidateInductionScheduleId: number;
    totalCandidates: number;
    reportingVenueStatus: number;
    nductionProgrammeCoOrdinatior: number;
    inductionProgrammeCoOrdinatiorName: string;
}

export interface IReportingVenueExists {
    candidateReprtingVenueId: number;
    candidateId: number;
    batchId: number;
    venueId: number;
    reprtingVenueAddress: string;
}

export interface IInductionProgrammeCoOrdinatiorAssignedSearch {
    batchId: number;
    candidateId: number;
}
export interface IInductionProgrammeCoOrdinatiorAssigned {
    inductionProgrammeCoOrdinatiorAssignId: number;
    coOrdinatiorId: number;
    empName: string;
}

export interface IShareWithCandidate {
    shareWithCandidateHeaderId: number;
    shareWithCandidates: iUDTShareWithCandidate[];
    candidateAdditionalDocumentId:iUDTcandidateAdditionalDocumentId[];   // Added by anif on 25-01-2023
    shareWithCandidatesInductionAccommodationAttachment: IUDTShareWithCandidateInductionAccommodationAttachement[];  // Added by anif on 08-11-2022
   shareWithCandidatesForSchedular:IUDTshareWithCandidatesForSchedular[]; // Added By Anif 0n 21-08-2023
   shareWithCandidatesInductionForSchedular:any[]; // Added By Anif 0n 21-08-2023
   shareWithCandidatesAccommodationForSchedular:any[]; // Added By Anif 0n 21-08-2023
    templateId: number;
    templateBody: string;
    candidateId: string;
    remarks: string;
    mailingStatus: number;
    isActive: boolean;
    createdBy: number;
}
export interface iUDTShareWithCandidate {
    shareWithCandidateId: number;
    templateId: number;
    shareWithCandidateHeaderId: number;
    candidateJoiningDocumentId: string;
    candidateRequisitionDetailsId: number;
    candidateInductionScheduleDetailsId: number;
    candidateId: number;
    candidateName:string;
    templateBody: string;
    isSend: boolean
}
export interface iUDTcandidateAdditionalDocumentId {

}
export interface IUDTShareWithCandidateInductionAccommodationAttachement {
    candidateId: number;
    candidateEmailId: string;
    candidateName: string;
    batchNo: string;
    department: string;
    function: string;
    grade: string;
    joiningDate: string;
    location: string;
    position: string;
    candidateAccommodationDetailsForAttachment: any;
    candidateInductionDetailsForAttachment: any;
    emailBody: string;
}

export interface IUDTshareWithCandidatesForSchedular {
    candidateId: number;
    requisitionDetailId:number;
    candidateEmailId: string;
    candidateName: string;
    batchNo: string;
    department: string;
    function: string;
    grade: string;
    joiningDate: string;
    location: string;
    position: string;
    emailBody: string;
}