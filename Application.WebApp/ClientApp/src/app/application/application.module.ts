import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';

import { TwoDigitDecimaNumberNegativeDirective } from '../directives/twodecimalnumericnumbers';
import { TwoDigitDecimaNumberLessThanHundredDirective } from '../directives/rangewithinghundred';
import { TwoDigitDecimaNumberDirective } from '../directives/numericdecimal';
import { NumberDirective } from '../directives/numberonly';
import { NumberOnlyDirective } from '../directives/positivenumber';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule, ɵs } from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { TreeviewModule } from 'ngx-treeview';

import { NavMenuComponent } from '../nav-menu/nav-menu.component'
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
import { MailSendingFormComponent } from '../application-module/master/mail-sending-form/mail-sending-form.component';
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
import { JobdescriptionComponent } from '../application-module/master/jobdescription/jobdescription.component';
import { VendorcandidateComponent } from '../application-module/vendor/vendorcandidate/vendorcandidate.component';
import { PdfapplicationformComponent } from '../application-module/shared/pdfapplicationform/pdfapplicationform.component';
import { PdfmanagementapprovalComponent } from '../application-module/shared/pdfmanagementapproval/pdfmanagementapproval.component';
//import { CampusregistrationComponent } from '../commonpages/campusregistration/campusregistration.component';
import { PdfinterviewassessmentComponent } from '../application-module/shared/pdfinterviewassessment/pdfinterviewassessment.component';
import { PdffamilydetailsformComponent } from '../application-module/shared/pdffamilydetailsform/pdffamilydetailsform.component';
import { PdfsebiinitialdisclosureformComponent } from '../application-module/shared/pdfsebiinitialdisclosureform/pdfsebiinitialdisclosureform.component';
import { PdfjoiningreportformComponent } from '../application-module/shared/pdfjoiningreportform/pdfjoiningreportform.component';
import { PdfpersonalaccidentinsuranceformComponent } from '../application-module/shared/pdfpersonalaccidentinsuranceform/pdfpersonalaccidentinsuranceform.component';
import { PdfaccommodationComponent } from '../application-module/shared/pdfaccommodation/pdfaccommodation.component';
import { PdfinductiondetailsComponent } from '../application-module/shared/pdfinductiondetails/pdfinductiondetails.component';
import { PdfmedicalreimbursementComponent } from '../application-module/shared/pdfmedicalreimbursement/pdfmedicalreimbursement.component';
import { PdftravelreimbursementComponent } from '../application-module/shared/pdftravelreimbursement/pdftravelreimbursement.component';
import { PdfinductionfeedbackComponent } from '../application-module/shared/pdfinductionfeedback/pdfinductionfeedback.component';
import { PdfinterviewtravelreimbursementComponent } from '../application-module/shared/pdfinterviewtravelreimbursement/pdfinterviewtravelreimbursement.component';
import { PdfsalaryfitmentComponent } from '../application-module/shared/pdfsalaryfitment/pdfsalaryfitment.component';
import { PdftesttravelreimbursementComponent } from '../application-module/shared/pdftesttravelreimbursement/pdftesttravelreimbursement.component';
import { PdfsalaryfitmentsinglepageComponent } from '../application-module/shared/pdfsalaryfitmentsinglepage/pdfsalaryfitmentsinglepage.component';
import { FamilydetailsformpdfgenerationComponent } from '../application-module/shared/familydetailsformpdfgeneration/familydetailsformpdfgeneration.component';
import { CampusPdfInterviewAssesmentComponent } from '../application-module/shared/campus-pdf-interview-assesment/campus-pdf-interview-assesment.component';
import { InterviewassessmentpdfgenerationComponent } from '../application-module/shared/interviewassessmentpdfgeneration/interviewassessmentpdfgeneration.component';
import { JoiningreportpdfgenerationComponent } from '../application-module/shared/joiningreportpdfgeneration/joiningreportpdfgeneration.component';
import { PdfConfirmationFileComponent } from '../application-module/shared/pdf-confirmation-file/pdf-confirmation-file.component';
import { PdfUploadMedicalDocumentComponent } from '../application-module/shared/pdf-upload-medical-document/pdf-upload-medical-document.component';
import { PdfallhandholdingformsComponent } from '../application-module/shared/pdfallhandholdingforms/pdfallhandholdingforms.component';
import { PdfallhandholdingformsforzipComponent } from '../application-module/shared/pdfallhandholdingformsforzip/pdfallhandholdingformsforzip.component';
import { PdffeedbackComponent } from '../application-module/shared/pdffeedback/pdffeedback.component';
import { PdfhandholdingconfirmationformComponent } from '../application-module/shared/pdfhandholdingconfirmationform/pdfhandholdingconfirmationform.component';
import { PdfmedicalreimbursementForzipComponent } from '../application-module/shared/pdfmedicalreimbursement-forzip/pdfmedicalreimbursement-forzip.component';
import { PdfnoticeperiodbuyoutforzipComponent } from '../application-module/shared/pdfnoticeperiodbuyoutforzip/pdfnoticeperiodbuyoutforzip.component';
import { PdfnoticeperiodbuyoutreimComponent } from '../application-module/shared/pdfnoticeperiodbuyoutreim/pdfnoticeperiodbuyoutreim.component';
import { PdfstagegetassesmentComponent } from '../application-module/shared/pdfstagegetassesment/pdfstagegetassesment.component';
import { PdftravelreimbursementForzipComponent } from '../application-module/shared/pdftravelreimbursement-forzip/pdftravelreimbursement-forzip.component';
import { PersonalaccidentpdfgenerationComponent } from '../application-module/shared/personalaccidentpdfgeneration/personalaccidentpdfgeneration.component';
import { SebidisclosurepdfgenerationComponent } from '../application-module/shared/sebidisclosurepdfgeneration/sebidisclosurepdfgeneration.component';
import { NumberToWordsPipe } from '../layouts/masterlayout/number-to-words.pipe';
import { Title } from '@angular/platform-browser';
import { PersistanceService } from '../sharedservices/persitence.service';
import { ShareddataService } from '../sharedservices/shareddata.service';
import { AuthguardserviceService } from '../auth/authguardservice.service';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CampusCandidateEditProfileComponent } from '../application-module/campus/campus-candidate-edit-profile/campus-candidate-edit-profile.component';
import { NewjoinerReportComponent } from '../application-module/reports/newjoiner-report/newjoiner-report.component';
import { NewjoinerbatchWiseCandidateComponent } from '../application-module/reports/newjoinerbatch-wise-candidate/newjoinerbatch-wise-candidate.component';
import { CandidateDocumentReportComponent } from '../application-module/reports/candidate-document-report/candidate-document-report.component';
import { OnboardingEmailStatusComponent } from '../application-module/master/onboarding-email-status/onboarding-email-status.component';
import { InductionProgramReportComponent } from '../application-module/reports/induction-program-report/induction-program-report.component';
import { ScheduleinductionbatchwiseComponent } from '../application-module/reports/scheduleinductionbatchwise/scheduleinductionbatchwise.component';
import { InductionReportBatchwiseViewcandidateComponent } from '../application-module/reports/induction-report-batchwise-viewcandidate/induction-report-batchwise-viewcandidate.component';
import { ReimbursementDetailsReportComponent } from '../application-module/reports/reimbursement-details-report/reimbursement-details-report.component';
import { HandholdingReportAllComponent } from '../application-module/reports/handholding-report-all/handholding-report-all.component';
import { BatwisecabdidateFeedbakReportComponent } from '../application-module/reports/batwisecabdidate-feedbak-report/batwisecabdidate-feedbak-report.component';
import { CandidatewiseviewfeedbackComponent } from '../application-module/reports/candidatewiseviewfeedback/candidatewiseviewfeedback.component';
import { InducfeedbacktDetailsReportComponent } from '../application-module/reports/inducfeedbackt-details-report/inducfeedbackt-details-report.component';


@NgModule({
  declarations: [
    TwoDigitDecimaNumberLessThanHundredDirective,
    TwoDigitDecimaNumberDirective,
    FlexiReportCandidateWiseComponent,
    TwoDigitDecimaNumberNegativeDirective,
    NumberOnlyDirective,
    NumberDirective,
    MasterlayoutComponent,
    NavMenuComponent,
    DashboardComponent,
    RequisitionplantComponent,
    RequisitioncorporateComponent,
    RequisitionsalesComponent,
    ApproverrequisitionlistComponent,
    RorequisitionlistComponent,
    RmrequisitionlistComponent,
    AllocatetormComponent,
    JobdescriptionComponent,
    AllocatesourcechannelComponent,
    CurrentjobComponent,
    VendorcandidateComponent,
    VendoraddcandidateComponent,
    VendorcandidatelistComponent,
    VendorviewcandidateComponent,
    RmrequisitioncandidatelistComponent,
    RmrequisitioncandidateactionComponent,
    CvdropcandidateactionComponent,
    RequesterrequisitionlistComponent,
    HraddcandidateComponent,
    ReferaddcandidateComponent,
    RefercurrentjobsComponent,
    ApplycurrentjobsComponent,
    HoldreleasecorporateComponent,
    ResignationcorporateComponent,
    ResignationplantComponent,
    ResignationsalesComponent,
    SuccessioncorporateComponent,
    SuccessionplantComponent,
    SuccessionsalesComponent,
    TransfercorporateComponent,
    TransferplantComponent,
    TransfersalesComponent,
    ExternaladdcandidateComponent,
    ExternalcurrentjobsComponent,
    RoresignationlistComponent,
    RosuccessionplanlistComponent,
    RotransferlistComponent,
    ApplyaddcandidateComponent,
    CorporatehiringmanagerrequisitionlistComponent,
    PlanthiringmanagerrequisitionlistComponent,
    SaleshiringmanagerrequisitionlistComponent,
    HiringmanagercandidatelistComponent,
    HiringmanagercandidateactionComponent,
    CmdupdatecandidateComponent,
    ApproverresignationlistComponent,
    ApprovertransferlistComponent,
    ApproversuccessionplanlistComponent,
    HoldreleaseresignationcorporateComponent,
    HoldreleaseresignationplantComponent,
    HoldreleaseresignationsalesComponent,
    HoldreleasetransfersalesComponent,
    HoldreleasetransfercorporateComponent,
    HoldreleasetransferplantComponent,
    HoldreleasesuccessionplantComponent,
    HoldreleasesuccessioncorporateComponent,
    HoldreleasesuccessionsalesComponent,
    HoldreleaseplantComponent,
    HoldreleasesalesComponent,
    StopsourcechannelComponent,
    UploadnaukriprofileComponent,
    RequesterresignationlistComponent,
    ArchivedjobComponent,
    DropcvComponent,
    CvDropTagComponent,
    CandidateCvdropTagComponent,
    SubmittestresultComponent,
    RequisitioncandidatelistComponent,
    RequisitioncandidateviewComponent,
    PanelistcalendarComponent,
    AddinterviewassessmentComponent,
    TravelreimbursementlistComponent,
    AddtravelreimbursementComponent,
    RmtravelreimbursementlistComponent,
    ViewtravelreimbursementComponent,
    CandidateviewComponent,
    CreateapplicationformaComponent,
    CreateapplicationformbComponent,
    ViewinterviewassesmentComponent,
    ViewapplicationformComponent,
    UploadcandidatedocumentComponent,
    ManageindustryComponent,
    ManagecourseComponent,
    ManagequalificationComponent,
    ManagejobtypeComponent,
    ManagestreamComponent,
    ManagelanguageComponent,
    ManagefunctionComponent,
    ManagedomainComponent,
    ManagedepartmentComponent,
    ManagegradeComponent,
    ManageselectionComponent,
    ManageoccupationComponent,
    ManageuniversityComponent,
    ManagereligionComponent,
    ManagecasteComponent,
    QualificationcoursemappingComponent,
    QualificationcoursestreammappingComponent,
    ManagejobdescriptionComponent,
    MenuAccessComponent,
    UserRoleComponent,
    ManageDocnameComponent,
    ManageDocparticularComponent,
    ManageDoctypeComponent,
    //UploadmedicaldocumentComponent,
    //CandidatemanagementComponent,
    //CandidatelistComponent,
    //VerifycandidateComponent,
    //RmverifycandidatedocumnetsComponent,
    UploadmedicaldocumentComponent,
    CandidatemanagementComponent,
    CandidatelistComponent,
    VerifycandidateComponent,
    PlantallocationlistComponent,
    CorporateallocationComponent,
    SalesandmarketingallocationlistComponent,
    CorporatejoinerslistComponent,
    OmplantjoinerslistComponent,
    OmsalesandmarketingjoinerslistComponent,
    RmjoiningchecklistComponent,
    //JoinerslistComponent,
    ViewcandidatelistComponent,
    ScheduleinductionComponent,
    ScheduleaccommodationComponent,
    AccommodationlistComponent,
    RmverifycandidatedocumnetsComponent,
    FillaccommodationComponent,
    ViewscheduledetailsComponent,
    ViewaccommodationdetailsComponent,
    RmverifymedicaldocumentComponent,
    EditaccommodationComponent,
    WelcomeacknowledgementComponent,
    CandidateinductionplanComponent,
    CandidatejoiningformComponent,
    UploadjoiningformComponent,
    CandidatejoiningchecklistComponent,
    SalaryaccountheadComponent,
    SalarytemplateComponent,
    RmcandidatesalaryfitmentComponent,
    ManagepositionComponent,
    ManageDeptheadComponent,
    ManageGradepositionComponent,
    ManageVerticalrmComponent,
    ManageInterviewpanelComponent,
    MailSendingFormComponent,
    SalaryacceptanceComponent,
    GeneratemanagementapprovalComponent,
    SendofferletterComponent,
    OfferacceptanceComponent,
    ViewhrfeedbackComponent,
    PdfapplicationformComponent,
    PdfmanagementapprovalComponent,
    OccorporatejoinerslistComponent,
    OcplantjoinerslistComponent,
    OcsalesandmarketingjoinerslistComponent,
    OcverifydocumentComponent,
    OcjoiningchecklistComponent,
    RequisitionReportComponent,
    ResignationReportComponent,
    SuccessplanReportComponent,
    TransferReportComponent,
    CandidateReportComponent,
    RmRequisitionReportComponent,
    ReferredCandidateReportComponent,
    SourceWiseReportComponent,
    // SourcechannelMonthwiseReportComponent,
    ManagecampuscourseComponent,
    ManagecampusstreamComponent,
    ManagecampuscoursestreamComponent,
    ManagecampusyearComponent,
    ManagecampuscollegeComponent,
    CampusrequisitionComponent,
    CampusrequisitionlistComponent,
    CampusrequisitionlinkComponent,
    //CampusregistrationComponent,
    HtcandidatelistComponent,
    HtplantcandidatelistComponent,
    HtsalescandidatelistComponent,
    ViewhandbookComponent,
    CorporateemployeemanagementComponent,
    PlantemployeemanagementComponent,
    SalesemployeemanagementComponent,
    MedicalreimbursementlistComponent,
    MedicalreimbursementdetailsComponent,
    CdtravelreimbursementlistComponent,
    CdtrabelreimbursementdetailsComponent,
    NoticperiodbuyoutreimbursementlistComponent,
    NoticeperiodbuyoutreimbursementdetailsComponent,
    OccandidatemedicalreimbursementlistComponent,
    OcviewmedicalreimbursementdetailsComponent,
    OccandidatetravelreimbursementlistComponent,
    OcviewtravelreimbursementdetailsComponent,
    OcnoticeperiodreimbursementlistComponent,
    OcviewnoticeperiodbuyoutdetailsComponent,
    HtrelocationreimbursementlistComponent,
    HtdocumentverificationComponent,
    InductionassessmentComponent,
    CreateAssessmentComponent,
    PccorporateassessmentlistComponent,
    PcplantassessmentlistComponent,
    PcsalesassessmentlistComponent,
    PcviewcandidatelistComponent,
    CandidateassessmentlistComponent,
    CandidatetakeassessmentComponent,
    EvaluateassessmentlistComponent,
    PcevaluateassessmentComponent,
    PcuploadassessmentevaluationComponent,
    PcviewassessmentComponent,
    PcviewbatchassessmentsummaryComponent,
    PcviewcandidateassessmentsummaryComponent,
    InductionFeedbackComponent,
    FeedbackComponent,
    AddtesttravelreimbursementComponent,
    TesttravelreimbursementComponent,
    RmtesttravelreimbursementlistComponent,
    ViewtesttravelreimbursementComponent,
    AddinterviewfedbackComponent,
    InterviewfedbacklistComponent,
    ViewcandidateinterviewfedbacklistComponent,
    OcviewdocumentComponent,
    ManagelocationComponent,
    ManagelocationfunctionComponent,
    OmviewdocumentComponent,
    RequisitionreportComponent,
    ResignationreportComponent,
    TransferreportComponent,
    SuccessionplanreportComponent,
    OfferedcandidatereportComponent,
    FunctionalheadrequisitionreportComponent,
    LeadtimereportComponent,
    SourcewisereportComponent,
    ReferredcandidatereportComponent,
    CandidatetrackerreportComponent,
    EmployeesalaryreportComponent,
    RelativeCandidatereportComponent,
    BGVStatusreportComponent,
    IntervieworganisedreportComponent,
    PreemploymentmedicaldreportComponent,
    RmDashboardComponent,
    PdfinterviewassessmentComponent,
    OhcandidatelistComponent,
    OhviewdocumentComponent,
    OhviewcandidatelistComponent,
    ManageTemplateComponent,
    PdffamilydetailsformComponent,
    PdfpersonalaccidentinsuranceformComponent,
    PdfsebiinitialdisclosureformComponent,
    PdfjoiningreportformComponent,
    PdfaccommodationComponent,
    PdfinductiondetailsComponent,
    PdfmedicalreimbursementComponent,
    PdftravelreimbursementComponent,
    CdinductionfeedbackComponent,
    GiveinductionfeedbackComponent,
    ViewinductionfeedbackComponent,
    PcviewinductionfeedbackComponent,
    OcreassigncandidateComponent,
    PdfinductionfeedbackComponent,
    UploademployeemasterComponent,
    HandholdingallocationcandidatelistComponent,
    HandholdingallocationplantcandidatelistComponent,
    HandholdingallocationsalescandidatelistComponent,
    AicjobshadowreviewcandidatelistComponent,
    AiclistenreviewcandidatelistComponent,
    AichalfyearlyreviewcandidatelistComponent,
    AicconfirmreviewcandidatelistComponent,
    FormjobshadowreviewComponent,
    ManagedoctorComponent,
    ManageverticalpositionComponent,
    ManageModeOfJoiningComponent,
    ManageInductionVenueComponent,
    ManageReportingVenueComponent,
    ManageInductionModeComponent,
    ManagelocationwisetraininginchargeComponent,
    ManageStateComponent,
    ManageSelectionGuideComponent,
    ManageVendorComponent,
    CampustalentpoolComponent,
    CampussubmittestresultComponent,
    FormlistenreviewComponent,
    FormhalfyearlyreviewComponent,
    FormconfirmationreviewComponent,
    FormhrfeedbackComponent,
    FormhrreviewComponent,
    JobshadowreviewlistComponent,
    ListenreviewlistComponent,
    HalfyearlyreviewlistComponent,
    ConfirmationreviewlistComponent,
    PlantconfirmationreviewlistComponent,
    PlanthalfyearlyreviewlistComponent,
    PlantlistenreviewlistComponent,
    PlantjobshadowreviewlistComponent,
    SalesjobshadowreviewlistComponent,
    SaleslistenreviewlistComponent,
    SaleshalfyearlyreviewlistComponent,
    SalesconfirmationreviewlistComponent,
    JobshadowreviewapprovalComponent,
    ListenreviewapprovalComponent,
    HalfyearlyreviewapprovalComponent,
    ConfirmationreviewapprovalComponent,
    HandholdingdocumentComponent,
    CampuscandidateprofileComponent,
    RqstFunctionalheadRequisitionReportComponent,
    RqstFunctionalheadOfferCandidateReportComponent,
    FunctionalheadAttritionReportComponent,
    VendorcandidateReportComponent,
    RelocationReportComponent,
    RecruitmentManagerRequisitionReportComponent,
    HropsresignationReportComponent,
    DocumentstatusReportComponent,
    ManagesalarytypeComponent,
    ManageSubdomainComponent,
    ManageEmailTemplateComponent,
    VendorjoinedcandidateComponent,
    VendorinvoicelistComponent,
    ManageFunctionPositionComponent,
    ManageHmFunctionComponent,
    IntrerviewPanelMemberMappingComponent,
    PdfinterviewtravelreimbursementComponent,
    PdfsalaryfitmentComponent,
    PdftesttravelreimbursementComponent,
    PdfsalaryfitmentsinglepageComponent,
    ManageEdmsAccessComponent,
    GardewiseDocmapListComponent,
    GradewiseDocmapDetailsComponent,
    AddeditGradewiseDocmapComponent,
    ManageRequestorVerticalmapComponent,
    CorporateResignationListComponent,
    PlantResignationListComponent,
    SalesResignationListComponent,
    ExternalTrainersComponent,
    ExternalInductionVenueComponent,
    ManageCountryComponent,
    ManageNationalityComponent,
    ManageRelationshipComponent,
    InductionTemplateDetailsComponent,
    ManageInterviewvenueComponent,
    InductiveSalaryComponent,
    ManagePDFMasterComponent,
    RolewiseUserverticalfunctionmapComponent,
    RocandidatecallbackrequestlisComponent,
    SalesandmarketingComponent,
    HtrelocationreimbursementdetailsComponent,
    PanalMemberMyCalendarComponent,
    HRHandHoldingComponent,
    CampushrreviewComponent,
    CampusCorporateReviewComponent,
    CampusSalesandMarketingReviewComponent,
    CountryStateLocationMappingComponent,
    CorporateHrHandHoldingComponent,
    SalesandmarketingHrHandHoldingComponent,
    HtjoiningchecklistComponentComponent,
    ManageTestVenueComponentComponent,
    SapAndDigitalVarianceComponent,
    VacancyReportComponent,
    CandidateAttritionReportComponent,
    ConsPaymentTrackerReportComponent,
    PreemployeementReportComponent,
    ConsultantlistReportComponent,
    FamilydetailsformpdfgenerationComponent,
    PersonalaccidentpdfgenerationComponent,
    SebidisclosurepdfgenerationComponent,
    JoiningreportpdfgenerationComponent,
    PdfUploadMedicalDocumentComponent,
    HandHoldingAccessComponent,
    RecruitmentmentFunnelReportComponent,
    RoleWiseDocumentAccessComponent,
    PdfmedicalreimbursementForzipComponent,
    PdftravelreimbursementForzipComponent,
    ManageTrainingTittleComponent,
    HandholdingapprovalplantcandidatelistComponent,
    HandholdingapprovalcorporatecandidatelistComponent,
    HandholdingapprovalsalescandidatelistComponent,
    PdfnoticeperiodbuyoutforzipComponent,
    PdfnoticeperiodbuyoutreimComponent,
    HandholdingConfirmationformViewComponent,
    PdfallhandholdingformsComponent,
    PdffeedbackComponent,
    PdfallhandholdingformsforzipComponent,
    CostCenterMapWithSubAreaVerticalFucLocStateComponent,
    ScheduleaccommodationbatchComponent,
    GeneratemanagementapprovalviewComponent,
    ViewaccommodationdetailsbatchComponent,
    EditaccommodationbatchComponent,
    OcrequsitioncandidateactionComponent,
    FeedbackStatusListComponent,
    CandidateEvaluateassessmentlistComponentComponent,
    MRFPPFComponent,
    ManageFamilyRelationShipComponent,
    NumberToWordsPipe,
    HrHandHoldingAccessComponent,
    OcreassignindividualcandidateComponentComponent,
    OccorporatediscontinuedcandidatelistComponent,
    OcplantdiscontinuedcandidatelistComponent,
    OcsalesdiscontinuedcandidatelistComponent,
    PdfhandholdingconfirmationformComponent,
    PdfConfirmationFileComponent,
    ConsultantPerformanceReportComponent,
    RecruiterperformanceReportComponent,
    InterviewCalendarReportComponent,
    TravelReimbursementReportComponent,
    CompanydoctorReportComponent,
    ManageSignatureComponent,
    ViewapplicationformbComponent,
    CampusmycalenderdetailsComponent,
    CampusinterviewassessmentComponent,
    PcviewbatchassessmentsummarypendingComponent,
    InterviewPanelReportComponent,
    HiringmanagerReportComponent,
    NoticeperiodReportComponent,
    PcevaluateassessmentShowscoreComponent,
    EditRegistrationFormComponent,
    CampusinterviewfeedbacklistComponent,
    AddcampusinterviewfeedbackComponent,
    CampusStagegetAssesmentComponent,
    PdfstagegetassesmentComponent,
    ViewRegistrationFormComponent,
    CampusTesttravelreimbursementComponent,
    CampusAddtesttravelreimbursementComponentComponent,
    CampusInterviewtravelreimbursementComponentComponent,
    CampusAddInterviewtravelreimbursementComponentComponent,
    HiringteamOnboardingcompletedReportComponent,
    CampusInterviewReimbursementListComponent,
    ViewInterviewTravelReimbursementComponent,
    CampusTestReimbursementListComponentComponent,
    ViewTestTravelReimbursementComponentComponent,
    RmCampusMycalenderComponent,
    RmViewcandidateMycalenderComponent,
    RecruitmenttestreimbursementlistComponent,
    RecruitmentinterviewreimbursementlistComponent,
    CampusInterviewMasterComponent,
    ManageCampusVerticalFunctionComponent,
    CampusRequisitionLsitViewCandidatesComponent,
    CampusCandidateSelectionAcknowledgementComponent,
    InterviewassessmentpdfgenerationComponent,
    CsmpusCandidateSalaryFitmentComponent,
    UploadcampuscandidatedocumentComponent,
    CampusInterviewAssesmentListComponent,
    CampusViewInterviewAssesmentComponent,
    CampusSalaryAcceptanceComponent,
    CampusCandiateManagementApprovalGenerateComponent,
    CampusCandidateManagementApporvalGenerateViewComponent,
    CampusOfferAcceptanceComponent,
    CampusSendOfferLetterComponent,
    CampusPdfInterviewAssesmentComponent,
    CampusCandidateManagementComponent,
    OffCampusRequisitionComponent,
    OffCampusrequisitionlistComponentComponent,

    OffCampusRequisitionListComponent,
    VendorcreditnoteraiseComponent,
    ProcessInvoiceComponent,
    CampusDummyRequisitionListComponent,
    DummyrequisitioncandidatelistComponent,
    OffCampusTalentPoolComponent,
    OffCampusSubmittedResultComponent,
    OffCampusRequisitionLsitViewCandidatesComponent,
    OffCampusInterviewReimbursementListComponentComponent,
    OffCampusTestReimbursementListComponentComponent,
    OffCampusTesttravelreimbursementComponent,
    OffCampusInterviewtravelreimbursementComponentComponent,
    ProcesscreditnoteComponent,
    ProcessinvoiceforROComponent,
    ProcessCreditnoteforROComponent,
    OffCampusRequisionSalesAndMarketingComponent,
    RecruitmentCostReportComponent,
    InterviewfeedbackReportComponent,
    NoticeperiodcostsavingreportComponent,
    RecruitmentCostSavingReportComponent,
    SalarystatisticsReportComponent,
    NewjoinersrecruitmentactivityReportComponent,
    NewjoinersexternalrecruitmentComponent,
    HropsattritionReportComponent,
    NewjoinersrecruitmentmodeReportComponent,
    NewjoinersoverallverticalwiseReportComponent,
    NewjoinersverticalwisepositionComponent,
    SalesMarketingCampusReqListComponent,
    SalesoffCampusrequisitionlistComponent,
    CampusViewDocumentComponent,
    ManageReportHeaderComponent,
    FlexiReportComponent,
    CvdropcandidateviewactionComponent,
    CampusCandidateEditProfileComponent,
    NewjoinerReportComponent,
    NewjoinerbatchWiseCandidateComponent,
    CandidateDocumentReportComponent,
    OnboardingEmailStatusComponent,
    // InductionProgramReportComponent,
    // ScheduleinductionbatchwiseComponent,
    // InductionReportBatchwiseViewcandidateComponent,
    ReimbursementDetailsReportComponent,
    HandholdingReportAllComponent,
    InductionProgramReportComponent,
    ScheduleinductionbatchwiseComponent,
    InductionReportBatchwiseViewcandidateComponent,
    
    InducfeedbacktDetailsReportComponent,
    CandidatewiseviewfeedbackComponent,
    BatwisecabdidateFeedbakReportComponent

  ],
  imports: [
    TreeviewModule.forRoot(),
    CommonModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    CKEditorModule,
    ApplicationRoutingModule
  ],
  providers: [
    AuthenticationGuard,
    NgSelectConfig,
    ɵs,
    AuthguardserviceService,
    ShareddataService,
    PersistanceService,
    Title
  ],
})
export class ApplicationModule { }
