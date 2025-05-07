export interface ICandidateProfile {
    candidateProfileId: number;
    candidateId: number;
    requisitionDetailId: number;
    fullName: string;
    candiadatePhoto: string;
    positionAppliedFor: string;
    dob: string;
    age: number;
    communicationAddress: string;
    communicationStateId: number;
    communicationState: string;
    communicationCountryId: number;
    communicationCountry: string;
    communicationPin: string;
    communicationPhoneNo: string;
    communicationAlternativeContactNo: string;
    emailId: string;
    permanentAddress: string;
    permanentStateId: number;
    permanentState: string;
    permanentCountryId: number;
    permanentCountry: string;
    permanentPin: string;
    permanentPhone: string;
    permanentHomeTown: string;
    permanentNativeStateId: number;
    permanentNativeState: string;
    aadharNo: string;
    uanno: string;
    panNo: string;
    nationalityId: number;
    religionId: number;
    casteId: number;
    height: string;
    weight: string;
    bloodGroupId: number;
    eyeSightCorrected: boolean;
    eyeSightRight: string;
    eyeSightLeft: string;
    cronicMajorIllness: boolean;
    cronicMajorIllnessDetails: string;
    handiCap: boolean;
    handiCapDetails: string;
    identificationMarks1: string;
    identificationMarks2: string;
    //mrfRealtives: boolean;
    mrfRealtives: any;
    //tyreCompanyRealtionShip: boolean;
    tyreCompanyRealtionShip: any;
    reasonforGap: string;
    previousAssignmentGap: string;
    expectedCTC: number;
    joiningDaysRequired: number;
    joiningComments: string;
    ref1Name: string,
    ref1Position: string,
    ref1Organisation: string,
    ref1Location: string,
    ref1ContactNo: string,
    ref1EmailId: string,
    ref2Name: string,
    ref2Position: string,
    ref2Organisation: string,
    ref2Location: string,
    ref2ContactNo: string,
    ref2EmailId: string,
    ref3Name: string,
    ref3Position: string,
    ref3Organisation: string,
    ref3Location: string,
    ref3ContactNo: string,
    ref3EmailId: string,
    jobPortal: boolean;
    linkedIn: boolean;
    careerSite: boolean;
    paperAdvertisement: boolean;
    employeeReferal: boolean;
    refNameofEmployee: string;
    refEmployeeId: string;
    refEmployeeDesignation: string;
    refEmployeeLocation: string;
    refEmployeeFunction: string;
    refEmployeeKnowing: string;
    consultantApplicable: boolean;
    consultant: number;
    otherSource: string;
    signatureDate: string;
    signaturePlace: string;
    signature: string;
    //preInterViewMRF: boolean;
    preInterViewMRF: any;
    //criminalCase: boolean;
    criminalCase: any;
    criminalCaseDetails: string;
    //previousEmployemntEnquiry: boolean;
    previousEmployemntEnquiry: any;
    previousEmployemntEnquiryDetails: string;
    additionoalDetails: string;
    familyBackGroundDetails: ICandidateFamilyDetails[];
    mrfRelationShipDetails: ICandidateMRFRelatives[];
    tyreCompanyRelationShipDetails: ICandidateTyreRelatives[];
    academicDetails: ICandidateAcademicDetails[];
    certificationDetails: ICandidateCertificationDetails[];
    membershipDetails: ICandidateMembershipDetails[];
    extraCarricularActivitiesDetails: ICandidateExtraCarricularActivitiesDetails[];
    languageKnownDetails: ICandidateLanguageKnownDetails[];
    peviousAssignmentDetails: ICandidatePeviousAssignmentDetails[];
    mrfPreInterviewDetails: IMRFPreInterviewDetails[];
    isEnabled: boolean;
    submitStatus: number;
}

export interface ICampusCandidateProfile {
    candidateProfileId: number;
    candidateId: number;
    requisitionDetailId: number;
    fullName: string;
    candiadatePhoto: string;
    positionAppliedFor: string;
    dob: string;
    age: number;
    communicationAddress: string;
    communicationStateId: number;
    communicationState: string;
    communicationCountryId: number;
    communicationCountry: string;
    communicationPin: string;
    communicationPhoneNo: string;
    communicationAlternativeContactNo: string;
    emailId: string;
    permanentAddress: string;
    permanentStateId: number;
    permanentState: string;
    permanentCountryId: number;
    permanentCountry: string;
    permanentPin: string;
    permanentPhone: string;
    permanentHomeTown: string;
    permanentNativeStateId: number;
    permanentNativeState: string;
    aadharNo: string;
    uanno: string;
    panNo: string;
    nationalityId: number;
    religionId: number;
    casteId: number;
    height: string;
    weight: string;
    bloodGroupId: number;
    eyeSightCorrected: boolean;
    eyeSightRight: string;
    eyeSightLeft: string;
    cronicMajorIllness: boolean;
    cronicMajorIllnessDetails: string;
    handiCap: boolean;
    handiCapDetails: string;
    identificationMarks1: string;
    identificationMarks2: string;
    //mrfRealtives: boolean;
    mrfRealtives: any;
    //tyreCompanyRealtionShip: boolean;
    tyreCompanyRealtionShip: any;
    reasonforGap: string;
    previousAssignmentGap: string;
    expectedCTC: number;
    joiningDaysRequired: number;
    joiningComments: string;
    ref1Name: string,
    ref1Position: string,
    ref1Organisation: string,
    ref1Location: string,
    ref1ContactNo: string,
    ref1EmailId: string,
    ref2Name: string,
    ref2Position: string,
    ref2Organisation: string,
    ref2Location: string,
    ref2ContactNo: string,
    ref2EmailId: string,
    ref3Name: string,
    ref3Position: string,
    ref3Organisation: string,
    ref3Location: string,
    ref3ContactNo: string,
    ref3EmailId: string,
    jobPortal: boolean;
    linkedIn: boolean;
    careerSite: boolean;
    paperAdvertisement: boolean;
    employeeReferal: boolean;
    refNameofEmployee: string;
    refEmployeeId: string;
    refEmployeeDesignation: string;
    refEmployeeLocation: string;
    refEmployeeFunction: string;
    refEmployeeKnowing: string;
    consultantApplicable: boolean;
    consultant: number;
    otherSource: string;
    signatureDate: string;
    signaturePlace: string;
    signature: string;
    //preInterViewMRF: boolean;
    preInterViewMRF: any;
    //criminalCase: boolean;
    criminalCase: any;
    criminalCaseDetails: string;
    //previousEmployemntEnquiry: boolean;
    previousEmployemntEnquiry: any;
    previousEmployemntEnquiryDetails: string;
    additionoalDetails: string;
    familyBackGroundDetails: ICandidateFamilyDetails[];
    mrfRelationShipDetails: ICandidateMRFRelatives[];
    tyreCompanyRelationShipDetails: ICandidateTyreRelatives[];
    academicDetails: ICandidateAcademicDetails[];
    certificationDetails: ICandidateCertificationDetails[];
    membershipDetails: ICandidateMembershipDetails[];
    extraCarricularActivitiesDetails: ICandidateExtraCarricularActivitiesDetails[];
    languageKnownDetails: ICandidateLanguageKnownDetails[];
    peviousAssignmentDetails: ICandidatePeviousAssignmentDetails[];
    mrfPreInterviewDetails: IMRFPreInterviewDetails[];
    isEnabled: boolean;
    submitStatus: number;
    campusplacement:boolean;
}

export interface ISearchCandidateProfile {
    candidateId: number;
    candidateProfileId: number;
    requisitionDetailId: number;
}

export interface ICandidateFamilyDetails {
    candidateProfileId: number;
    familyBackgoundLineId: number;
    familyRelationShip: number;
    familyRelationShipName: string;
    familyName: string;
    familyDOB: string;
    education: number;
    educationName: string;
    occupation: number;
    occupationName: string;
    familyOrganisation: string;
}

export interface ICandidateMRFRelatives {
    candidateProfileId: number;
    mrfRelationShipLineId: number;
    relativeName: string;
    relativeEmployeeId: string;
    relativeDesignation: string;
    relativeRelationShip: number;
    relativeRelationShipName: string;
}

export interface ICandidateTyreRelatives {
    candidateProfileId: number;
    tyreCompanyRelationLineId: number;
    tyreRelativeName: string;
    tyreRelativeDesignation: string;
    tyreRelativeCompanyName: string;
    tyreRelativeRelationShip: number;
    tyreRelativeRelationShipName: string;
}

export interface ICandidateAcademicDetails {
    candidateProfileId: number;
    academicLineId: number;
    qualification: number;
    qualificationName: string;
    course: number;
    courseName: string;
    specalization: string;
    instutation: string;
    academicAddress: string;
    university: number;
    universityName: string;
    otherUniversityName: string;  // added based on requirement
    academicDurationFrom: string;
    academicDurationTo: string;
    courseType: number;
    courseTypeName: string;
    subjects: string;
    monthOfPassing: number;
    yearOfPassing: number;
    grade: number;
    gradeName: string;
    marks: number;
    courseRemarks: string;
}

export interface ICandidateCertificationDetails {
    candidateProfileId: number;
    certificationLineId: number;
    certificationOrganisation: string;
    certificationNatureofTraining: string;
    certificationDurationFrom: string;
    certificationDurationTo: string;
}

export interface ICandidateMembershipDetails {
    candidateProfileId: number;
    membershipLineId: number;
    institution: string;
    classofMemberShip: string;
    membershipFrom: string;
}

export interface ICandidateExtraCarricularActivitiesDetails {
    candidateProfileId: number;
    extraCarricularActivitiesLineId: number;
    natureofActivities: string;
    levelofAchivement: string;
}

export interface ICandidateLanguageKnownDetails {
    candidateProfileId: number;
    languageKnownLineId: number;
    motherTongue: number;
    motherTongueName: string;
    read: boolean;
    write: boolean;
    speak: boolean;
}

export interface ICandidatePeviousAssignmentDetails {
    candidateProfileId: number;
    peviousAssignmentLineId: number;
    peviousAssignmentFrom: string;
    peviousAssignmentTo: string;
    peviousAssignmentOrganisation: string;
    peviousAssignmentAddress: string;
    peviousAssignmentPosition: string;
    peviousAssignmentDescriptionofWork: string;
    peviousAssignmentCTC: number;
}

//Array
export interface ICandidateFamilyDetailsArray {
    candidateProfileId: number;
    familyBackgoundLineId: number;
    familyRelationShip: number;
    familyName: string;
    familyDOB: string;
    education: number;
    occupation: number;
    familyOrganisation: string;
}

export interface ICandidateMRFRelativesArray {
    candidateProfileId: number;
    mrfRelationShipLineId: number;
    relativeName: string;
    relativeEmployeeId: string;
    relativeDesignation: string;
    relativeRelationShip: number;
}

export interface ICandidateTyreRelativesArray {
    candidateProfileId: number;
    tyreCompanyRelationLineId: number;
    tyreRelativeName: string;
    tyreRelativeDesignation: string;
    tyreRelativeCompanyName: string;
    tyreRelativeRelationShip: number;
}

export interface ICandidateAcademicDetailsArray {
    candidateProfileId: number;
    academicLineId: number;
    qualification: number;
    course: number;
    specalization: string;
    instutation: string;
    academicAddress: string;
    university: number;
    otherUniversityName: string;
    academicDurationFrom: string;
    academicDurationTo: string;
    courseType: number;
    subjects: string;
    monthOfPassing: number;
    yearOfPassing: number;
    grade: number;
    marks: number;
    courseRemarks: string;
}

export interface ICandidateCertificationDetailsArray {
    candidateProfileId: number;
    certificationLineId: number;
    certificationOrganisation: string;
    certificationNatureofTraining: string;
    certificationDurationFrom: string;
    certificationDurationTo: string;
}

export interface ICandidateMembershipDetailsArray {
    candidateProfileId: number;
    membershipLineId: number;
    institution: string;
    classofMemberShip: string;
    membershipFrom: string;
}

export interface ICandidateExtraCarricularActivitiesDetailsArray {
    candidateProfileId: number;
    extraCarricularActivitiesLineId: number;
    natureofActivities: string;
    levelofAchivement: string;
}

export interface ICandidateLanguageKnownDetailsArray {
    candidateProfileId: number;
    languageKnownLineId: number;
    motherTongue: number;
    read: boolean;
    write: boolean;
    speak: boolean;
}

export interface ICandidatePeviousAssignmentDetailsArray {
    candidateProfileId: number;
    peviousAssignmentLineId: number;
    peviousAssignmentFrom: string;
    peviousAssignmentTo: string;
    peviousAssignmentOrganisation: string;
    peviousAssignmentAddress: string;
    peviousAssignmentPosition: string;
    peviousAssignmentDescriptionofWork: string;
    peviousAssignmentCTC: number;
}

export interface IMRFPreInterviewArray {
    candidateProfileId: number;
    MRFPreInterviewLineId: number;
    Position: number;
    InterviewDate: string;
}

export interface IMRFPreInterviewDetails {
    candidateProfileId: number;
    mrfPreInterviewLineId: number;
    position: number;
    positionName: string;
    interviewDate: string;
}
