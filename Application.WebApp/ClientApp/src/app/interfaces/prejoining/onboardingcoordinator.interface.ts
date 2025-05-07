export interface IOnboardingCoordinator {
    autoUserId: number;
    empName: string;
}
export interface ISearchOnboardingCoordinator {
    requisitionDetailId: string;
}

export interface IViewCandidateList {
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
    empNp: string;
    candidateAccomodationHeaderId:number;
}

export interface ITemplate {

}
export interface ISearchTemplate {

}
export interface IRoleWiseUser {
    userRoleId: number;
    roleId: number;
    roleName: string;
    autoUserId: number;
    employeeName: string;
    createdBy: number;

}
export interface ISearchRoleWiseUser {
    roleId: number;
}
export interface IModeOfInduction {
    inductionModeId: number;
    inductionModeName: string;
    isActive: boolean;
}
export interface ISearchModeOfInduction {
    inductionModeId: number;
    isActive: boolean;
}
export interface ITrainer {
    trainerId: number;
    trainersName: string
}
export interface IsearchTrainer {

}
export interface IVenue {
    reportingVenueId: number;
    reportingVenueName: string;
    reportingVenueAddress: string;
    isActive: boolean;
}
export interface ISearchVenue {
    reportingVenueId: number;
    isActive: boolean;
}

export interface IScheduleAccommodation {
    reportingVenu: IReportingVenue[];
    candidateAccomodationDetails: ICandidateListOnBoarding[];
    candidateInductionScheduleByBatchs: ICandidateInductionScheduleByBatch[];
    candidateInductionScheduleByIndividuals: ICandidateInductionScheduleByIndividual[];
    batchCandidatesScheduleDates: IBatchCandidateScheduleDate[];
}
export interface IReportingVenue {
    venuName: string;
    venuAddress: string;
}
export interface ICandidateListOnBoarding {
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
    dunctionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
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
    hiringStatusId: number;
    hiringStatusName: string;
    candidateOnBoardingId: number;
    onBoardingCoordinator: number;
    candidateReprtingVenueId: number;
    monthlyGross: number;
    onBoardingCoordinatorName: string;
    recruitmentManagerNotApproveDoc: string;
    onboardingManagerNotApproveDoc: string;
    communicationAddress: string;
    communicationState: number;
    communicationStateName: string;
    communicationPin: string;

}
export interface ICandidateInductionScheduleByBatch {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    detailsofSession: string;
    batchCandidateIds: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: number;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;
    isExternal: boolean;
}
export interface ISearchTrainingInChargeId {
    locationDetailIds: any[];

}
export interface ICandidateInductionScheduleByIndividual {
    candidateId: number;
    candidateFullName: string;
    dateFrom: string;
    dateTo: string;
    isActive: boolean
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    candidateAccomodationDetailsId: number;
    trainer: number;
    trainerName: string
    isChanged: boolean;
}
export interface IBatchCandidateScheduleDate {
    candidateInductionScheduleDetailsId: number;
    candidateInductionScheduleId: number;
    traingTitleId: number;
    dateFrom: string;
    dateTo: string;
    location: number;
    batchCandidateIds: string;
}
export interface ICandidateAccommodationInsert {
    candidateAccomodationDetailsId: number;
    candidateAccomodationHeaderId: number;
    candidateId: number;
    candidateInductionScheduleDetailsId: number;
    fromDate: string;
    toDate: string;
    isActive: boolean;
}

export interface IEditAccommodation {
    editAccomodationCandidateDetail: IEditAccomodationCandidate;
    trainingEditAccomodationInductionSheduleDetails: IEditAccomodationInductionShedule[];
    trainingEditAccomodationForCandidateDetails: IEditAccomodationForCandidate[];
}
export interface IEditAccomodationCandidate {
    candidateId: number;
    candidateNo: string;
    batchId: number;
    batchNo: string;
    venueId: number;
    venueAddress: string;
    reprtingVenueAddress: string;
    venueName: string;
}
export interface IEditAccomodationInductionShedule {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    detailsofSession: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: string;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;

}
export interface IEditAccomodationForCandidate {
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    candidateAccomodationHeaderId: number;
    candidateAccomodationDetailsId: number;
    fromDate: string;
    toDate: string;
    accomodation: string;
    isAccomadateRequired: boolean;
    //candidateAccomodationId:number;
}
export interface IEditAccommodationForBatch {
    editAccomodationCandidateDetailForBatch: IEditAccomodationCandidateForBatch;
    trainingEditAccomodationInductionSheduleDetailsForBatch: IEditAccomodationInductionSheduleForBatch[];
    trainingEditAccomodationForCandidateDetailsForBatch: IEditAccomodationForCandidateForBatch[];
    editAccomodationRequiredCandidatesForBatch: ITrainingEditAccomodationRequiredCandidateForBatch[];
}
export interface IEditAccomodationCandidateForBatch {
    candidateId: number;
    candidateNo: string;
    batchId: number;
    batchNo: string;
    venueId: number;
    venueAddress: string;
    reprtingVenueAddress: string;
    venueName: string;
}
export interface IEditAccomodationInductionSheduleForBatch {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    detailsofSession: string;
    batchCandidateIds: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: string;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;

}
export interface IEditAccomodationForCandidateForBatch {
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    candidateAccomodationHeaderId: number;
    candidateAccomodationDetailsId: number;
    fromDate: string;
    toDate: string;
    accomodation: string;
    isAccomadateRequired: boolean;
    //candidateAccomodationId:number;
}
export interface ITrainingEditAccomodationRequiredCandidateForBatch {
    candidateInductionScheduleDetailsId: number;
    candidateInductionScheduleId: number;
    traingTitleId: number;
    dateFrom: string;
    dateTo: string;
    location: number;
    locationName: string;
    batchCandidateIds: string;
}
export interface IEditAccommodationBatch {
    editAccomodationCandidateDetailBatch: IEditAccomodationCandidateBatch;
    trainingEditAccomodationInductionSheduleDetailsBatch: IEditAccomodationInductionSheduleBatch[];
    trainingEditAccomodationForCandidateDetailsBatch: IEditAccomodationForCandidateBatch[];
    trainingEditAccomodationRequiredCandidate: ITrainingEditAccomodationRequiredCandidate[];
}
export interface IEditAccomodationCandidateBatch {
    candidateId: number;
    candidateNo: string;
    batchId: number;
    batchNo: string;
    venueId: number;
    venueAddress: string;
    reprtingVenueAddress: string;
    venueName: string;
}
export interface IEditAccomodationInductionSheduleBatch {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    detailsofSession: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: string;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;

}
export interface IEditAccomodationForCandidateBatch {
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    candidateAccomodationHeaderId: number;
    candidateAccomodationDetailsId: number;
    fromDate: string;
    toDate: string;
    accomodation: string;
    isAccomadateRequired: boolean;
    //candidateAccomodationId:number;
}
export interface ITrainingEditAccomodationRequiredCandidate {
    candidateInductionScheduleDetailsId: number;
    candidateInductionScheduleId: number;
    traingTitleId: number;
    dateFrom: string;
    dateTo: string;
    location: number;
    locationName: string;
    batchCandidateIds: string;
}
export interface IReassignCandidateForBatch {
    inductionReportingVenueDetails: IEditAccomodationCandidate;
    batchInductionScheduleDetail: IInductionScheduleDetaildForReassignCandiate[];
    reaasingCandidatesDetail: IEditAccomodationForCandidate[];
}
export interface IInductionScheduleDetaildForReassignCandiate {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    batchCandidateIds: string;
    detailsofSession: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: string;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;
    isExternal: boolean;

}
export interface IJoiningDocument {
    documnetId: number;
    documentName: string;
}
export interface ISearchJoiningDocument {

}
export class IWelcomeTemplate {
    welcomeTemplateId: number;
    welcomdeTemplateName: string;
}

export interface IAccommodationDetailsByCandidate {
    editCandidateData: IGetEditCandidate;
    trainingGetEditAccomodationForCandidateDetails: IGetEditAccomodationForCandidate[];
}
export interface IGetEditCandidate {
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
}
export interface IGetEditAccomodationForCandidate {
    locationId: number;
    locationName: string;
    candidateAccomodationHeaderId: number;
    candidateAccomodationDetailsId: number;
    fromDate: string;
    toDate: string;
    accomodation: string;
}
export interface IOCJoiningCheckList {
    onBoardingCoordinatorJoiningCheck: IOnBoardingCoordinatorJoiningCheckList;
    onBoardingCoordinatorOnBoardingChecks: IOnBoardingCoordinatorOnBoardingCheckList[];
}
export interface IOnBoardingCoordinatorJoiningCheckList {
    candidateId: number;
    candidateNo: string;
    requisitionDetailId: string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    designation: number;
    designationName: string;
    gradeId: number;
    gradeName: string;
    dateofJoining: string;
    modeofJoining: number;
    modeofJoiningName: string;
    candidateOnboardingJoiningCheckListId: number;
    complete: boolean;
}
export interface IOnBoardingCoordinatorOnBoardingCheckList {
    doumentNameId: number;
    doumentName: string;
    document: string;
    approvalStatus: number;
    approvalStatusName: string;
    approvalRemarks: string;
    candidateOnboardingJoiningCheckListDetailsId: number;
    candidateOnboardingJoiningCheckListId: number;
    remarks: string;
}
export interface IOCSearchJoiningCheckList {
    candidateId: number;
}
export interface IRMJoiningCheckList {
    candidateOnBoardingDocumentVerificationData: ICandidateOnBoardingDocumentVerification;
    candidateOnBoardingUploadedDocuments: ICandidateOnBoardingUploadedDocument[];
}
export interface ICandidateOnBoardingDocumentVerification {
    offerDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
    candidateFullName: string;
    candidateEmailId: string;
    candidatePhone: string;
    candidateGender: string;
    age: number;
    aadharNo: string;
    motherTongue: string;
    languageKnown: string;
    highestQualification: string;
    course: string;
    stream: string;
    percentage: string;
    yearofCompletion: number;
    qualificationType: string;
    totalexperience: string;
    currentCTC: number;
    currentEmployer: string;
    designation: string;
    domain: string;
    subDomain: string;
    currentLocation: string;
    anyPreviousApplicationHistoryinMRF: string;
    anyRelativeWorkingonMRF: string;
    source: string;
    candidateOwner: string;
    candidateResume: string;
    dateofJoining: string;
    designationId: number;
    designationName: string;
    locationId: number;
    locationName: string;
    gradeId: number;
    gradeName: string;
    candidateRMJoiningCheckListId: number;
}
export interface ICandidateOnBoardingUploadedDocument {
    offerDocumentCollectionId: number;
    offerDocumentCollectionDocumentId: number;
    doumentType: number;
    doumentTypName: string;
    doumentParticular: number;
    doumentParticularName: string;
    doumentNameId: number;
    doumentName: string;
    document: string;
    documentPath: string;
    approvalStatus: string;
    approvalRemarks: string;
    candidateRMJoiningCheckListDetailsId: number;
    candidateRMJoiningCheckListId: number;
    remarks: string;
}
export interface ICandidateInductionSchedule {
    candidateInductionShedules: ICandidateInductionSheduleHeader;
    candidateInductionSheduleDetails: ICandidateInductionSheduleDetails[];
}
export interface ICandidateInductionSheduleHeader {
    candidateInductionScheduleId: number;
    joinigType: string;
    joinigTypeDesc: string;
    templateId: number;
    templateDetails: string;
    batchId: number;
    candidateId: number;
    isActive: boolean;
    createdBy: number;
}
export interface ICandidateInductionSheduleDetails {
    candidateInductionScheduleId: number;
    candidateInductionScheduleDetailsId: number;
    trainingTittleId: number;        // Added by anif on 25-11-2022
    traingTitle: string;
    batchNo: string
    candidateName: string;
    candidateFullName: string;
    //inductionTypeId: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    batchCandidateIds: string;
    candidateNoInduction: string;

    detailsofSession: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductioneName: string;
    location: number;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    createdBy: number;
    isExternal: boolean;
    verticalId: number;
}
