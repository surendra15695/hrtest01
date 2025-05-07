export interface IPendingAccommodationIndividual {
    candidateId: number;
    candidateNo: string;
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    trainer: number;
    candidateFullName: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    emailId: string;
    contact: string;
    functionId: number;
    functionName: string;
    positionId: number;
    positionlocation: string;
    candidateReprtingVenueId: number;
    reprtingVenueAddress: string;
    status: string;
    candidateInductionScheduleId: number;
    inductionLocation: number;
    inductionLocationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    candidateAccomodationDetailsId: number;

}
export interface IPendingAccommodationBatchWise {
    batchId: number;
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    trainer: number;
    batchNo: string;
    batchName: string;
    dateFrom: string;
    dateTo: string;
    location: number;
    locationName: string;
    functionId: number;
    functionName: string;
    positionId: number;
    positionName: string;
    inductionLocation: number;
    inductionLocationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    reprtingVenueAddress: string;
    status: string;
    candidateInductionScheduleId: number;
}
export interface IProcessedAccommodationIndividual {
    candidateId: number;
    candidateNo: string;
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    trainer: number;
    candidateFullName: string;
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    emailId: string;
    contact: string;
    functionId: number;
    functionName: string;
    positionId: number;
    positionlocation: string;
    candidateReprtingVenueId: number;
    reprtingVenueAddress: string;
    status: string;
    candidateInductionScheduleId: number;
    inductionLocation: number;
    inductionLocationName: string;
    inductionVenue: number;
    inductionVenueName: string;

}
export interface IProcessedAccomodationBatchWise {
    batchId: number;
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    trainer: number;
    batchNo: string;
    batchName: string;
    dateFrom: string;
    dateTo: string;
    location: number;
    locationName: string;
    functionId: number;
    functionName: string;
    positionId: number;
    positionName: string;
    inductionLocation: number;
    inductionLocationName: string;
    inductionVenue: number;
    inductionVenueName: string;
    reprtingVenueAddress: string;
    status: string;
    candidateInductionScheduleId: number;
}


export interface IFillAccommodation {
    // public TrainingAccomodationCandidate trainingAccomodationCandidate { get; set; }
    // public List<TrainingAccomodationCandidateList> TrainingAccomodationCandidateDetails { get; set; }
    trainingAccomodationCandidate: ITrainingAccomodationCandidate[];
    trainingAccomodationCandidateDetails: ITrainingAccomodationCandidateList[];
    trainingAccomodationRequiredCandidateList: ITrainingAccomodationRequiredCandidateList[];
}
export interface ITrainingAccomodationCandidate {
    batchId: number;
    batchNo: string;
    candidateId: number
    candidateNo: string;
    candidateAccomodationHeaderId: number;
    candidateInductionScheduleDetailsId: number;
    candidateAccomodationDetailsId: number;
    trainerInchargeId: number;
    dateFrom: string;
    dateTo: string;
    location: number;
    locationName: string;
    // candidateReprtingVenueId: string;
    inductionVenue: number;
    inductionVenueName: string;
    reprtingVenueAddress: string;
    totalCandidates: string;

}

export interface ITrainingAccomodationCandidateList {
    candidateAccomodationHeaderId: number;
    trainingInchageAccomodationDetailsId: number;
    candidateId: number;
    candidateNo: string;
    candidateName: string;
    accomodation: string;

}
export interface ITrainingAccomodationRequiredCandidateList {
    candidateId: number;
    candidateNo: string;
    fullName: string;
    requisitionDetailId: number;
    fromDate: string;
    toDate: string;
}