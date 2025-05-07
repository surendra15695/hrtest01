export interface ICandidateWelcomeAcknowledgement {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
    requisitionNo: string;
    joinigType: string;
    batchId: number;
    batchNo: string;
    verticalId: number;
    verticalName: string;
    locationId: number;
    locationName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    gradeId: number;
    gradeName: string;
    dateOfJoining: string;
    shareWithCandidateHeader: number;
    swcMailingStatus: number;
    remarks: string;
    onboardingCoordinatorReamrks: string;
}

// Induction Plan

export interface ICandidateInductionPlan {
    candidateInductionPlanShedule: ICandidateDetails;
    candidateInductionPlanShedules: ICandidateInductionPlanSheduleDetails[];
    candidateInductionPlanAccomodations: ICandidateAccommodationDetails[];
}
export interface ICandidateDetails {
    candidateId: number;
    candidateNo: string;
    batchId: number;
    batchNo:string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    positionName: string;
    gradeId: number;
    gradeName: string;
    dateofJoining: string;
    hiringStatusId: number;
}
export interface ICandidateInductionPlanSheduleDetails {
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    trainingTittleId: number;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    trainer: number;
    trainerName: string;
    detailsofSession: string;
    locationId: number;
    locationName: string;
    inductionVenueId: number;
    inductionVenueName: string;
    candidateOnBoardingId: number;
    onBoardingCoordinator: number;
}
export interface ICandidateAccommodationDetails {
    candidateInductionScheduleDetailsId: number;
    fromDate: string;
    toDate: string;
    locationId: number
    locationName: string;
    accomodation: string;

}
export interface IAccommodationDetails {
    candidateName: string;
    location: string;
    department: string;
    grade: string;
    batchNo: string;
    function: string;
    position: string;
    joiningDate: string;
    accommodationList: IAccommodationList[];
}
export interface IAccommodationList {
    //candidateInductionScheduleDetailsId:number;
    fromDate: string;
    toDate: string;
    location: string;
    accommodation: string;
}
export interface IInductionDetails {
    candidateName: string;
    location: string;
    department: string;
    grade: string;
    batchNo: string;
    function: string;
    position: string;
    joiningDate: string;
    inductionList: IInductionList[];
}
export interface IInductionList {
    trainingTittle: string;
    trainingTittleId: number;
    trainingDetails: IInductiondetailsByName[];
}
export interface IInductiondetailsByName {
    inductionDate: string;
    fromTime: string;
    toTime: string;
    detailsOfSession: string;
    location: string;
    venue: string;
    persontoMeet: string;
    accommodationRequire: string;
    remarks: string;
}