import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../auth/authentication.guard';

//import { MasterlayoutComponent } from './masterlayout.component';
import { MasterlayoutComponent } from '../layouts/masterlayout/masterlayout.component';
import { RequisitioncorporateComponent } from 'src/app/application-module/preselection/requisition/request/requisitioncorporate/requisitioncorporate.component';
import { HoldreleasecorporateComponent } from 'src/app/application-module/preselection/requisition/holdrelease/holdreleasecorporate/holdreleasecorporate.component';
import { RequisitionplantComponent } from 'src/app/application-module/preselection/requisition/request/requisitionplant/requisitionplant.component';
import { RequisitionsalesComponent } from 'src/app/application-module/preselection/requisition/request/requisitionsales/requisitionsales.component';
import { ResignationcorporateComponent } from 'src/app/application-module/preselection/resignation/request/resignationcorporate/resignationcorporate.component';
import { HoldreleaseresignationcorporateComponent } from 'src/app/application-module/preselection/resignation/holdrelease/holdreleaseresignationcorporate/holdreleaseresignationcorporate.component';
import { ResignationplantComponent } from 'src/app/application-module/preselection/resignation/request/resignationplant/resignationplant.component';
import { HoldreleaseresignationplantComponent } from 'src/app/application-module/preselection/resignation/holdrelease/holdreleaseresignationplant/holdreleaseresignationplant.component';
import { ResignationsalesComponent } from 'src/app/application-module/preselection/resignation/request/resignationsales/resignationsales.component';
import { HoldreleaseresignationsalesComponent } from 'src/app/application-module/preselection/resignation/holdrelease/holdreleaseresignationsales/holdreleaseresignationsales.component';
//import { CreateaccountComponent } from 'src/app/commonpages/createaccount/createaccount.component';
import { SuccessioncorporateComponent } from 'src/app/application-module/preselection/successionplan/request/successioncorporate/successioncorporate.component';
import { HoldreleasesuccessioncorporateComponent } from 'src/app/application-module/preselection/successionplan/holdrelease/holdreleasesuccessioncorporate/holdreleasesuccessioncorporate.component';
import { SuccessionplantComponent } from 'src/app/application-module/preselection/successionplan/request/successionplant/successionplant.component';
import { HoldreleasesuccessionplantComponent } from 'src/app/application-module/preselection/successionplan/holdrelease/holdreleasesuccessionplant/holdreleasesuccessionplant.component';
import { SuccessionsalesComponent } from 'src/app/application-module/preselection/successionplan/request/successionsales/successionsales.component';
import { HoldreleasesuccessionsalesComponent } from 'src/app/application-module/preselection/successionplan/holdrelease/holdreleasesuccessionsales/holdreleasesuccessionsales.component';
import { TransfercorporateComponent } from 'src/app/application-module/preselection/transfer/request/transfercorporate/transfercorporate.component';
import { HoldreleasetransfercorporateComponent } from 'src/app/application-module/preselection/transfer/holdrelease/holdreleasetransfercorporate/holdreleasetransfercorporate.component';
import { TransferplantComponent } from 'src/app/application-module/preselection/transfer/request/transferplant/transferplant.component';
import { HoldreleasetransferplantComponent } from 'src/app/application-module/preselection/transfer/holdrelease/holdreleasetransferplant/holdreleasetransferplant.component';
import { TransfersalesComponent } from 'src/app/application-module/preselection/transfer/request/transfersales/transfersales.component';
import { HoldreleasetransfersalesComponent } from 'src/app/application-module/preselection/transfer/holdrelease/holdreleasetransfersales/holdreleasetransfersales.component';
import { ApproverrequisitionlistComponent } from 'src/app/application-module/preselection/functionalhead/approverlist/approverrequisitionlist/approverrequisitionlist.component';
import { ApproverresignationlistComponent } from 'src/app/application-module/preselection/functionalhead/approverlist/approverresignationlist/approverresignationlist.component';
import { ApproversuccessionplanlistComponent } from 'src/app/application-module/preselection/functionalhead/approverlist/approversuccessionplanlist/approversuccessionplanlist.component';
import { ApprovertransferlistComponent } from 'src/app/application-module/preselection/functionalhead/approverlist/approvertransferlist/approvertransferlist.component';
import { RorequisitionlistComponent } from 'src/app/application-module/preselection/recruitmentowner/rolist/rorequisitionlist/rorequisitionlist.component';
import { RoresignationlistComponent } from 'src/app/application-module/preselection/recruitmentowner/rolist/roresignationlist/roresignationlist.component';
import { RosuccessionplanlistComponent } from 'src/app/application-module/preselection/recruitmentowner/rolist/rosuccessionplanlist/rosuccessionplanlist.component';
import { RotransferlistComponent } from 'src/app/application-module/preselection/recruitmentowner/rolist/rotransferlist/rotransferlist.component';
import { AllocatetormComponent } from 'src/app/application-module/preselection/recruitmentowner/transaction/allocatetorm/allocatetorm.component';
import { RmrequisitionlistComponent } from 'src/app/application-module/preselection/recruitmentmanager/requisition/rmrequisitionlist/rmrequisitionlist.component';
import { AllocatesourcechannelComponent } from 'src/app/application-module/preselection/recruitmentmanager/transaction/allocatesourcechannel/allocatesourcechannel.component';
import { RmrequisitioncandidatelistComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/rmrequisitioncandidatelist/rmrequisitioncandidatelist.component';
import { RmrequisitioncandidateactionComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/rmrequisitioncandidateaction/rmrequisitioncandidateaction.component';
import { CvdropcandidateactionComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/cvdropcandidateaction/cvdropcandidateaction.component';
import { CorporatehiringmanagerrequisitionlistComponent } from 'src/app/application-module/preselection/hiringmanager/requisition/corporatehiringmanagerrequisitionlist/corporatehiringmanagerrequisitionlist.component';
import { PlanthiringmanagerrequisitionlistComponent } from 'src/app/application-module/preselection/hiringmanager/requisition/planthiringmanagerrequisitionlist/planthiringmanagerrequisitionlist.component';
import { SaleshiringmanagerrequisitionlistComponent } from 'src/app/application-module/preselection/hiringmanager/requisition/saleshiringmanagerrequisitionlist/saleshiringmanagerrequisitionlist.component';
import { HiringmanagercandidatelistComponent } from 'src/app/application-module/preselection/hiringmanager/candidate/hiringmanagercandidatelist/hiringmanagercandidatelist.component';
import { HiringmanagercandidateactionComponent } from 'src/app/application-module/preselection/hiringmanager/candidate/hiringmanagercandidateaction/hiringmanagercandidateaction.component';
import { ApplycurrentjobsComponent } from 'src/app/application-module/preselection/employee/jobs/applycurrentjobs/applycurrentjobs.component';
import { ApplyaddcandidateComponent } from 'src/app/application-module/preselection/employee/candidate/applyaddcandidate/applyaddcandidate.component';
import { RefercurrentjobsComponent } from 'src/app/application-module/preselection/employee/jobs/refercurrentjobs/refercurrentjobs.component';
import { ReferaddcandidateComponent } from 'src/app/application-module/preselection/employee/candidate/referaddcandidate/referaddcandidate.component';
import { CmdupdatecandidateComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/cmdupdatecandidate/cmdupdatecandidate.component';
import { CurrentjobComponent } from 'src/app/application-module/vendor/currentjob/currentjob.component';
import { VendoraddcandidateComponent } from 'src/app/application-module/vendor/vendoraddcandidate/vendoraddcandidate.component';
import { VendorcandidatelistComponent } from 'src/app/application-module/vendor/vendorcandidatelist/vendorcandidatelist.component';
import { VendorviewcandidateComponent } from 'src/app/application-module/vendor/vendorviewcandidate/vendorviewcandidate.component';
import { ExternalcurrentjobsComponent } from 'src/app/application-module/candidate/externalcurrentjobs/externalcurrentjobs.component';
import { ExternaladdcandidateComponent } from 'src/app/application-module/candidate/externaladdcandidate/externaladdcandidate.component';
import { RequesterrequisitionlistComponent } from 'src/app/application-module/preselection/requisition/requisitionlist/requesterrequisitionlist/requesterrequisitionlist.component';
import { HraddcandidateComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/hraddcandidate/hraddcandidate.component';
import { StopsourcechannelComponent } from 'src/app/application-module/preselection/recruitmentmanager/transaction/stopsourcechannel/stopsourcechannel.component';
import { UploadnaukriprofileComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/uploadnaukriprofile/uploadnaukriprofile.component';
import { HoldreleaseplantComponent } from 'src/app/application-module/preselection/requisition/holdrelease/holdreleaseplant/holdreleaseplant.component';
import { HoldreleasesalesComponent } from 'src/app/application-module/preselection/requisition/holdrelease/holdreleasesales/holdreleasesales.component';
import { RequesterresignationlistComponent } from 'src/app/application-module/preselection/requisition/requisitionlist/requesterresignationlist/requesterresignationlist.component';
import { ArchivedjobComponent } from 'src/app/application-module/vendor/archivedjob/archivedjob.component';


import { DropcvComponent } from 'src/app/application-module/preselection/employee/candidate/dropcv/dropcv.component';
import { CvDropTagComponent } from '../application-module/preselection/employee/candidate/cv-drop-tag/cv-drop-tag.component';
import { CandidateCvdropTagComponent } from '../application-module/preselection/employee/candidate/candidate-cvdrop-tag/candidate-cvdrop-tag.component';
import { SubmittestresultComponent } from '../application-module/selection/recruitmentmanager/submittestresult/submittestresult.component';
import { RequisitioncandidatelistComponent } from 'src/app/application-module/candidate/requisitioncandidatelist/requisitioncandidatelist.component';
import { RequisitioncandidateviewComponent } from 'src/app/application-module/candidate/requisitioncandidateview/requisitioncandidateview.component';
import { PanelistcalendarComponent } from '../application-module/selection/panelmember/panelistcalendar/panelistcalendar.component';
import { AddinterviewassessmentComponent } from '../application-module/selection/panelmember/addinterviewassessment/addinterviewassessment.component';
import { TravelreimbursementlistComponent } from '../application-module/selection/candidate/travelreimbursementlist/travelreimbursementlist.component';
import { AddtravelreimbursementComponent } from '../application-module/selection/candidate/addtravelreimbursement/addtravelreimbursement.component';
import { RmtravelreimbursementlistComponent } from 'src/app/application-module/selection/recruitmentmanager/rmtravelreimbursementlist/rmtravelreimbursementlist.component';
import { ViewtravelreimbursementComponent } from 'src/app/application-module/selection/recruitmentmanager/viewtravelreimbursement/viewtravelreimbursement.component';
import { CandidateviewComponent } from 'src/app/application-module/selection/panelmember/candidateview/candidateview.component';
import { CreateapplicationformaComponent } from 'src/app/application-module/candidate/createapplicationforma/createapplicationforma.component';
import { CreateapplicationformbComponent } from 'src/app/application-module/candidate/createapplicationformb/createapplicationformb.component';
import { ViewinterviewassesmentComponent } from 'src/app/application-module/selection/recruitmentmanager/viewinterviewassesment/viewinterviewassesment.component';
import { ViewapplicationformComponent } from 'src/app/application-module/candidate/viewapplicationform/viewapplicationform.component';
import { UploadcandidatedocumentComponent } from 'src/app/application-module/candidate/uploadcandidatedocument/uploadcandidatedocument.component';
// import { CandidatemanagementComponent } from 'src/app/application-module/prejoining/recruitmentmanager/candidatemanagement/candidatemanagement.component';
// import { RmverifycandidatedocumnetsComponent } from 'src/app/application-module/offer/recruitmentmanager/rmverifycandidatedocumnets/rmverifycandidatedocumnets.component';
import { UploadmedicaldocumentComponent } from '../application-module/prejoining/candidate/uploadmedicaldocument/uploadmedicaldocument.component';
import { CandidatemanagementComponent } from '../application-module/prejoining/recruitmentmanager/candidatemanagement/candidatemanagement.component';
import { CandidatelistComponent } from '../application-module/prejoining/doctor/candidatelist/candidatelist.component';
import { VerifycandidateComponent } from '../application-module/prejoining/doctor/verifycandidate/verifycandidate.component';
import { PlantallocationlistComponent } from '../application-module/prejoining/onboardingmanager/plant/plantallocationlist/plantallocationlist.component';
import { CorporateallocationComponent } from '../application-module/prejoining/onboardingmanager/corporate/corporateallocation/corporateallocation.component';
import { SalesandmarketingallocationlistComponent } from '../application-module/prejoining/onboardingmanager/salesandmarketing/salesandmarketingallocationlist/salesandmarketingallocationlist.component';
//import { JoinerslistComponent } from '../application-module/prejoining/onboardingcoordinator/joinerslist/joinerslist.component';
import { ViewcandidatelistComponent } from '../application-module/prejoining/onboardingcoordinator/viewcandidatelist/viewcandidatelist.component';
import { ScheduleinductionComponent } from '../application-module/prejoining/onboardingcoordinator/scheduleinduction/scheduleinduction.component';
import { ScheduleaccommodationComponent } from '../application-module/prejoining/onboardingcoordinator/scheduleaccommodation/scheduleaccommodation.component';
import { AccommodationlistComponent } from '../application-module/prejoining/trainingincharge/accommodationlist/accommodationlist.component';
import { RmverifycandidatedocumnetsComponent } from 'src/app/application-module/offer/recruitmentmanager/rmverifycandidatedocumnets/rmverifycandidatedocumnets.component';
import { FillaccommodationComponent } from '../application-module/prejoining/trainingincharge/fillaccommodation/fillaccommodation.component';
import { ViewscheduledetailsComponent } from '../application-module/prejoining/trainingincharge/viewscheduledetails/viewscheduledetails.component';
import { ViewaccommodationdetailsComponent } from '../application-module/prejoining/trainingincharge/viewaccommodationdetails/viewaccommodationdetails.component';
import { RmverifymedicaldocumentComponent } from '../application-module/prejoining/recruitmentmanager/rmverifymedicaldocument/rmverifymedicaldocument.component';
import { EditaccommodationComponent } from '../application-module/prejoining/onboardingcoordinator/editaccommodation/editaccommodation.component';
import { WelcomeacknowledgementComponent } from '../application-module/prejoining/candidate/welcomeacknowledgement/welcomeacknowledgement.component';
import { CandidateinductionplanComponent } from '../application-module/prejoining/candidate/candidateinductionplan/candidateinductionplan.component';
import { CandidatejoiningformComponent } from '../application-module/prejoining/candidate/candidatejoiningform/candidatejoiningform.component';
import { UploadjoiningformComponent } from '../application-module/prejoining/candidate/uploadjoiningform/uploadjoiningform.component';
import { CandidatejoiningchecklistComponent } from '../application-module/prejoining/recruitmentmanager/candidatejoiningchecklist/candidatejoiningchecklist.component';
import { CorporatejoinerslistComponent } from 'src/app/application-module/prejoining/onboardingmanager/corporate/corporatejoinerslist/corporatejoinerslist.component';
import { OmplantjoinerslistComponent } from 'src/app/application-module/prejoining/onboardingmanager/plant/omplantjoinerslist/omplantjoinerslist.component';
import { OmsalesandmarketingjoinerslistComponent } from 'src/app/application-module/prejoining/onboardingmanager/salesandmarketing/omsalesandmarketingjoinerslist/omsalesandmarketingjoinerslist.component';
import { RmjoiningchecklistComponent } from '../application-module/prejoining/recruitmentmanager/rmjoiningchecklist/rmjoiningchecklist.component';

import { OccorporatejoinerslistComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/corporate/occorporatejoinerslist/occorporatejoinerslist.component';
import { OcplantjoinerslistComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/plant/ocplantjoinerslist/ocplantjoinerslist.component';
import { OcsalesandmarketingjoinerslistComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/salesandmarketing/ocsalesandmarketingjoinerslist/ocsalesandmarketingjoinerslist.component';
import { OcverifydocumentComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/ocverifydocument/ocverifydocument.component';
import { OcjoiningchecklistComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/ocjoiningchecklist/ocjoiningchecklist.component';


import { ManageindustryComponent } from '../application-module/master/manageindustry/manageindustry.component';
import { ManagecourseComponent } from '../application-module/master/managecourse/managecourse.component';
import { ManagequalificationComponent } from '../application-module/master/managequalification/managequalification.component';
import { ManagejobtypeComponent } from '../application-module/master/managejobtype/managejobtype.component';
import { ManagestreamComponent } from '../application-module/master/managestream/managestream.component';
import { QualificationcoursemappingComponent } from '../application-module/master/qualificationcoursemapping/qualificationcoursemapping.component';
import { QualificationcoursestreammappingComponent } from '../application-module/master/qualificationcoursestreammapping/qualificationcoursestreammapping.component';
import { ManagelanguageComponent } from 'src/app/application-module/master/managelanguage/managelanguage.component';
import { ManagefunctionComponent } from 'src/app/application-module/master/managefunction/managefunction.component';
import { ManagedomainComponent } from 'src/app/application-module/master/managedomain/managedomain.component';
import { ManagedepartmentComponent } from 'src/app/application-module/master/managedepartment/managedepartment.component';
import { ManagegradeComponent } from 'src/app/application-module/master/managegrade/managegrade.component';
import { ManageselectionComponent } from 'src/app/application-module/master/manageselection/manageselection.component';
import { ManageoccupationComponent } from 'src/app/application-module/master/manageoccupation/manageoccupation.component';
import { ManageuniversityComponent } from 'src/app/application-module/master/manageuniversity/manageuniversity.component';
import { ManagereligionComponent } from 'src/app/application-module/master/managereligion/managereligion.component';
import { ManagecasteComponent } from 'src/app/application-module/master/managecaste/managecaste.component';
import { ManagejobdescriptionComponent } from 'src/app/application-module/master/managejobdescription/managejobdescription.component';
import { MenuAccessComponent } from 'src/app/application-module/master/menu-access/menu-access.component';
import { UserRoleComponent } from 'src/app/application-module/master/user-role/user-role.component';
import { ManageDocnameComponent } from 'src/app/application-module/master/manage-docname/manage-docname.component';
import { ManageDocparticularComponent } from 'src/app/application-module/master/manage-docparticular/manage-docparticular.component';
import { ManageDoctypeComponent } from 'src/app/application-module/master/manage-doctype/manage-doctype.component';
import { SalaryaccountheadComponent } from 'src/app/application-module/master/salaryaccounthead/salaryaccounthead.component';
import { SalarytemplateComponent } from 'src/app/application-module/master/salarytemplate/salarytemplate.component';
import { RmcandidatesalaryfitmentComponent } from 'src/app/application-module/offer/recruitmentmanager/rmcandidatesalaryfitment/rmcandidatesalaryfitment.component';
import { ManageDeptheadComponent } from 'src/app/application-module/master/manage-depthead/manage-depthead.component';
import { ManageGradepositionComponent } from 'src/app/application-module/master/manage-gradeposition/manage-gradeposition.component';
import { ManagepositionComponent } from 'src/app/application-module/master/manageposition/manageposition.component';
import { ManageVerticalrmComponent } from 'src/app/application-module/master/manage-verticalrm/manage-verticalrm.component';
import { ManageInterviewpanelComponent } from 'src/app/application-module/master/manage-interviewpanel/manage-interviewpanel.component';
import { SalaryacceptanceComponent } from 'src/app/application-module/candidate/salaryacceptance/salaryacceptance.component';
import { GeneratemanagementapprovalComponent } from 'src/app/application-module/offer/recruitmentmanager/generatemanagementapproval/generatemanagementapproval.component';
import { SendofferletterComponent } from 'src/app/application-module/offer/recruitmentmanager/sendofferletter/sendofferletter.component';
import { OfferacceptanceComponent } from 'src/app/application-module/candidate/offeracceptance/offeracceptance.component';
import { ViewhrfeedbackComponent } from 'src/app/application-module/selection/recruitmentmanager/viewhrfeedback/viewhrfeedback.component';
import { RequisitionReportComponent } from 'src/app/application-module/reports/requisition-report/requisition-report.component';
import { ResignationReportComponent } from 'src/app/application-module/reports/resignation-report/resignation-report.component';
import { SuccessplanReportComponent } from 'src/app/application-module/reports/successplan-report/successplan-report.component';
import { TransferReportComponent } from 'src/app/application-module/reports/transfer-report/transfer-report.component';
import { CandidateReportComponent } from 'src/app/application-module/reports/candidate-report/candidate-report.component';
import { RmRequisitionReportComponent } from 'src/app/application-module/reports/rm-requisition-report/rm-requisition-report.component';
import { ReferredCandidateReportComponent } from 'src/app/application-module/reports/referred-candidate-report/referred-candidate-report.component';
import { SourceWiseReportComponent } from 'src/app/application-module/reports/source-wise-report/source-wise-report.component';
//import { SourcechannelMonthwiseReportComponent } from 'src/app/application-module/reports/sourcechannel-monthwise-report/sourcechannel-monthwise-report.component';
import { ManagecampuscourseComponent } from 'src/app/application-module/campus-master/managecampuscourse/managecampuscourse.component';
import { ManagecampusstreamComponent } from 'src/app/application-module/campus-master/managecampusstream/managecampusstream.component';
import { ManagecampuscoursestreamComponent } from 'src/app/application-module/campus-master/managecampuscoursestream/managecampuscoursestream.component';
import { ManagecampusyearComponent } from 'src/app/application-module/campus-master/managecampusyear/managecampusyear.component';
import { ManagecampuscollegeComponent } from 'src/app/application-module/campus-master/managecampuscollege/managecampuscollege.component';
import { CampusrequisitionComponent } from 'src/app/application-module/campus/campusrequisition/campusrequisition.component';
import { CampusrequisitionlistComponent } from 'src/app/application-module/campus/campusrequisitionlist/campusrequisitionlist.component';
import { CampusrequisitionlinkComponent } from 'src/app/application-module/campus/campusrequisitionlink/campusrequisitionlink.component';
import { MailSendingFormComponent } from '../application-module/master/mail-sending-form/mail-sending-form.component';

import { HtcandidatelistComponent } from '../application-module/joining/hiringteam/corporate/htcandidatelist/htcandidatelist.component';
import { HtplantcandidatelistComponent } from '../application-module/joining/hiringteam/plant/htplantcandidatelist/htplantcandidatelist.component';
import { HtsalescandidatelistComponent } from '../application-module/joining/hiringteam/salesandmarketing/htsalescandidatelist/htsalescandidatelist.component';
import { ViewhandbookComponent } from '../application-module/joining/candidate/viewhandbook/viewhandbook.component';
import { CdinductionfeedbackComponent } from '../application-module/joining/candidate/cdinductionfeedback/cdinductionfeedback.component';
import { GiveinductionfeedbackComponent } from '../application-module/joining/candidate/giveinductionfeedback/giveinductionfeedback.component';
import { ViewinductionfeedbackComponent } from '../application-module/joining/candidate/viewinductionfeedback/viewinductionfeedback.component';


import { CorporateemployeemanagementComponent } from '../application-module/joining/recruitmentmanager/corporate/corporateemployeemanagement/corporateemployeemanagement.component';
import { PlantemployeemanagementComponent } from '../application-module/joining/recruitmentmanager/plant/plantemployeemanagement/plantemployeemanagement.component';
import { SalesemployeemanagementComponent } from '../application-module/joining/recruitmentmanager/salesandmarketing/salesemployeemanagement/salesemployeemanagement.component';
import { MedicalreimbursementlistComponent } from '../application-module/joining/candidate/medicalreimbursementlist/medicalreimbursementlist.component';
import { MedicalreimbursementdetailsComponent } from '../application-module/joining/candidate/medicalreimbursementdetails/medicalreimbursementdetails.component';
import { CdtravelreimbursementlistComponent } from '../application-module/joining/candidate/cdtravelreimbursementlist/cdtravelreimbursementlist.component';
import { CdtrabelreimbursementdetailsComponent } from '../application-module/joining/candidate/cdtrabelreimbursementdetails/cdtrabelreimbursementdetails.component';
import { NoticperiodbuyoutreimbursementlistComponent } from '../application-module/joining/candidate/noticperiodbuyoutreimbursementlist/noticperiodbuyoutreimbursementlist.component';
import { NoticeperiodbuyoutreimbursementdetailsComponent } from '../application-module/joining/candidate/noticeperiodbuyoutreimbursementdetails/noticeperiodbuyoutreimbursementdetails.component';
import { OccandidatemedicalreimbursementlistComponent } from '../application-module/joining/onboardingcoordinator/occandidatemedicalreimbursementlist/occandidatemedicalreimbursementlist.component';
import { OcviewmedicalreimbursementdetailsComponent } from '../application-module/joining/onboardingcoordinator/ocviewmedicalreimbursementdetails/ocviewmedicalreimbursementdetails.component';
import { OccandidatetravelreimbursementlistComponent } from '../application-module/joining/onboardingcoordinator/occandidatetravelreimbursementlist/occandidatetravelreimbursementlist.component';
import { OcviewtravelreimbursementdetailsComponent } from '../application-module/joining/onboardingcoordinator/ocviewtravelreimbursementdetails/ocviewtravelreimbursementdetails.component';
import { OcnoticeperiodreimbursementlistComponent } from '../application-module/joining/onboardingcoordinator/ocnoticeperiodreimbursementlist/ocnoticeperiodreimbursementlist.component';
import { OcviewnoticeperiodbuyoutdetailsComponent } from '../application-module/joining/onboardingcoordinator/ocviewnoticeperiodbuyoutdetails/ocviewnoticeperiodbuyoutdetails.component';
import { HtrelocationreimbursementlistComponent } from '../application-module/joining/hiringteam/htrelocationreimbursementlist/htrelocationreimbursementlist.component';
import { HtdocumentverificationComponent } from '../application-module/joining/hiringteam/htdocumentverification/htdocumentverification.component';
import { InductionassessmentComponent } from '../application-module/master/inductionassessment/inductionassessment.component';
import { CreateAssessmentComponent } from '../application-module/master/create-assessment/create-assessment.component';
import { PccorporateassessmentlistComponent } from '../application-module/joining/programcordinator/corporate/pccorporateassessmentlist/pccorporateassessmentlist.component';
import { PcplantassessmentlistComponent } from '../application-module/joining/programcordinator/plant/pcplantassessmentlist/pcplantassessmentlist.component';
import { PcsalesassessmentlistComponent } from '../application-module/joining/programcordinator/salesandmarketing/pcsalesassessmentlist/pcsalesassessmentlist.component';
import { PcviewcandidatelistComponent } from '../application-module/joining/programcordinator/pcviewcandidatelist/pcviewcandidatelist.component';
import { CandidateassessmentlistComponent } from '../application-module/joining/candidate/candidateassessmentlist/candidateassessmentlist.component';
import { CandidatetakeassessmentComponent } from '../application-module/joining/candidate/candidatetakeassessment/candidatetakeassessment.component';
import { EvaluateassessmentlistComponent } from '../application-module/joining/programcordinator/evaluateassessmentlist/evaluateassessmentlist.component';
import { PcevaluateassessmentComponent } from '../application-module/joining/programcordinator/pcevaluateassessment/pcevaluateassessment.component';
import { PcuploadassessmentevaluationComponent } from '../application-module/joining/programcordinator/pcuploadassessmentevaluation/pcuploadassessmentevaluation.component';
import { PcviewassessmentComponent } from '../application-module/joining/programcordinator/pcviewassessment/pcviewassessment.component';
import { PcviewbatchassessmentsummaryComponent } from '../application-module/joining/programcordinator/pcviewbatchassessmentsummary/pcviewbatchassessmentsummary.component';
import { PcviewcandidateassessmentsummaryComponent } from '../application-module/joining/programcordinator/pcviewcandidateassessmentsummary/pcviewcandidateassessmentsummary.component';
import { InductionFeedbackComponent } from '../application-module/master/induction-feedback/induction-feedback.component';
import { FeedbackComponent } from '../application-module/master/feedback/feedback.component';
import { PcviewinductionfeedbackComponent } from '../application-module/joining/programcordinator/pcviewinductionfeedback/pcviewinductionfeedback.component';

import { AddtesttravelreimbursementComponent } from '../application-module/selection/candidate/addtesttravelreimbursement/addtesttravelreimbursement.component';
import { TesttravelreimbursementComponent } from '../application-module/selection/candidate/testtravelreimbursement/testtravelreimbursement.component';
import { RmtesttravelreimbursementlistComponent } from 'src/app/application-module/selection/recruitmentmanager/rmtesttravelreimbursementlist/rmtesttravelreimbursementlist.component';
import { ViewtesttravelreimbursementComponent } from 'src/app/application-module/selection/recruitmentmanager/viewtesttravelreimbursement/viewtesttravelreimbursement.component';
import { InterviewfedbacklistComponent } from 'src/app/application-module/selection/candidate/interviewfedbacklist/interviewfedbacklist.component';
import { AddinterviewfedbackComponent } from 'src/app/application-module/selection/candidate/addinterviewfedback/addinterviewfedback.component';
import { ViewcandidateinterviewfedbacklistComponent } from 'src/app/application-module/selection/recruitmentmanager/viewcandidateinterviewfedbacklist/viewcandidateinterviewfedbacklist.component';
import { OcviewdocumentComponent } from 'src/app/application-module/prejoining/onboardingcoordinator/ocviewdocument/ocviewdocument.component';
import { ManagelocationComponent } from 'src/app/application-module/master/managelocation/managelocation.component';
import { ManagelocationfunctionComponent } from 'src/app/application-module/master/managelocationfunction/managelocationfunction.component';
import { OmviewdocumentComponent } from 'src/app/application-module/prejoining/onboardingmanager/omviewdocument/omviewdocument.component';
import { OcreassigncandidateComponent } from '../application-module/joining/onboardingcoordinator/ocreassigncandidate/ocreassigncandidate.component';


import { RequisitionreportComponent } from '../application-module/allreports/requisitionreport/requisitionreport.component';
import { ResignationreportComponent } from '../application-module/allreports/resignationreport/resignationreport.component';
import { TransferreportComponent } from '../application-module/allreports/transferreport/transferreport.component';
import { SuccessionplanreportComponent } from '../application-module/allreports/successionplanreport/successionplanreport.component';
import { OfferedcandidatereportComponent } from '../application-module/allreports/offeredcandidatereport/offeredcandidatereport.component';
import { FunctionalheadrequisitionreportComponent } from '../application-module/allreports/functionalheadrequisitionreport/functionalheadrequisitionreport.component';
import { LeadtimereportComponent } from '../application-module/allreports/leadtimereport/leadtimereport.component';
import { SourcewisereportComponent } from '../application-module/allreports/sourcewisereport/sourcewisereport.component';
import { ReferredcandidatereportComponent } from '../application-module/allreports/referredcandidatereport/referredcandidatereport.component';
import { CandidatetrackerreportComponent } from '../application-module/allreports/candidatetrackerreport/candidatetrackerreport.component';
import { EmployeesalaryreportComponent } from '../application-module/allreports/employeesalaryreport/employeesalaryreport.component';
import { RelativeCandidatereportComponent } from '../application-module/allreports/relative-candidatereport/relative-candidatereport.component';
import { BGVStatusreportComponent } from '../application-module/allreports/bgvstatusreport/bgvstatusreport.component';
import { IntervieworganisedreportComponent } from '../application-module/allreports/intervieworganisedreport/intervieworganisedreport.component';
import { PreemploymentmedicaldreportComponent } from '../application-module/allreports/preemploymentmedicaldreport/preemploymentmedicaldreport.component';
import { RmDashboardComponent } from 'src/app/application-module/dashboard/rm-dashboard/rm-dashboard.component';
import { DashboardComponent } from 'src/app/application-module/dashboard/dashboard/dashboard.component';

import { OhcandidatelistComponent } from '../application-module/prejoining/OnboardingHead/ohcandidatelist/ohcandidatelist.component';

import { OhviewdocumentComponent } from '../application-module/prejoining/OnboardingHead/ohviewdocument/ohviewdocument.component';

import { OhviewcandidatelistComponent } from '../application-module/prejoining/OnboardingHead/ohviewcandidatelist/ohviewcandidatelist.component';
import { ManageTemplateComponent } from 'src/app/application-module/master/manage-template/manage-template.component';
import { UploademployeemasterComponent } from 'src/app/application-module/master/uploademployeemaster/uploademployeemaster.component';
import { HandholdingallocationcandidatelistComponent } from 'src/app/application-module/handholding/handholdingallocationcandidatelist/handholdingallocationcandidatelist.component';
import { HandholdingallocationplantcandidatelistComponent } from 'src/app/application-module/handholding/handholdingallocationplantcandidatelist/handholdingallocationplantcandidatelist.component';
import { HandholdingallocationsalescandidatelistComponent } from 'src/app/application-module/handholding/handholdingallocationsalescandidatelist/handholdingallocationsalescandidatelist.component';
import { AicjobshadowreviewcandidatelistComponent } from 'src/app/application-module/handholding/aicjobshadowreviewcandidatelist/aicjobshadowreviewcandidatelist.component';
import { AiclistenreviewcandidatelistComponent } from 'src/app/application-module/handholding/aiclistenreviewcandidatelist/aiclistenreviewcandidatelist.component';
import { AichalfyearlyreviewcandidatelistComponent } from 'src/app/application-module/handholding/aichalfyearlyreviewcandidatelist/aichalfyearlyreviewcandidatelist.component';
import { AicconfirmreviewcandidatelistComponent } from 'src/app/application-module/handholding/aicconfirmreviewcandidatelist/aicconfirmreviewcandidatelist.component';
import { FormjobshadowreviewComponent } from 'src/app/application-module/handholding/formjobshadowreview/formjobshadowreview.component';
import { ManagedoctorComponent } from '../application-module/master/managedoctor/managedoctor.component';
import { ManageverticalpositionComponent } from '../application-module/master/manageverticalposition/manageverticalposition.component';
import { ManageModeOfJoiningComponent } from '../application-module/master/manage-mode-of-joining/manage-mode-of-joining.component';
import { ManageInductionVenueComponent } from '../application-module/master/manage-induction-venue/manage-induction-venue.component';
import { ManageReportingVenueComponent } from '../application-module/master/manage-reporting-venue/manage-reporting-venue.component';
import { ManageInductionModeComponent } from '../application-module/master/manage-induction-mode/manage-induction-mode.component';
import { ManagelocationwisetraininginchargeComponent } from '../application-module/master/managelocationwisetrainingincharge/managelocationwisetrainingincharge.component';
import { ManageStateComponent } from '../application-module/master/manage-state/manage-state.component';
import { ManageSelectionGuideComponent } from '../application-module/master/manage-selection-guide/manage-selection-guide.component';
import { ManageVendorComponent } from 'src/app/application-module/master/manage-vendor/manage-vendor.component';
import { CampustalentpoolComponent } from '../application-module/campus/campustalentpool/campustalentpool.component';

import { CampussubmittestresultComponent } from 'src/app/application-module/campus/campussubmittestresult/campussubmittestresult.component';

import { FormlistenreviewComponent } from '../application-module/handholding/formlistenreview/formlistenreview.component';
import { FormhalfyearlyreviewComponent } from '../application-module/handholding/formhalfyearlyreview/formhalfyearlyreview.component';
import { FormconfirmationreviewComponent } from '../application-module/handholding/formconfirmationreview/formconfirmationreview.component';
import { FormhrfeedbackComponent } from '../application-module/handholding/formhrfeedback/formhrfeedback.component';
import { FormhrreviewComponent } from '../application-module/handholding/formhrreview/formhrreview.component';
import { JobshadowreviewlistComponent } from '../application-module/handholding/corporate/jobshadowreviewlist/jobshadowreviewlist.component';
import { ListenreviewlistComponent } from '../application-module/handholding/corporate/listenreviewlist/listenreviewlist.component';
import { HalfyearlyreviewlistComponent } from '../application-module/handholding/corporate/halfyearlyreviewlist/halfyearlyreviewlist.component';
import { ConfirmationreviewlistComponent } from '../application-module/handholding/corporate/confirmationreviewlist/confirmationreviewlist.component';
import { PlantconfirmationreviewlistComponent } from '../application-module/handholding/plant/plantconfirmationreviewlist/plantconfirmationreviewlist.component';
import { PlanthalfyearlyreviewlistComponent } from '../application-module/handholding/plant/planthalfyearlyreviewlist/planthalfyearlyreviewlist.component';
import { PlantlistenreviewlistComponent } from '../application-module/handholding/plant/plantlistenreviewlist/plantlistenreviewlist.component';
import { PlantjobshadowreviewlistComponent } from '../application-module/handholding/plant/plantjobshadowreviewlist/plantjobshadowreviewlist.component';
import { SalesjobshadowreviewlistComponent } from '../application-module/handholding/sales/salesjobshadowreviewlist/salesjobshadowreviewlist.component';
import { SaleslistenreviewlistComponent } from '../application-module/handholding/sales/saleslistenreviewlist/saleslistenreviewlist.component';
import { SaleshalfyearlyreviewlistComponent } from '../application-module/handholding/sales/saleshalfyearlyreviewlist/saleshalfyearlyreviewlist.component';
import { SalesconfirmationreviewlistComponent } from '../application-module/handholding/sales/salesconfirmationreviewlist/salesconfirmationreviewlist.component';
import { JobshadowreviewapprovalComponent } from '../application-module/handholding/jobshadowreviewapproval/jobshadowreviewapproval.component';
import { ListenreviewapprovalComponent } from '../application-module/handholding/listenreviewapproval/listenreviewapproval.component';
import { HalfyearlyreviewapprovalComponent } from '../application-module/handholding/halfyearlyreviewapproval/halfyearlyreviewapproval.component';
import { ConfirmationreviewapprovalComponent } from '../application-module/handholding/confirmationreviewapproval/confirmationreviewapproval.component';
import { HandholdingdocumentComponent } from '../application-module/handholding/handholdingdocument/handholdingdocument.component';
import { CampuscandidateprofileComponent } from '../application-module/campus/campuscandidateprofile/campuscandidateprofile.component';
// Vendor Sanjib 12-05-2022

import { VendorjoinedcandidateComponent } from '../application-module/vendor/vendorjoinedcandidate/vendorjoinedcandidate.component';
import { VendorinvoicelistComponent } from '../application-module/vendor/vendorinvoicelist/vendorinvoicelist.component';

// Kuntal

import { RqstFunctionalheadRequisitionReportComponent } from 'src/app/application-module/reports/rqst-functionalhead-requisition-report/rqst-functionalhead-requisition-report.component';
import { RqstFunctionalheadOfferCandidateReportComponent } from 'src/app/application-module/reports/rqst-functionalhead-offer-candidate-report/rqst-functionalhead-offer-candidate-report.component';
import { FunctionalheadAttritionReportComponent } from 'src/app/application-module/reports/functionalhead-attrition-report/functionalhead-attrition-report.component';
import { VendorcandidateReportComponent } from 'src/app/application-module/reports/vendorcandidate-report/vendorcandidate-report.component';
import { RelocationReportComponent } from 'src/app/application-module/reports/relocation-report/relocation-report.component';
import { RecruitmentManagerRequisitionReportComponent } from 'src/app/application-module/reports/recruitment-manager-requisition-report/recruitment-manager-requisition-report.component';

// Piu

import { HropsresignationReportComponent } from '../application-module/reports/hropsresignation-report/hropsresignation-report.component';
import { DocumentstatusReportComponent } from '../application-module/reports/documentstatus-report/documentstatus-report.component';
import { ManagesalarytypeComponent } from '../application-module/master/managesalarytype/managesalarytype.component';
import { ManageInterviewvenueComponent } from '../application-module/master/manage-interviewvenue/manage-interviewvenue.component';

// Arnab

import { ManageSubdomainComponent } from 'src/app/application-module/master/manage-subdomain/manage-subdomain.component';
import { ExternalTrainersComponent } from '../application-module/master/external-trainers/external-trainers.component';
import { ExternalInductionVenueComponent } from '../application-module/master/external-induction-venue/external-induction-venue.component';
import { ManageCountryComponent } from 'src/app/application-module/master/manage-country/manage-country.component';
import { ManageNationalityComponent } from 'src/app/application-module/master/manage-nationality/manage-nationality.component';
import { ManageRelationshipComponent } from 'src/app/application-module/master/manage-relationship/manage-relationship.component';
import { ManagePDFMasterComponent } from 'src/app/application-module/master/manage-pdfmaster/manage-pdfmaster.component';
import { CandidateAttritionReportComponent } from 'src/app/application-module/reports/candidate-attrition-report/candidate-attrition-report.component';
import { ConsPaymentTrackerReportComponent } from 'src/app/application-module/reports/cons-payment-tracker-report/cons-payment-tracker-report.component';
import { PreemployeementReportComponent } from '../application-module/reports/preemployeement-report/preemployeement-report.component';
import { ConsultantlistReportComponent } from '../application-module/reports/consultantlist-report/consultantlist-report.component';

import { ManageEmailTemplateComponent } from '../application-module/master/manage-email-template/manage-email-template.component';
import { ManageFunctionPositionComponent } from '../application-module/master/manage-function-position/manage-function-position.component';

//Anif
import { ManageHmFunctionComponent } from '../application-module/master/manage-hm-function/manage-hm-function.component';
import { IntrerviewPanelMemberMappingComponent } from '../application-module/master/intrerview-panel-member-mapping/intrerview-panel-member-mapping.component';
import { InductionTemplateDetailsComponent } from '../application-module/master/induction-template-details/induction-template-details.component';

import { ManageEdmsAccessComponent } from '../application-module/master/manage-edms-access/manage-edms-access.component';
import { GardewiseDocmapListComponent } from '../application-module/master/gardewise-docmap-list/gardewise-docmap-list.component';
import { GradewiseDocmapDetailsComponent } from '../application-module/master/gradewise-docmap-details/gradewise-docmap-details.component';
import { AddeditGradewiseDocmapComponent } from '../application-module/master/addedit-gradewise-docmap/addedit-gradewise-docmap.component';

import { ManageRequestorVerticalmapComponent } from '../application-module/master/manage-requestor-verticalmap/manage-requestor-verticalmap.component';
import { CorporateResignationListComponent } from '../application-module/preselection/hrops/corporate-resignation-list/corporate-resignation-list.component';
import { PlantResignationListComponent } from '../application-module/preselection/hrops/plant-resignation-list/plant-resignation-list.component';
import { SalesResignationListComponent } from '../application-module/preselection/hrops/sales-resignation-list/sales-resignation-list.component';
import { InductiveSalaryComponent } from '../application-module/master/inductive-salary/inductive-salary.component';
import { RolewiseUserverticalfunctionmapComponent } from '../application-module/master/rolewise-userverticalfunctionmap/rolewise-userverticalfunctionmap.component';
import { RocandidatecallbackrequestlisComponent } from 'src/app/application-module/selection/recruitmentowner/rocandidatecallbackrequestlis/rocandidatecallbackrequestlis.component';
import { SalesandmarketingComponent } from '../application-module/campus/salesandmarketing/salesandmarketing.component';
import { HtrelocationreimbursementdetailsComponent } from '../application-module/joining/hiringteam/htrelocationreimbursementdetails/htrelocationreimbursementdetails.component';
import { PanalMemberMyCalendarComponent } from '../application-module/campus/panal-member-my-calendar/panal-member-my-calendar.component';
import { HRHandHoldingComponent } from 'src/app/application-module/campus/hrhand-holding/hrhand-holding.component';
import { CampushrreviewComponent } from '../application-module/campus/campushrreview/campushrreview.component';
import { CampusCorporateReviewComponent } from '../application-module/campus/campus-corporate-review/campus-corporate-review.component';
import { CampusSalesandMarketingReviewComponent } from '../application-module/campus/campus-salesand-marketing-review/campus-salesand-marketing-review.component';
import { CountryStateLocationMappingComponent } from '../application-module/master/country-state-location-mapping/country-state-location-mapping.component';
import { CorporateHrHandHoldingComponent } from '../application-module/campus/corporate-hr-hand-holding/corporate-hr-hand-holding.component';
import { SalesandmarketingHrHandHoldingComponent } from '../application-module/campus/salesandmarketing-hr-hand-holding/salesandmarketing-hr-hand-holding.component';
import { HtjoiningchecklistComponentComponent } from '../application-module/joining/hiringteam/htjoiningchecklist-component/htjoiningchecklist-component.component'
import { ManageTestVenueComponentComponent } from 'src/app/application-module/master/manage-test-venue-component/manage-test-venue-component.component';
import { SapAndDigitalVarianceComponent } from '../application-module/reports/sap-and-digital-variance/sap-and-digital-variance.component';
import { VacancyReportComponent } from 'src/app/application-module/reports/vacancy-report/vacancy-report.component';
import { HandHoldingAccessComponent } from 'src/app/application-module/master/hand-holding-access/hand-holding-access.component';
import { RecruitmentmentFunnelReportComponent } from 'src/app/application-module/reports/recruitmentment-funnel-report/recruitmentment-funnel-report.component';
import { RoleWiseDocumentAccessComponent } from '../application-module/master/role-wise-document-access/role-wise-document-access.component';
import { ManageTrainingTittleComponent } from '../application-module/master/manage-training-tittle/manage-training-tittle.component';
import { HandholdingapprovalplantcandidatelistComponent } from 'src/app/application-module/handholding/handholdingapprovalplantcandidatelist/handholdingapprovalplantcandidatelist.component';
import { HandholdingapprovalcorporatecandidatelistComponent } from 'src/app/application-module/handholding/handholdingapprovalcorporatecandidatelist/handholdingapprovalcorporatecandidatelist.component';
import { HandholdingapprovalsalescandidatelistComponent } from 'src/app/application-module/handholding/handholdingapprovalsalescandidatelist/handholdingapprovalsalescandidatelist.component';
import { HandholdingConfirmationformViewComponent } from 'src/app/application-module/handholding/handholding-confirmationform-view/handholding-confirmationform-view.component';
import { CostCenterMapWithSubAreaVerticalFucLocStateComponent } from '../application-module/master/cost-center-map-with-sub-area-vertical-fuc-loc-state/cost-center-map-with-sub-area-vertical-fuc-loc-state.component';
import { ScheduleaccommodationbatchComponent } from '../application-module/prejoining/onboardingcoordinator/scheduleaccommodationbatch/scheduleaccommodationbatch.component';
import { GeneratemanagementapprovalviewComponent } from '../application-module/offer/generatemanagementapprovalview/generatemanagementapprovalview.component';
import { ViewaccommodationdetailsbatchComponent } from '../application-module/prejoining/trainingincharge/viewaccommodationdetailsbatch/viewaccommodationdetailsbatch.component';
import { EditaccommodationbatchComponent } from '../application-module/prejoining/onboardingcoordinator/editaccommodationbatch/editaccommodationbatch.component';
import { OcrequsitioncandidateactionComponent } from '../application-module/prejoining/ocrequsitioncandidateaction/ocrequsitioncandidateaction.component';
import { FeedbackStatusListComponent } from 'src/app/application-module/joining/programcordinator/feedback-status-list/feedback-status-list.component';
import { CandidateEvaluateassessmentlistComponentComponent } from 'src/app/application-module/joining/programcordinator/candidate-evaluateassessmentlist-component/candidate-evaluateassessmentlist-component.component';
import { MRFPPFComponent } from '../application-module/joining/hiringteam/mrfppf/mrfppf.component';
import { ManageFamilyRelationShipComponent } from 'src/app/application-module/master/manage-family-relation-ship/manage-family-relation-ship.component';
import { HrHandHoldingAccessComponent } from 'src/app/application-module/handholding/hr-hand-holding-access/hr-hand-holding-access.component';
import { OcreassignindividualcandidateComponentComponent } from '../application-module/joining/onboardingcoordinator/ocreassignindividualcandidate-component/ocreassignindividualcandidate-component.component';
import { OccorporatediscontinuedcandidatelistComponent } from '../application-module/joining/onboardingcoordinator/corporate/occorporatediscontinuedcandidatelist/occorporatediscontinuedcandidatelist.component';
import { OcplantdiscontinuedcandidatelistComponent } from '../application-module/joining/onboardingcoordinator/plant/ocplantdiscontinuedcandidatelist/ocplantdiscontinuedcandidatelist.component';
import { OcsalesdiscontinuedcandidatelistComponent } from '../application-module/joining/onboardingcoordinator/salesandmarketing/ocsalesdiscontinuedcandidatelist/ocsalesdiscontinuedcandidatelist.component';
import { ConsultantPerformanceReportComponent } from '../application-module/reports/consultant-performance-report/consultant-performance-report.component';
import { RecruiterperformanceReportComponent } from '../application-module/reports/recruiterperformance-report/recruiterperformance-report.component';
import { InterviewCalendarReportComponent } from '../application-module/reports/interview-calendar-report/interview-calendar-report.component';
import { TravelReimbursementReportComponent } from '../application-module/reports/travel-reimbursement-report/travel-reimbursement-report.component';
import { CompanydoctorReportComponent } from '../application-module/reports/companydoctor-report/companydoctor-report.component';
import { ManageSignatureComponent } from '../application-module/master/manage-signature/manage-signature.component';
import { ViewapplicationformbComponent } from '../application-module/candidate/viewapplicationformb/viewapplicationformb.component';
import { CampusmycalenderdetailsComponent } from '../application-module/campus/campusmycalenderdetails/campusmycalenderdetails.component';
import { CampusinterviewassessmentComponent } from '../application-module/campus/campusinterviewassessment/campusinterviewassessment.component';
import { PcviewbatchassessmentsummarypendingComponent } from 'src/app/application-module/joining/programcordinator/pcviewbatchassessmentsummarypending/pcviewbatchassessmentsummarypending.component';
import { InterviewPanelReportComponent } from 'src/app/application-module/reports/interview-panel-report/interview-panel-report.component';
import { HiringmanagerReportComponent } from 'src/app/application-module/reports/hiringmanager-report/hiringmanager-report.component';
import { NoticeperiodReportComponent } from 'src/app/application-module/reports/noticeperiod-report/noticeperiod-report.component';
import { PcevaluateassessmentShowscoreComponent } from 'src/app/application-module/joining/programcordinator/pcevaluateassessment-showscore/pcevaluateassessment-showscore.component';
import { EditRegistrationFormComponent } from '../application-module/candidate/edit-registration-form/edit-registration-form.component';
import { CampusinterviewfeedbacklistComponent } from '../application-module/campus/campusinterviewfeedbacklist/campusinterviewfeedbacklist.component';
import { AddcampusinterviewfeedbackComponent } from '../application-module/campus/addcampusinterviewfeedback/addcampusinterviewfeedback.component';
import { CampusStagegetAssesmentComponent } from 'src/app/application-module/campus/campus-stageget-assesment/campus-stageget-assesment.component';
import { ViewRegistrationFormComponent } from '../application-module/candidate/view-registration-form/view-registration-form.component';
import { CampusTesttravelreimbursementComponent } from '../application-module/selection/candidate/campus-testtravelreimbursement/campus-testtravelreimbursement.component';
import { CampusAddtesttravelreimbursementComponentComponent } from '../application-module/selection/candidate/campus-addtesttravelreimbursement-component/campus-addtesttravelreimbursement-component.component';
import { CampusInterviewtravelreimbursementComponentComponent } from '../application-module/selection/candidate/campus-interviewtravelreimbursement-component/campus-interviewtravelreimbursement-component.component';
import { CampusAddInterviewtravelreimbursementComponentComponent } from '../application-module/selection/candidate/campus-add-interviewtravelreimbursement-component/campus-add-interviewtravelreimbursement-component.component';
import { HiringteamOnboardingcompletedReportComponent } from '../application-module/reports/hiringteam-onboardingcompleted-report/hiringteam-onboardingcompleted-report.component';
import { CampusInterviewReimbursementListComponent } from '../application-module/joining/candidate/campus-interview-reimbursement-list/campus-interview-reimbursement-list.component';
import { ViewInterviewTravelReimbursementComponent } from '../application-module/joining/candidate/view-interview-travel-reimbursement/view-interview-travel-reimbursement.component';
import { CampusTestReimbursementListComponentComponent } from '../application-module/joining/candidate/campus-test-reimbursement-list-component/campus-test-reimbursement-list-component.component';
import { ViewTestTravelReimbursementComponentComponent } from '../application-module/joining/candidate/view-test-travel-reimbursement-component/view-test-travel-reimbursement-component.component';
import { RmCampusMycalenderComponent } from 'src/app/application-module/campus/rm-campus-mycalender/rm-campus-mycalender.component';
import { RmViewcandidateMycalenderComponent } from 'src/app/application-module/campus/rm-viewcandidate-mycalender/rm-viewcandidate-mycalender.component';
import { RecruitmenttestreimbursementlistComponent } from '../application-module/joining/candidate/recruitmenttestreimbursementlist/recruitmenttestreimbursementlist.component';
import { RecruitmentinterviewreimbursementlistComponent } from '../application-module/joining/candidate/recruitmentinterviewreimbursementlist/recruitmentinterviewreimbursementlist.component';
import { CampusInterviewMasterComponent } from 'src/app/application-module/master/campus-interview-master/campus-interview-master.component';
import { ManageCampusVerticalFunctionComponent } from 'src/app/application-module/master/manage-campus-vertical-function/manage-campus-vertical-function.component';
import { CampusRequisitionLsitViewCandidatesComponent } from 'src/app/application-module/campus/campus-requisition-lsit-view-candidates/campus-requisition-lsit-view-candidates.component';
import { CampusCandidateSelectionAcknowledgementComponent } from 'src/app/application-module/joining/candidate/campus-candidate-selection-acknowledgement/campus-candidate-selection-acknowledgement.component';
import { CsmpusCandidateSalaryFitmentComponent } from 'src/app/application-module/campus/csmpus-candidate-salary-fitment/csmpus-candidate-salary-fitment.component';
import { UploadcampuscandidatedocumentComponent } from '../application-module/candidate/uploadcampuscandidatedocument/uploadcampuscandidatedocument.component';
import { CampusInterviewAssesmentListComponent } from 'src/app/application-module/campus/campus-interview-assesment-list/campus-interview-assesment-list.component';
import { CampusViewInterviewAssesmentComponent } from 'src/app/application-module/campus/campus-view-interview-assesment/campus-view-interview-assesment.component';
import { CampusSalaryAcceptanceComponent } from '../application-module/candidate/campus-salary-acceptance/campus-salary-acceptance.component';
import { CampusCandiateManagementApprovalGenerateComponent } from 'src/app/application-module/campus/campus-candiate-management-approval-generate/campus-candiate-management-approval-generate.component';
import { CampusCandidateManagementApporvalGenerateViewComponent } from 'src/app/application-module/campus/campus-candidate-management-apporval-generate-view/campus-candidate-management-apporval-generate-view.component';
import { CampusOfferAcceptanceComponent } from '../application-module/candidate/campus-offer-acceptance/campus-offer-acceptance.component';
import { CampusSendOfferLetterComponent } from '../application-module/offer/recruitmentmanager/campus-send-offer-letter/campus-send-offer-letter.component';
import { CampusCandidateManagementComponent } from '../application-module/campus/campus-candidate-management/campus-candidate-management.component';
import { OffCampusRequisitionComponent } from '../application-module/campus/off-campus-requisition/off-campus-requisition.component';
import { OffCampusrequisitionlistComponentComponent } from '../application-module/campus/off-campusrequisitionlist-component/off-campusrequisitionlist-component.component';
import { OffCampusRequisitionListComponent } from 'src/app/application-module/campus/off-campus-requisition-list/off-campus-requisition-list.component';
import { VendorcreditnoteraiseComponent } from '../application-module/vendor/vendorcreditnoteraise/vendorcreditnoteraise.component';
import { ProcessInvoiceComponent } from 'src/app/application-module/vendor/vendorpayments/process-invoice/process-invoice.component';
import { CampusDummyRequisitionListComponent } from '../application-module/campus/campus-dummy-requisition-list/campus-dummy-requisition-list.component';
import { DummyrequisitioncandidatelistComponent } from '../application-module/campus/dummyrequisitioncandidatelist/dummyrequisitioncandidatelist.component';
import { OffCampusTalentPoolComponent } from 'src/app/application-module/campus/off-campus-talent-pool/off-campus-talent-pool.component';
import { OffCampusSubmittedResultComponent } from 'src/app/application-module/campus/off-campus-submitted-result/off-campus-submitted-result.component';
import { OffCampusRequisitionLsitViewCandidatesComponent } from '../application-module/campus/off-campus-requisition-lsit-view-candidates/off-campus-requisition-lsit-view-candidates.component';
import { OffCampusInterviewReimbursementListComponentComponent } from '../application-module/joining/candidate/off-campus-interview-reimbursement-list-component/off-campus-interview-reimbursement-list-component.component';
import { OffCampusTestReimbursementListComponentComponent } from '../application-module/joining/candidate/off-campus-test-reimbursement-list-component/off-campus-test-reimbursement-list-component.component';
import { OffCampusTesttravelreimbursementComponent } from '../application-module/selection/candidate/off-campus-testtravelreimbursement/off-campus-testtravelreimbursement.component';
import { OffCampusInterviewtravelreimbursementComponentComponent } from '../application-module/selection/candidate/off-campus-interviewtravelreimbursement-component/off-campus-interviewtravelreimbursement-component.component';
import { ProcesscreditnoteComponent } from 'src/app/application-module/vendor/vendorpayments/processcreditnote/processcreditnote.component';
import { ProcessinvoiceforROComponent } from 'src/app/application-module/vendor/vendorpayments/processinvoicefor-ro/processinvoicefor-ro.component';
import { ProcessCreditnoteforROComponent } from 'src/app/application-module/vendor/vendorpayments/process-creditnotefor-ro/process-creditnotefor-ro.component';
import { OffCampusRequisionSalesAndMarketingComponent } from 'src/app/application-module/campus/off-campus-requision-sales-and-marketing/off-campus-requision-sales-and-marketing.component';
import { RecruitmentCostReportComponent } from '../application-module/reports/recruitment-cost-report/recruitment-cost-report.component';
import { InterviewfeedbackReportComponent } from '../application-module/reports/interviewfeedback-report/interviewfeedback-report.component';
import { NoticeperiodcostsavingreportComponent } from '../application-module/reports/noticeperiodcostsavingreport/noticeperiodcostsavingreport.component';
import { RecruitmentCostSavingReportComponent } from 'src/app/application-module/reports/recruitment-cost-saving-report/recruitment-cost-saving-report.component';
import { SalarystatisticsReportComponent } from '../application-module/reports/salarystatistics-report/salarystatistics-report.component';
import { NewjoinersrecruitmentactivityReportComponent } from '../application-module/reports/newjoinersrecruitmentactivity-report/newjoinersrecruitmentactivity-report.component';
import { NewjoinersexternalrecruitmentComponent } from '../application-module/reports/newjoinersexternalrecruitment/newjoinersexternalrecruitment.component';
import { HropsattritionReportComponent } from '../application-module/reports/hropsattrition-report/hropsattrition-report.component';
import { NewjoinersrecruitmentmodeReportComponent } from '../application-module/reports/newjoinersrecruitmentmode-report/newjoinersrecruitmentmode-report.component';
import { NewjoinersoverallverticalwiseReportComponent } from '../application-module/reports/newjoinersoverallverticalwise-report/newjoinersoverallverticalwise-report.component';
import { NewjoinersverticalwisepositionComponent } from '../application-module/reports/newjoinersverticalwiseposition/newjoinersverticalwiseposition.component';
import { SalesMarketingCampusReqListComponent } from 'src/app/application-module/campus/sales-marketing-campus-req-list/sales-marketing-campus-req-list.component';
import { SalesoffCampusrequisitionlistComponent } from '../application-module/campus/salesoff-campusrequisitionlist/salesoff-campusrequisitionlist.component';
import { CampusViewDocumentComponent } from '../application-module/campus/campus-view-document/campus-view-document.component';
import { ManageReportHeaderComponent } from '../application-module/reports/manage-report-header/manage-report-header.component';
import { FlexiReportComponent } from '../application-module/reports/flexi-report/flexi-report.component';
import { CvdropcandidateviewactionComponent } from 'src/app/application-module/preselection/recruitmentmanager/candidate/cvdropcandidateviewaction/cvdropcandidateviewaction.component';
import { FlexiReportCandidateWiseComponent } from 'src/app/application-module/reports/flexi-report-candidate-wise/flexi-report-candidate-wise.component';
import { CampusCandidateEditProfileComponent } from '../application-module/campus/campus-candidate-edit-profile/campus-candidate-edit-profile.component';
import { NewjoinerReportComponent } from '../application-module/reports/newjoiner-report/newjoiner-report.component';
import { NewjoinerbatchWiseCandidateComponent } from '../application-module/reports/newjoinerbatch-wise-candidate/newjoinerbatch-wise-candidate.component';
import { CandidateDocumentReportComponent } from '../application-module/reports/candidate-document-report/candidate-document-report.component';
import { OnboardingEmailStatusComponent } from '../application-module/master/onboarding-email-status/onboarding-email-status.component';
import { ReimbursementDetailsReportComponent } from '../application-module/reports/reimbursement-details-report/reimbursement-details-report.component';
import { HandholdingReportAllComponent } from '../application-module/reports/handholding-report-all/handholding-report-all.component';
import { InducfeedbacktDetailsReportComponent } from '../application-module/reports/inducfeedbackt-details-report/inducfeedbackt-details-report.component';
import { BatwisecabdidateFeedbakReportComponent } from '../application-module/reports/batwisecabdidate-feedbak-report/batwisecabdidate-feedbak-report.component';
import { CandidatewiseviewfeedbackComponent } from '../application-module/reports/candidatewiseviewfeedback/candidatewiseviewfeedback.component';
import { InductionProgramReportComponent } from '../application-module/reports/induction-program-report/induction-program-report.component';
import { ScheduleinductionbatchwiseComponent } from '../application-module/reports/scheduleinductionbatchwise/scheduleinductionbatchwise.component';
import { InductionReportBatchwiseViewcandidateComponent } from '../application-module/reports/induction-report-batchwise-viewcandidate/induction-report-batchwise-viewcandidate.component';


const routes: Routes = [
  {
    path: '',
    component: MasterlayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'home',
        component: DashboardComponent
      },
      //#region requisition
      //corporate requisition
      {
        path: 'corporate/requisition/new-request',
        component: RequisitioncorporateComponent
      },
      {
        path: 'corporate/requisition/hold-release',
        component: HoldreleasecorporateComponent
      },
      //plant requisition
      {
        path: 'plant/requisition/new-request',
        component: RequisitionplantComponent
      },
      {
        path: 'plant/requisition/hold-release',
        component: HoldreleaseplantComponent
      },
      //sales requisition
      {
        path: 'sales/requisition/new-request',
        component: RequisitionsalesComponent
      },
      {
        path: 'sales/requisition/hold-release',
        component: HoldreleasesalesComponent
      },
      //requisition list
      {
        path: 'my-action/requisition-list',
        component: RequesterrequisitionlistComponent
      },
      {
        path: 'my-action/resignation-list',
        component: RequesterresignationlistComponent
      },
      // Added Anif for view candidate
      // {
      //   path: 'requesterrequisitionlist/candidatelist',
      //   component: RmrequisitioncandidatelistComponent
      // },
      {
        path: 'requesterrequisitionlist/candidatelist',
        component: RequisitioncandidatelistComponent
      },
      //#endregion
      //#region resignation
      //resignation corporate
      {
        path: 'corporate/resignation/new-request',
        component: ResignationcorporateComponent
      },
      {
        path: 'corporate/resignation/hold-release',
        component: HoldreleaseresignationcorporateComponent
      },
      //resignation plant
      {
        path: 'plant/resignation/new-request',
        component: ResignationplantComponent
      },
      {
        path: 'plant/resignation/hold-release',
        component: HoldreleaseresignationplantComponent
      },
      //resignation sales
      {
        path: 'sales/resignation/new-request',
        component: ResignationsalesComponent
      },
      {
        path: 'sales/resignation/hold-release',
        component: HoldreleaseresignationsalesComponent
      },
      //#endregion
      //#region succession plan
      //succession plan corporate
      {
        path: 'corporate/succession-plan/new-request',
        component: SuccessioncorporateComponent
      },
      {
        path: 'corporate/succession-plan/hold-release',
        component: HoldreleasesuccessioncorporateComponent
      },
      //succession plan plant
      {
        path: 'plant/succession-plan/new-request',
        component: SuccessionplantComponent
      },
      {
        path: 'plant/succession-plan/hold-release',
        component: HoldreleasesuccessionplantComponent
      },
      //succession plan sales
      {
        path: 'sales/succession-plan/new-request',
        component: SuccessionsalesComponent
      },
      {
        path: 'sales/succession-plan/hold-release',
        component: HoldreleasesuccessionsalesComponent
      },
      //#endregion
      //#region transfer
      //transfer corporate
      {
        path: 'corporate/transfer/new-request',
        component: TransfercorporateComponent
      },
      {
        path: 'corporate/transfer/hold-release',
        component: HoldreleasetransfercorporateComponent
      },
      //transfer plant
      {
        path: 'plant/transfer/new-request',
        component: TransferplantComponent
      },
      {
        path: 'plant/transfer/hold-release',
        component: HoldreleasetransferplantComponent
      },
      //transfer sales
      {
        path: 'sales/transfer/new-request',
        component: TransfersalesComponent
      },
      {
        path: 'sales/transfer/hold-release',
        component: HoldreleasetransfersalesComponent
      },
      //#endregion
      //#region functional head
      {
        path: 'requisition/all-positions-pending',
        component: ApproverrequisitionlistComponent
      },
      {
        path: 'resignation/all-positions-pending',
        component: ApproverresignationlistComponent
      },
      {
        path: 'succession-plan/all-positions-pending',
        component: ApproversuccessionplanlistComponent
      },
      {
        path: 'transfer/all-positions-pending',
        component: ApprovertransferlistComponent
      },
      //#endregion
      //#region recruitment owner
      {
        path: 'requisition/all-positions',
        component: RorequisitionlistComponent
      },
      {
        path: 'resignation/all-positions',
        component: RoresignationlistComponent
      },
      {
        path: 'succession-plan/all-positions',
        component: RosuccessionplanlistComponent
      },
      {
        path: 'transfer/all-positions',
        component: RotransferlistComponent
      },
      {
        path: 'requisition/all-positions/allocate-to-rm',
        component: AllocatetormComponent
      },
      {
        path: 'callback/all-callback-request',
        component: RocandidatecallbackrequestlisComponent
      },

      //#endregion
      //#endregion
      //#region recruitment manager
      {
        path: 'my-action/all-positions',
        component: RmrequisitionlistComponent
      },
      {
        path: 'my-action/all-positions/allocate-to-source-channel',
        component: AllocatesourcechannelComponent
      },
      {
        path: 'my-action/all-positions/stop-source-channel',
        component: StopsourcechannelComponent
      },
      {
        path: 'my-action/all-positions/candidate-list',
        component: RmrequisitioncandidatelistComponent
      },
      {
        path: 'my-action/all-positions/candidate-list/candidate',
        component: RmrequisitioncandidateactionComponent
      },
      {
        path: 'my-action/all-positions/candidate-list/cvdropcandidate',
        component: CvdropcandidateactionComponent
      },
      {
        path: 'dropcvtag/candidate/viewaction',
        component: CvdropcandidateviewactionComponent
      },
      {
        path: 'my-action/all-positions/candidate-list/candidate-cmd-approval',
        component: CmdupdatecandidateComponent
      },
      {
        path: 'my-action/all-requisition/upload-naukri-profile',
        component: UploadnaukriprofileComponent
      },
      {
        path: 'my-action/all-requisition/requisition/add-candidate',
        component: HraddcandidateComponent
      },
      {
        path: 'my-action/all-requisition/requisition/submit-test-result',
        component: SubmittestresultComponent
      },
      {
        path: 'test-travel-reimbursement-list',
        component: RmtesttravelreimbursementlistComponent
      },
      {
        path: 'test-travel-reimbursement-list/view',
        component: ViewtesttravelreimbursementComponent
      },
      {
        path: 'travel-reimbursement-list',
        component: RmtravelreimbursementlistComponent
      },
      {
        path: 'view-interview-feedback',
        component: ViewcandidateinterviewfedbacklistComponent
      },
      {
        path: 'travel-reimbursement-list/view',
        component: ViewtravelreimbursementComponent
      },
      {
        path: 'interview-assessment/view',
        component: ViewinterviewassesmentComponent
      },
      {
        path: 'hr-interview-feedback/view',
        component: ViewhrfeedbackComponent
      },
      {
        path: 'candidate-application/view',
        component: ViewapplicationformComponent
      },
      {
        path: 'my-action/all-positions/candidate/view-documents',
        component: RmverifycandidatedocumnetsComponent
      },
      {
        path: 'my-action/candidate-management',
        component: CandidatemanagementComponent
      },
      {
        path: 'verifymedicaldocument',
        component: RmverifymedicaldocumentComponent
      },
      {
        path: 'my-action/all-positions/candidate/salary-fitment',
        component: RmcandidatesalaryfitmentComponent
      },
      {
        path: 'my-action/all-positions/candidate/management-approval',
        component: GeneratemanagementapprovalComponent
      },
      {
        path: 'my-action/all-positions/candidate/send-offer-letter',
        component: SendofferletterComponent
      },
      {
        path: 'corporate/employee-management',
        component: CorporateemployeemanagementComponent
      },
      {
        path: 'plant/employee-management',
        component: PlantemployeemanagementComponent
      },
      {
        path: 'sales/employee-management',
        component: SalesemployeemanagementComponent
      },
      {
        path: 'oc-noticeperiod-reimburshment-list',  // Slide no 37
        component: OcnoticeperiodreimbursementlistComponent
      },
      {
        path: 'oc-view-noticeperiod-reimburshment-list', // Slide no 
        component: OcviewnoticeperiodbuyoutdetailsComponent
      },
      //#endregion
      //#region Hiring Team
      {
        path: 'corporate/ht-candidate-list',
        component: HtcandidatelistComponent
      },
      {
        path: 'plant/ht-candidate-list',
        component: HtplantcandidatelistComponent
      },
      {
        path: 'sales/ht-candidate-list',
        component: HtsalescandidatelistComponent
      },
      {
        path: 'ht-relocation-reimbursement-list',  // Slide no 39
        component: HtrelocationreimbursementlistComponent
      },
      {
        path: 'ht-document-verification',
        component: HtdocumentverificationComponent
      },
      //#endregion
      //#region candidate
      {
        path: 'career/view-handbook',
        component: ViewhandbookComponent
      },
      {
        path: 'career/medical-reimbursement-list',
        component: MedicalreimbursementlistComponent
      },
      {
        path: 'career/medical-reimbursement-details',
        component: MedicalreimbursementdetailsComponent
      },
      {
        path: 'career/travel-reimbursement-list',
        component: CdtravelreimbursementlistComponent
      },
      {
        path: 'career/travel-reimbursement-details',
        component: CdtrabelreimbursementdetailsComponent
      },
      {
        path: 'career/notice-period-buyout-reimbursement-list',
        component: NoticperiodbuyoutreimbursementlistComponent
      },
      {
        path: 'career/notice-period-buyout-reimbursement-details',
        component: NoticeperiodbuyoutreimbursementdetailsComponent
      },
      {
        path: 'career/candidate-assessment-list',
        component: CandidateassessmentlistComponent
      },
      {
        path: 'career/take-assessment',
        component: CandidatetakeassessmentComponent
      },
      {
        path: 'career/feedback',
        component: InterviewfedbacklistComponent
      },
      {
        path: 'career/add-interview-feedback',
        component: AddinterviewfedbackComponent
      },
      {
        path: 'career/induction-feedback',
        component: CdinductionfeedbackComponent
      },
      {
        path: 'career/give-feedback',
        component: GiveinductionfeedbackComponent
      },
      {
        path: 'career/view-feedback',
        component: ViewinductionfeedbackComponent
      },
      //#endregion
      //#region Hiring team
      {
        path: 'corporate/induction-assessment-list',
        component: PccorporateassessmentlistComponent
      },
      {
        path: 'plant/induction-assessment-list',
        component: PcplantassessmentlistComponent
      },
      {
        path: 'sales/induction-assessment-list',
        component: PcsalesassessmentlistComponent
      },
      {
        path: 'pc-view-candidate',
        component: PcviewcandidatelistComponent
      },
      {
        path: 'corporate/evaluate-assessment-list',
        component: EvaluateassessmentlistComponent
      },
      {
        path: 'evaluate-assessment',
        component: PcevaluateassessmentComponent
      },
      {
        path: 'upload-assessment-evaluation',
        component: PcuploadassessmentevaluationComponent
      },
      {
        path: 'view-assessment',
        component: PcviewassessmentComponent
      },
      {
        path: 'view-batch-assessment-summary',
        component: PcviewbatchassessmentsummaryComponent
      },
      {
        path: 'view-candidate-assessment-summary',
        component: PcviewcandidateassessmentsummaryComponent
      },
      {
        path: 'view-induction-feedback',
        component: PcviewinductionfeedbackComponent
      },

      //#endregion
      //#region hiring manager
      {
        path: 'corporate/all-requisition',
        component: CorporatehiringmanagerrequisitionlistComponent
      },
      {
        path: 'plant/all-requisition',
        component: PlanthiringmanagerrequisitionlistComponent
      },
      {
        path: 'sales/all-requisition',
        component: SaleshiringmanagerrequisitionlistComponent
      },
      {
        path: 'my-action/all-requisition/candidate-list',
        component: HiringmanagercandidatelistComponent
      },
      {
        path: 'my-action/all-requisition/candidate-list/candidate',
        component: HiringmanagercandidateactionComponent
      },
      //#endregion
      //#region employee jobs
      {
        path: 'current-jobs/apply',
        component: ApplycurrentjobsComponent
      },
      {
        path: 'current-jobs/apply/add-candidate',
        component: ApplyaddcandidateComponent
      },
      {
        path: 'create-profile',
        component: ApplyaddcandidateComponent
      },
      {
        path: 'current-jobs/refer',
        component: RefercurrentjobsComponent
      },
      {
        path: 'current-jobs/refer/add-candidate',
        component: ReferaddcandidateComponent
      },
      {
        path: 'dropcv',
        component: DropcvComponent
      },
      {
        path: 'dropcvtag',
        component: CvDropTagComponent
      }, {
        path: 'candidatedropcvtag',
        component: CandidateCvdropTagComponent
      },
      {
        path: 'admin/country',
        component: ManageCountryComponent
      },
      {
        path: 'admin/nationality',
        component: ManageNationalityComponent
      },
      {
        path: 'admin/relationship',
        component: ManageRelationshipComponent
      },
      //#endregion
      //#region vendor
      {
        path: 'vendor/current-jobs',
        component: CurrentjobComponent
      },
      {
        path: 'vendor/archived-jobs',
        component: ArchivedjobComponent
      },
      {
        path: 'vendor/job/add-candidate',
        component: VendoraddcandidateComponent
      },
      {
        path: 'vendor/job/candidate-list',
        component: VendorcandidatelistComponent
      },
      {
        path: 'vendor/job/candidate-list/candidate',
        component: VendorviewcandidateComponent
      },
      {
        path: 'vendor/raise-invoice',
        component: VendorjoinedcandidateComponent
      },
      {
        path: 'invoice-list',
        component: VendorinvoicelistComponent
      },
      //#endregion
      //#region external candidate
      {
        path: 'career/current-jobs',
        component: ExternalcurrentjobsComponent
      },
      {
        path: 'career/update-profile',
        component: ExternaladdcandidateComponent
      },
      {
        path: 'career/application-form-a',
        component: CreateapplicationformaComponent
      },
      {
        path: 'career/application-form-b',
        component: CreateapplicationformbComponent
      },
      {
        path: 'career/test-travel-reimbursement',
        component: TesttravelreimbursementComponent
      },
      {
        path: 'career/add-test-travel-reimbursement',
        component: AddtesttravelreimbursementComponent
      },
      {
        path: 'career/travel-reimbursement',
        component: TravelreimbursementlistComponent
      },
      {
        path: 'career/add-travel-reimbursement',
        component: AddtravelreimbursementComponent
      },
      {
        path: 'requisition/all-positions/candidate-list',
        component: RequisitioncandidatelistComponent
      },
      {
        path: 'requisition/all-positions/candidate-list/candidate',
        component: RequisitioncandidateviewComponent
      },
      {
        path: 'my-files/upload-document',
        component: UploadcandidatedocumentComponent
      },
      {
        path: 'my-files/upload-medical-document',
        component: UploadmedicaldocumentComponent
      },
      {
        path: 'career/salary-acceptance',
        component: SalaryacceptanceComponent
      },
      {
        path: 'career/offer-acceptance',
        component: OfferacceptanceComponent
      },
      {
        path: 'career/fill-joining-form',
        component: CandidatejoiningformComponent
      },
      {
        path: 'career/upload-joining-documents',
        component: UploadjoiningformComponent
      },
      {
        path: 'career/joining-acknowledgement',
        component: WelcomeacknowledgementComponent
      },
      {
        path: 'career/induction-schedule',
        component: CandidateinductionplanComponent
      },
      //#endregion
      //#region interview panel
      {
        path: 'my-calendar',
        component: PanelistcalendarComponent
      },
      {
        path: 'my-calendar/interview-assessment',
        component: AddinterviewassessmentComponent
      },
      {
        path: 'my-calendar/view-candidate',
        component: CandidateviewComponent
      },
      //#endregion
      //#region master
      {
        path: 'admin/job-type',
        component: ManagejobtypeComponent
      },
      {
        path: 'admin/qualification',
        component: ManagequalificationComponent
      },
      {
        path: 'admin/course',
        component: ManagecourseComponent
      },
      {
        path: 'admin/qualification-course',
        component: QualificationcoursemappingComponent
      },
      {
        path: 'admin/qualification-course-stream',
        component: QualificationcoursestreammappingComponent
      },
      {
        path: 'admin/stream',
        component: ManagestreamComponent
      },
      {
        path: 'admin/industry',
        component: ManageindustryComponent
      },
      {
        path: 'admin/language',
        component: ManagelanguageComponent
      },
      {
        path: 'admin/function',
        component: ManagefunctionComponent
      },
      {
        path: 'admin/domain',
        component: ManagedomainComponent
      },
      {
        path: 'admin/department',
        component: ManagedepartmentComponent
      },
      {
        path: 'admin/grade',
        component: ManagegradeComponent
      },
      {
        path: 'admin/selection',
        component: ManageselectionComponent
      },
      {
        path: 'admin/occupation',
        component: ManageoccupationComponent
      },
      {
        path: 'admin/university',
        component: ManageuniversityComponent
      },
      {
        path: 'admin/religion',
        component: ManagereligionComponent
      },
      {
        path: 'admin/caste',
        component: ManagecasteComponent
      },
      {
        path: 'admin/job-description',
        component: ManagejobdescriptionComponent
      },
      {
        path: 'admin/menu-access',
        component: MenuAccessComponent
      },
      {
        path: 'admin/user-role',
        component: UserRoleComponent
      },
      {
        path: 'admin/doc-particular',
        component: ManageDocparticularComponent
      },
      {
        path: 'admin/doc-name',
        component: ManageDocnameComponent
      },
      {
        path: 'admin/doc-type',
        component: ManageDoctypeComponent
      },
      {
        path: 'admin/salary-account-head',
        component: SalaryaccountheadComponent
      },
      {
        path: 'admin/salary-template',
        component: SalarytemplateComponent
      },
      {
        path: 'admin/position',
        component: ManagepositionComponent
      },
      {
        path: 'admin/grade-position',
        component: ManageGradepositionComponent
      },
      {
        path: 'admin/dept-head',
        component: ManageDeptheadComponent
      },
      {
        path: 'admin/verticalrm',
        component: ManageVerticalrmComponent
      },
      {
        path: 'admin/interview-panel',
        component: ManageInterviewpanelComponent
      },
      {
        path: 'admin/mail-sending-form',
        component: MailSendingFormComponent
      },
      {
        path: 'admin/manage-vendor',
        component: ManageVendorComponent
      },
      {
        path: 'induction-assessment',
        component: InductionassessmentComponent
      },
      {
        path: 'create-induction-assessment',
        component: CreateAssessmentComponent
      },
      {
        path: 'induction-feedback',
        component: InductionFeedbackComponent
      },
      {
        path: 'admin/feedback',
        component: FeedbackComponent
      },
      {
        path: 'admin/manage-location',
        component: ManagelocationComponent
      },
      {
        path: 'admin/location-function',
        component: ManagelocationfunctionComponent
      },

      //#endregion master
      //#region doctor
      {
        path: 'doctor/candidatelist',
        component: CandidatelistComponent
      },
      {
        //path: 'doctor/verify-candidate',
        path: 'verifycandidate',
        component: VerifycandidateComponent
      },

      //#endregion

      //#region onboarding manager
      {
        path: 'corporate/candidate-allocation-list',
        component: CorporateallocationComponent
      },
      {
        path: 'plant/candidate-allocation-list',
        component: PlantallocationlistComponent
      },
      {
        path: 'sales/candidate-allocation-list',
        component: SalesandmarketingallocationlistComponent
      },
      {
        path: 'corporate/joiner-list',
        component: CorporatejoinerslistComponent
      },
      {
        path: 'plant/joiner-list',
        component: OmplantjoinerslistComponent
      },
      {
        path: 'sales/joiner-list',
        component: OmsalesandmarketingjoinerslistComponent
      },
      {
        path: 'rm-joining-check-list',
        component: RmjoiningchecklistComponent
      },
      {
        path: 'oc-medical-reimbursement-list',
        component: OccandidatemedicalreimbursementlistComponent
      },
      {
        path: 'oc-view-medical-reimbursement-details',
        component: OcviewmedicalreimbursementdetailsComponent
      },
      {
        path: 'oc-travel-reimbursement-list',
        component: OccandidatetravelreimbursementlistComponent
      },
      {
        path: 'oc-view-travel-reimbursement-details',
        component: OcviewtravelreimbursementdetailsComponent
      },
      {

        path: 'onboardingmanagement',

        component: OhcandidatelistComponent

      },

      {

        path: 'oh-view-document',

        component: OhviewdocumentComponent

      },

      {

        path: 'oh-view-candidate',

        component: OhviewcandidatelistComponent

      },
      {
        path: 'om-view-document',
        component: OmviewdocumentComponent
      },
      //#endregion

      //region onboarding coordinator
      {
        path: 'corporate/new-joiner-list',
        component: OccorporatejoinerslistComponent
      },
      {
        path: 'plant/new-joiner-list',
        component: OcplantjoinerslistComponent
      },
      {
        path: 'sales/new-joiner-list',
        component: OcsalesandmarketingjoinerslistComponent
      },
      {
        path: 'editaccommodation',
        component: EditaccommodationComponent
      },
      {
        path: 'scheduleinduction',
        component: ScheduleinductionComponent
      },
      {
        path: 'scheduleaccommodation',
        component: ScheduleaccommodationComponent
      },
      {
        path: 'viewcandidatedetails',
        component: ViewcandidatelistComponent
      },
      {
        path: 'ocjoiningchecklist',
        component: OcjoiningchecklistComponent
      },
      {
        path: 'ocverifydocument',
        component: OcverifydocumentComponent
      },
      {
        path: 'oc-view-document',
        component: OcviewdocumentComponent
      },
      {
        path: 'oc-reassign-candiadte',
        component: OcreassigncandidateComponent
      },
      //endregion
      //region trainer incharge
      {
        path: 'manage-accomodation',
        component: AccommodationlistComponent
      },
      {
        path: 'fill-accommodation',
        component: FillaccommodationComponent
      },
      {
        path: 'view-schedule-details',
        component: ViewscheduledetailsComponent
      },
      {
        path: 'view-accommodation-details',
        component: ViewaccommodationdetailsComponent
      },
      //endregion
      //#region - report - start
      {
        path: 'admin/rpt-requisition',
        component: RequisitionReportComponent
      },
      {
        path: 'admin/rpt-resignation',
        component: ResignationReportComponent
      },
      {
        path: 'admin/rpt-successplan',
        component: SuccessplanReportComponent
      },
      {
        path: 'admin/rpt-transfer',
        component: TransferReportComponent
      },
      {
        path: 'admin/rpt-candidate',
        component: CandidateReportComponent
      },
      {
        path: 'admin/rpt-rm-requisition',
        component: RmRequisitionReportComponent
      },
      {
        path: 'admin/rpt-referred-candidate',
        component: ReferredCandidateReportComponent
      },
      {

        path: 'admin/induction-template',

        component: ManageTemplateComponent

      },
      {
        path: 'admin/rpt-sourcewise',
        component: SourceWiseReportComponent
      },
      // {
      //   path: 'admin/rpt-sourcechannel-monthwise',
      //   component: SourcechannelMonthwiseReportComponent
      // },
      {
        path: 'admin/rpt-flexi',
        component: FlexiReportComponent
      },
      {
        path: 'admin/rpt-candidate-flexi',
        component: FlexiReportCandidateWiseComponent
      },

      {
        path: 'plantallocationlist',
        component: PlantallocationlistComponent
      },

      {
        path: 'corporateallocationlist',
        component: CorporateallocationComponent
      },

      {
        path: 'salesandmarketingallocationlist',
        component: SalesandmarketingallocationlistComponent
      },
      //#region - report - end

      //#region - campus admin - start
      {
        path: 'admin/campus-course',
        component: ManagecampuscourseComponent
      },
      {
        path: 'admin/campus-stream',
        component: ManagecampusstreamComponent
      },
      {
        path: 'admin/campus-course-stream',
        component: ManagecampuscoursestreamComponent
      },
      {
        path: 'admin/campus-year',
        component: ManagecampusyearComponent
      },
      {
        path: 'admin/upload-employee-master',
        component: UploademployeemasterComponent
      },
      {
        path: 'admin/campus-college',
        component: ManagecampuscollegeComponent
      },
      {
        path: 'admin/manage-doctor',
        component: ManagedoctorComponent
      },
      {
        path: 'admin/vertical-position',
        component: ManageverticalpositionComponent
      },
      {
        path: 'admin/function-position',
        component: ManageFunctionPositionComponent
      },
      {
        path: 'admin/manage-modeof-joining',
        component: ManageModeOfJoiningComponent
      },
      {
        path: 'admin/manage-induction-venue',
        component: ManageInductionVenueComponent
      },
      {
        path: 'admin/manage-reporting-venue',
        component: ManageReportingVenueComponent
      },
      {
        path: 'admin/manage-induction-mode',
        component: ManageInductionModeComponent
      },
      {
        path: 'admin/manage-location-wise-training-in-charge',
        component: ManagelocationwisetraininginchargeComponent
      },
      {
        path: 'admin/manage-state',
        component: ManageStateComponent
      },
      {
        path: 'admin/manage-selection-guide',
        component: ManageSelectionGuideComponent
      },
      {
        path: 'admin/manage-email-template',
        component: ManageEmailTemplateComponent
      },
      {
        path: 'admin/manage-hm-function',
        component: ManageHmFunctionComponent
      },
      {
        path: 'admin/interviewpanlemember-mapping',
        component: IntrerviewPanelMemberMappingComponent
      },
      //#endregion

      //#region - campus modele - start
      {
        path: 'campus/requisition',
        component: CampusrequisitionComponent
      },
      {
        path: 'campus/requisition-list',
        component: CampusrequisitionlistComponent
      },
      {
        path: 'campus/requsition-link',
        component: CampusrequisitionlinkComponent
      },
      {
        path: 'campus/campus-updateprofile',
        component: CampusCandidateEditProfileComponent
      },
      {
        path: 'talent-pool/candidate-detail',
        component: CampuscandidateprofileComponent
      },
      //#endregion
      //allreports
      {
        path: 'report/requisition',
        component: RequisitionreportComponent
      },
      {
        path: 'report/resignation',
        component: ResignationreportComponent
      },
      {
        path: 'report/transfer',
        component: TransferreportComponent
      },
      {
        path: 'report/successionplan',
        component: SuccessionplanreportComponent
      },
      {
        path: 'report/offeredcandidate',
        component: OfferedcandidatereportComponent
      },
      {
        path: 'report/requisitionhistory',
        component: FunctionalheadrequisitionreportComponent
      },
      {
        path: 'report/leadtime',
        component: LeadtimereportComponent
      },
      {
        path: 'report/sourcechannel',
        component: SourcewisereportComponent
      },
      {
        path: 'report/referredcandidate',
        component: ReferredcandidatereportComponent
      },
      {
        path: 'report/candidatetracker',
        component: CandidatetrackerreportComponent
      },
      {
        path: 'report/employeesalary',
        component: EmployeesalaryreportComponent
      },
      {
        path: 'report/relative',
        component: RelativeCandidatereportComponent
      },
      {
        path: 'report/bgvstatus',
        component: BGVStatusreportComponent
      },
      {
        path: 'report/organisedinterview',
        component: IntervieworganisedreportComponent
      },
      {
        path: 'report/preemploymentmedical',
        component: PreemploymentmedicaldreportComponent
      },
      //Kuntal
      {
        path: 'admin/rpt-rqst-functionalhead-requisition',
        component: RqstFunctionalheadRequisitionReportComponent
      },
      {
        path: 'admin/rpt-rqst-functionalhead-offer-candidate-report',
        component: RqstFunctionalheadOfferCandidateReportComponent
      },
      {
        path: 'admin/rpt-functionalhead-attrition-report',
        component: FunctionalheadAttritionReportComponent
      },
      {
        path: 'admin/rpt-vendorcandidate-report',
        component: VendorcandidateReportComponent
      },
      {
        path: 'admin/rpt-relocation-report',
        component: RelocationReportComponent
      },
      {
        path: 'admin/rpt-relocation-report',
        component: RelocationReportComponent
      },
      {
        path: 'admin/rpt-recruitment-manager-requisition-report',
        component: RecruitmentManagerRequisitionReportComponent
      },
      // piu
      {
        path: 'admin/rpt-hropsresignation-report',
        component: HropsresignationReportComponent
      },
      {
        path: 'admin/rpt-documentstatus-report',
        component: DocumentstatusReportComponent
      },
      {
        path: 'admin/salarytypenew',
        component: ManagesalarytypeComponent
      },
      {
        path: 'admin/subdomain',
        component: ManageSubdomainComponent
      },
      {
        path: 'rm-dashboard',
        component: RmDashboardComponent
      },
      //////handholding
      {
        path: 'handholding/plant-candidate-list',
        component: HandholdingallocationplantcandidatelistComponent
      },
      {
        path: 'handholding/corporate-candidate-list',
        component: HandholdingallocationcandidatelistComponent
      },
      {
        path: 'handholding/sales-candidate-list',
        component: HandholdingallocationsalescandidatelistComponent
      },
      {
        path: 'aic/job-shadowing-review-list',
        component: AicjobshadowreviewcandidatelistComponent
      },
      {
        path: 'aic/listen-review-list',
        component: AiclistenreviewcandidatelistComponent
      },
      {
        path: 'aic/half-yearly-review-list',
        component: AichalfyearlyreviewcandidatelistComponent
      },
      {
        path: 'aic/confirmation-review-list',
        component: AicconfirmreviewcandidatelistComponent
      },
      {
        path: 'candidate/job-shadow-review',
        component: FormjobshadowreviewComponent
      },
      {
        path: 'aic/candidate/listen-review',
        component: FormlistenreviewComponent
      },
      {
        path: 'aic/candidate/half-yearly-review',
        component: FormhalfyearlyreviewComponent
      },
      {
        path: 'aic/candidate/confirmation-review',
        component: FormconfirmationreviewComponent
      },
      {
        path: 'hr/candidate/hr-feedback',
        component: FormhrfeedbackComponent
      },
      {
        path: 'hr/candidate/hr-review',
        component: FormhrreviewComponent
      },
      {
        path: 'corporate/job-shadow-review-list',
        component: JobshadowreviewlistComponent
      },
      {
        path: 'corporate/listen-review-list',
        component: ListenreviewlistComponent
      },
      {
        path: 'corporate/half-yearly-review-list',
        component: HalfyearlyreviewlistComponent
      },
      {
        path: 'corporate/confirmation-review-list',
        component: ConfirmationreviewlistComponent
      },
      {
        path: 'plant/job-shadow-review-list',
        component: PlantjobshadowreviewlistComponent
      },
      {
        path: 'plant/listen-review-list',
        component: PlantlistenreviewlistComponent
      },
      {
        path: 'plant/half-yearly-review-list',
        component: PlanthalfyearlyreviewlistComponent
      },
      {
        path: 'plant/confirmation-review-list',
        component: PlantconfirmationreviewlistComponent
      },
      {
        path: 'sales/job-shadow-review-list',
        component: SalesjobshadowreviewlistComponent
      },
      {
        path: 'sales/listen-review-list',
        component: SaleslistenreviewlistComponent
      },
      {
        path: 'sales/half-yearly-review-list',
        component: SaleshalfyearlyreviewlistComponent
      },
      {
        path: 'sales/confirmation-review-list',
        component: SalesconfirmationreviewlistComponent
      },
      {
        path: 'candidate/half-yearly-review-approval',
        component: HalfyearlyreviewapprovalComponent
      },
      {
        path: 'candidate/confirmation-review-approval',
        component: ConfirmationreviewapprovalComponent
      },
      {
        path: 'candidate/listen-review-approval',
        component: ListenreviewapprovalComponent
      },
      {
        path: 'candidate/job-shadow-review-approval',
        component: JobshadowreviewapprovalComponent
      },
      {
        path: 'candidate/hand-holding-document',
        component: HandholdingdocumentComponent
      },
      //campus
      {
        path: 'talent-pool',
        component: CampustalentpoolComponent
      },
      {
        path: 'campus/submit-test-result',
        component: CampussubmittestresultComponent
      },

      {
        path: 'admin/edms-access',
        component: ManageEdmsAccessComponent
      },

      {
        path: 'admin/gradewise-docmap-list',
        component: GardewiseDocmapListComponent
      },

      {
        path: 'admin/gradewise-docmap-details/:mapId/:verticalId/:functionId/:gradeId',
        component: GradewiseDocmapDetailsComponent
      },

      {
        path: 'admin/add-edit-gradewise-docmap/:mapId/:isEdit',
        component: AddeditGradewiseDocmapComponent
      },
      {

        path: 'admin/manage-requestor-verticalmap',
        component: ManageRequestorVerticalmapComponent
      },
      {

        path: 'admin/corporate-resignation-list',
        component: CorporateResignationListComponent
      },
      {

        path: 'admin/plant-resignation-list',
        component: PlantResignationListComponent
      },
      {
        path: 'admin/sales-resignation-list',
        component: SalesResignationListComponent
      },
      {

        path: 'admin/external-trainers',

        component: ExternalTrainersComponent

      },
      {

        path: 'admin/external-induction-venue',

        component: ExternalInductionVenueComponent

      },
      {

        path: 'admin/induction-template-details/:templateid',

        component: InductionTemplateDetailsComponent

      },
      {
        path: 'admin/manage-interviewvenue',
        component: ManageInterviewvenueComponent
      },
      {
        path: 'admin/pdfMaster',
        component: ManagePDFMasterComponent
      },
      {
        path: 'admin/inductive-salary',
        component: InductiveSalaryComponent
      },
      {
        path: 'admin/RolewiseUserverticalfunctionmapComponent',
        component: RolewiseUserverticalfunctionmapComponent
      },
      {
        path: 'campus/salesandmarketing',
        component: SalesandmarketingComponent
      },
      {
        path: 'ht-relocation-reimbursement-details-view',
        component: HtrelocationreimbursementdetailsComponent
      },
      {
        path: 'campus/mycalendar',
        component: PanalMemberMyCalendarComponent
      },
      {
        path: 'campus/hrhand-holding',
        component: HRHandHoldingComponent
      },
      {
        path: 'campus/hr-review',
        component: CampushrreviewComponent
      },
      {
        path: 'campus/corporate-review',
        component: CampusCorporateReviewComponent
      },
      {
        path: 'campus/salesandmarketing-review',
        component: CampusSalesandMarketingReviewComponent
      },
      {
        path: 'admin/country-state-location',
        component: CountryStateLocationMappingComponent
      },
      {
        path: 'campus/corporate-hr-hand-holding',
        component: CorporateHrHandHoldingComponent
      },
      {
        path: 'campus/salesandmarketing-hr-hand-holding',
        component: SalesandmarketingHrHandHoldingComponent
      },
      {
        path: 'ht-joiningchecklist',
        component: HtjoiningchecklistComponentComponent
      },
      {
        path: 'admin/manage-testvenue',
        component: ManageTestVenueComponentComponent
      },
      {
        path: 'admin/rpt-sapanddigitalvariance',
        component: SapAndDigitalVarianceComponent
      },
      {
        path: 'admin/rpt-vacancy',
        component: VacancyReportComponent
      },
      {
        path: 'admin/rpt-candidate-attrition',
        component: CandidateAttritionReportComponent
      },
      {
        path: 'admin/rpt-conspayment-tracker',
        component: ConsPaymentTrackerReportComponent
      },
      {
        path: 'admin/rpt-preemployeement',
        component: PreemployeementReportComponent
      },
      {
        path: 'admin/rpt-consultantlist',
        component: ConsultantlistReportComponent
      },
      {
        path: 'admin/HandHoldingAccess',
        component: HandHoldingAccessComponent
      },
      {
        path: 'admin/rpt-recruitment-funnel',
        component: RecruitmentmentFunnelReportComponent
      },
      {
        path: 'admin/RoleWiseDocumentAccess',
        component: RoleWiseDocumentAccessComponent
      },
      {
        path: 'admin/Training-Tittle',
        component: ManageTrainingTittleComponent
      },
      {
        path: 'handholding/plant-approval-list',
        component: HandholdingapprovalplantcandidatelistComponent
      },
      {
        path: 'handholding/corporate-approval-list',
        component: HandholdingapprovalcorporatecandidatelistComponent
      },
      {
        path: 'handholding/sales-approval-list',
        component: HandholdingapprovalsalescandidatelistComponent
      },
      {
        path: 'handholding/confirmationform-view',
        component: HandholdingConfirmationformViewComponent
      },
      {
        path: 'admin/costCenterMapping',
        component: CostCenterMapWithSubAreaVerticalFucLocStateComponent
      },
      {
        path: 'scheduleaccommodationbatch',
        component: ScheduleaccommodationbatchComponent
      },
      {
        path: 'my-action/all-positions/candidate/management-approvalview',
        component: GeneratemanagementapprovalviewComponent
      },
      {
        path: 'view-accommodation-details-batch',
        component: ViewaccommodationdetailsbatchComponent
      },
      {
        path: 'editaccommodation-batch',
        component: EditaccommodationbatchComponent
      },
      {
        path: 'corporate/new-joiner-list/candidateaction',
        component: OcrequsitioncandidateactionComponent
      },
      {
        path: 'feedback-status-list',
        component: FeedbackStatusListComponent
      },
      {
        path: 'candidate-evaluate-assessment-list',
        component: CandidateEvaluateassessmentlistComponentComponent
      },
      {
        path: 'MRF-PPF',
        component: MRFPPFComponent
      },
      {
        path: 'admin/familyRelationship',
        component: ManageFamilyRelationShipComponent
      },
      {
        path: 'hr/HandHoldingAccess',
        component: HrHandHoldingAccessComponent
      },
      {
        path: 'oc-reassign-individualcandiadte',
        component: OcreassignindividualcandidateComponentComponent
      },
      {
        path: 'corporate/oc-reassign-candidatelist',
        component: OccorporatediscontinuedcandidatelistComponent
      },
      {
        path: 'plant/oc-reassign-candidatelist',
        component: OcplantdiscontinuedcandidatelistComponent
      },
      {
        path: 'sales/oc-reassign-candidatelist',
        component: OcsalesdiscontinuedcandidatelistComponent
      },
      {
        path: 'admin/rpt-consultantperformation',
        component: ConsultantPerformanceReportComponent
      },
      {
        path: 'admin/rpt-recruiterperformance',
        component: RecruiterperformanceReportComponent
      },
      {
        path: 'admin/rpt-interviewcalendar',
        component: InterviewCalendarReportComponent
      },
      {
        path: 'admin/rpt-travelreimbursement',
        component: TravelReimbursementReportComponent
      },
      {
        path: 'admin/rpt-companydoctorreport',
        component: CompanydoctorReportComponent
      },
      {
        path: 'admin/signature',
        component: ManageSignatureComponent
      },
      {
        path: 'candidate-applicationformb/view',
        component: ViewapplicationformbComponent
      },
      {
        path: 'my-campuscalendar/interview-assessment',
        component: CampusinterviewassessmentComponent
      },

      {
        path: 'campus/campusmycalendar',
        component: CampusmycalenderdetailsComponent
      },
      {
        path: 'view-batch-assessment-summary-pending',
        component: PcviewbatchassessmentsummarypendingComponent
      },
      {
        path: 'admin/rpt-interviewpanel',
        component: InterviewPanelReportComponent
      },
      {
        path: 'admin/rpt-hiringmanager',
        component: HiringmanagerReportComponent
      }, {
        path: 'admin/rpt-noticeperiod',
        component: NoticeperiodReportComponent
      },
      {
        path: 'evaluate-assessment-showscore',
        component: PcevaluateassessmentShowscoreComponent
      },
      {
        path: 'edit-campus-registration',
        component: EditRegistrationFormComponent
      },
      {
        path: 'career/campusinterviewfeedback',
        component: CampusinterviewfeedbacklistComponent
      },

      {
        path: 'career/add-campus-interview-feedback',
        component: AddcampusinterviewfeedbackComponent
      },
      {
        path: 'campus/stage-get-assesment',
        component: CampusStagegetAssesmentComponent
      },
      {
        path: 'view-campus-registration',
        component: ViewRegistrationFormComponent
      },
      {
        path: 'career/campus-test-travel-reimbursement',
        component: CampusTesttravelreimbursementComponent
      },
      {
        path: 'career/campus-add-test-travel-reimbursement',
        component: CampusAddtesttravelreimbursementComponentComponent
      },
      {
        path: 'career/campus-interview-travel-reimbursement',
        component: CampusInterviewtravelreimbursementComponentComponent
      },
      {
        path: 'career/campus-add-interview-travel-reimbursement',
        component: CampusAddInterviewtravelreimbursementComponentComponent
      },
      {
        path: 'report/htonboardingcompleted-report',
        component: HiringteamOnboardingcompletedReportComponent
      },
      {
        path: 'interview-reimbursement',
        component: CampusInterviewReimbursementListComponent
      },
      {
        path: 'interview-reimbursement/view',
        component: ViewInterviewTravelReimbursementComponent
      },
      {
        path: 'test-reimbursement',
        component: CampusTestReimbursementListComponentComponent
      },
      {
        path: 'test-reimbursement/view',
        component: ViewTestTravelReimbursementComponentComponent
      },
      {
        path: 'campus/rm-mycalender',
        component: RmCampusMycalenderComponent
      },
      {
        path: 'campus/rm-mycalender-view-candidate',
        component: RmViewcandidateMycalenderComponent
      },
      {
        path: 'recruitment-test-reimbursement',
        component: RecruitmenttestreimbursementlistComponent
      },

      {
        path: 'recruitment-interview-reimbursement',
        component: RecruitmentinterviewreimbursementlistComponent
      },
      {
        path: 'admin/campus-interview-master',
        component: CampusInterviewMasterComponent
      },
      {
        path: 'admin/Campus-function',
        component: ManageCampusVerticalFunctionComponent
      },
      {
        path: 'campus/requisition-list/view-candidate',
        component: CampusRequisitionLsitViewCandidatesComponent
      },
      {
        path: 'career/campus-selection-acknowledge',
        component: CampusCandidateSelectionAcknowledgementComponent
      },
      {
        path: 'my-action/all-positions/campus-candidate/salary-fitment',
        component: CsmpusCandidateSalaryFitmentComponent
      },
      {
        path: 'my-files/campus-upload-document',
        component: UploadcampuscandidatedocumentComponent
      },
      {
        path: 'campus/interview-assessment/view',
        component: CampusViewInterviewAssesmentComponent
      },

      {
        path: 'campus/interview-assesment-list',
        component: CampusInterviewAssesmentListComponent
      },
      {
        path: 'career/campus-salary-acceptance',
        component: CampusSalaryAcceptanceComponent
      },
      {
        path: 'campus/candidate/management-approval',
        component: CampusCandiateManagementApprovalGenerateComponent
      },
      {
        path: 'campus/candidate/management-approval-view',
        component: CampusCandidateManagementApporvalGenerateViewComponent
      },
      {
        path: 'career/campus-offer-acceptance',
        component: CampusOfferAcceptanceComponent
      },
      {
        path: 'my-action/all-positions/candidate/campus-send-offer-letter',
        component: CampusSendOfferLetterComponent
      },
      {
        path: 'my-action/campus-candidate-management',
        component: CampusCandidateManagementComponent
      },
      {
        path: 'offcampus/requisition',
        component: OffCampusRequisitionComponent
      },
      {
        path: 'offcampus/requisition-list',
        component: OffCampusrequisitionlistComponentComponent
      },
      {
        path: 'off-campus/requsition-link',
        component: OffCampusRequisitionListComponent
      },
      {
        path: 'vendor/raise-creditnote',
        component: VendorcreditnoteraiseComponent
      },
      {
        path: 'vendorpayments/processinvoice',
        component: ProcessInvoiceComponent
      },
      {
        path: 'campus/dummyrequisitionlist',
        component: CampusDummyRequisitionListComponent
      },
      {
        path: 'campus/dummyrequisition-candidatelist',
        component: DummyrequisitioncandidatelistComponent
      },
      {
        path: 'off-campus-talent-pool',
        component: OffCampusTalentPoolComponent
      },
      {
        path: 'off-campus/submit-test-result',
        component: OffCampusSubmittedResultComponent
      },
      {
        path: 'offcampus/requisition-list/view-candidate',
        component: OffCampusRequisitionLsitViewCandidatesComponent
      },
      {
        path: 'offcampus-test-reimbursement',
        component: OffCampusTestReimbursementListComponentComponent
      },
      {
        path: 'offcampus-interview-reimbursement',
        component: OffCampusInterviewReimbursementListComponentComponent
      },
      {
        path: 'career/offcampus-interview-travel-reimbursement',
        component: OffCampusInterviewtravelreimbursementComponentComponent
      },
      {
        path: 'career/offcampus-test-travel-reimbursement',
        component: OffCampusTesttravelreimbursementComponent
      },
      {
        path: 'vendorpayments/processcreditnote',
        component: ProcesscreditnoteComponent
      },
      {
        path: 'vendorpayments/processinvoiceforro',
        component: ProcessinvoiceforROComponent
      },
      {
        path: 'vendorpayments/processcreditnoteforro',
        component: ProcessCreditnoteforROComponent
      },
      {
        path: 'offcampus/sales-and-marketing-requisition',
        component: OffCampusRequisionSalesAndMarketingComponent
      },
      {
        path: 'admin/rpt-recruitmentcost',
        component: RecruitmentCostReportComponent
      },
      {
        path: 'admin/rpt-interview-feedback-report',
        component: InterviewfeedbackReportComponent
      },
      {
        path: 'admin/rpt-noticeperiodcostsavingreport',
        component: NoticeperiodcostsavingreportComponent
      },
      {
        path: 'mrfreport/rpt-recruitmentcostsaving',
        component: RecruitmentCostSavingReportComponent
      },
      {
        path: 'admin/rpt-salary-statistics-report',//Piu
        component: SalarystatisticsReportComponent
      },
      {
        path: 'admin/rpt-newjoiners-recuitmentactivity-report',//Piu
        component: NewjoinersrecruitmentactivityReportComponent
      },
      {
        path: 'admin/rpt-newjoiners-externalrecruitment-report',//Piu
        component: NewjoinersexternalrecruitmentComponent
      },
      {
        path: 'report/hropsattrition',
        component: HropsattritionReportComponent
      },
      {
        path: 'admin/rpt-NewJoiners-RecruitmentMode-report',
        component: NewjoinersrecruitmentmodeReportComponent
      },
      {
        path: 'admin/rpt-NewJoiners-OverallVerticalWise-report',
        component: NewjoinersoverallverticalwiseReportComponent
      },
      {
        path: 'report/newjoinersverticalwisepositionComponent',
        component: NewjoinersverticalwisepositionComponent
      },
      {
        path: 'report/managereportheader',
        component: ManageReportHeaderComponent
      },
      {
        path: 'campus/sales-requisition-list',
        component: SalesMarketingCampusReqListComponent
      },
      {
        path: 'sales&markettingoffcampus/requisition-list',
        component: SalesoffCampusrequisitionlistComponent
      },
      {
        path: 'CampusViewDocumentComponent',
        component: CampusViewDocumentComponent
      },
      {
        path: 'report/newjoinerreport',
        component: NewjoinerReportComponent
      },
      {
        path: 'report/newjoinerreportbatchwisecandidate',
        component: NewjoinerbatchWiseCandidateComponent
      },
      //ankita
      {
        path: 'report/candidatedocumentreport',
        component: CandidateDocumentReportComponent
      },
      {
        path: 'admin/candidatewelcomeemailstatus',
        component: OnboardingEmailStatusComponent
      },
      {
        path: 'report/inductionProgramReportComponent',
        component: InductionProgramReportComponent
      },
      //
      {
        path: 'scheduleinductionbatchwise',
        component: ScheduleinductionbatchwiseComponent
      },
      {
        path: 'report/inductionreportbatchwiseviewcandidate',
        component: InductionReportBatchwiseViewcandidateComponent
      },
      {
        path: 'report/reimbursementdetailsreport',
        component: ReimbursementDetailsReportComponent
      },
      {
        path: 'report/rpt-handholding',
        component: HandholdingReportAllComponent
      },
      {
        path: 'report/inducfeedbacktDetailsReportComponent',
        component: InducfeedbacktDetailsReportComponent
      },
      {
        path: 'report/candidatewiseviewfeedbackComponent',
        component: CandidatewiseviewfeedbackComponent
      },
      {
        path: 'report/batwisecabdidateFeedbakReportComponent',
        component: BatwisecabdidateFeedbakReportComponent
      }
  

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
