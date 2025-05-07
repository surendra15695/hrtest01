export interface IAssessmentList {
    sl: number;
    assessmentId: number;
    assessmentName: string;
    assessmentTypeId: number;
    assessmentTypeName: string;
    empId: number;
    empName: number;
    isActive: boolean;
    createdBy: number;
    modifiedOn: string;
}
export interface ISearchAssessment {
    assessmentId: number;
    isActive: boolean;
}

export interface ISearchCandidate {
    candidateId: number;
    onBordingMangerId: number;
    onBordingCoordinatorId: number;
    candidateName: string;
    verticalId: number;
    locationId: number;
    functionId: number;
}
export interface ICandidateList {
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
}

export interface IInductionTemplate {
    inductionTemplateId: number;
    inductionTemplateName: string;
    traingTitle: string;
    timeFrom: string;
    timeTo: string;
    detailsofSession: string;
    trainer: number;
    trainerName: string;
    inductionMode: number;
    inductionModeName: string;
    location: number;
    locationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    inductionCoOrdinator: number;
    trainingCoOrdinatorName: string;
    remarks: string;
    isActive: boolean;
    isBatch: boolean;
    createdBy: number;

}
