using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.OfferModule;
using Application.DataAccess.Repositories.CommonModule;
using Application.DataAccess.Repositories.EmployeeModule;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.DataAccess.Repositories.Interfaces.EmployeeModule;
using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.DataAccess.Repositories.Interfaces.VendorModule;
using Application.DataAccess.Repositories.PreselectionModule;
using Application.DataAccess.Repositories.CandidateModule;
using Application.DataAccess.Repositories.Interfaces.CandidateModule;
using Application.DataAccess.Repositories.VendorModule;
using Application.Service.Services.OfferModule;
using Application.Service.Services.CommonModule;
using Application.Service.Services.EmployeeModule;
using Application.Service.Services.Interfaces.OfferModule;
using Application.Service.Services.Interfaces.CommonModule;
using Application.Service.Services.Interfaces.EmployeeModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Application.Service.Services.Interfaces.VendorModule;
using Application.Service.Services.PreselectionModule;
using Application.Service.Services.VendorModule;
using Application.Service.Services.Interfaces.CandidateModule;
using Application.Service.Services.CandidateModule;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.DataAccess.Repositories.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using Application.Service.Services.SelectionModule;

using Application.DataAccess.Repositories.Interfaces.PreJoiningModule;
using Application.DataAccess.Repositories.PreJoiningModule;
using Application.Service.Services.Interfaces.PreJoiningModule;
using Application.Service.Services.PreJoiningModule;

using Application.DataAccess.Repositories.JoiningModule;
using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Service.Services.JoiningModule;
using Application.Service.Services.Interfaces.JoiningModule;
using Application.Service.Services.Interfaces.ReportModule;
using Application.Service.Services.ReportModule;
using Application.DataAccess.Repositories.Interfaces.ReportModule;
using Application.DataAccess.Repositories.ReportModule;
using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.DataAccess.Repositories.CampusModule;
using Application.Service.Services.Interfaces.CampusModule;
using Application.Service.Services.CampusModule;
using Application.DataAccess.Repositories.Interfaces.DashboardRepository;
using Application.Service.Services.DashboardService;
using Application.Service.Services.Interfaces.DashboardService;
using Application.DataAccess.Repositories.DashboardRepository;
using Application.DataAccess.Repositories.HandHoldingModule;
using Application.DataAccess.Repositories.Interfaces.HandHoldingModule;
using Application.Service.Services.Interfaces.HandHoldingModule;
using Application.Service.Services.HandHoldingModule;

namespace Application.WebApp
{
    public static class ServiceInjection
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<AppConfiguration>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            #region::Common Module
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<IFunctionRepository, FunctionRepository>();
            services.AddScoped<IFunctionService, FunctionService>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IJobDescriptionRepository, JobDescriptionRepository>();
            services.AddScoped<IJobDescriptionService, JobDescriptionService>();
            services.AddScoped<IJobTypeRepository, JobTypeRepository>();
            services.AddScoped<IJobTypeService, JobTypeService>();
            services.AddScoped<IPositionRepository, PositionRepository>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IGenderRepository, GenderRepository>();
            services.AddScoped<IGenderService, GenderService>();
            services.AddScoped<IPrefixRepository, PrefixRepository>();
            services.AddScoped<IPrefixService, PrefixService>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IDomainRepository, DomainRepository>();
            services.AddScoped<IDomainService, DomainService>();
            services.AddScoped<IVerticalRepository, VerticalRepository>();
            services.AddScoped<IVerticalService, VerticalService>();
            services.AddScoped<IQualificationRepository, QualificationRepository>();
            services.AddScoped<IQualificationService, QualificationService>();
            services.AddScoped<ILanguageRepository, LanguageRepository>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<IStreamRepository, StreamRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<IStreamService, StreamService>();
            services.AddScoped<ISalaryRepository, SalaryRepository>();
            services.AddScoped<ISalaryService, SalaryService>();
            services.AddScoped<ICommonRepository, CommonRepository>();
            services.AddScoped<ICommonService, CommonService>();
            services.AddScoped<IIndustryRepository, IndustryRepository>();
            services.AddScoped<IIndustryService, IndustryService>();
            services.AddScoped<ISelectionGuideRepository, SelectionGuideRepository>();
            services.AddScoped<ISalaryTypeNewRepository, SalaryTypeNewRepository>();
            services.AddScoped<ISalaryTypeNewService, SalaryTypeNewService>();
            services.AddScoped<ISelectionGuideService, SelectionGuideService>();
            services.AddScoped<IInterviewRepository, InterviewRepository>();
            services.AddScoped<IInterviewService, InterviewService>();
            services.AddScoped<IEmailTemplateRepository, EmailTemplateRepository>();
            services.AddScoped<IEmailTemplateService, EmailTemplateService>();
            services.AddScoped<IVenueRepository, VenueRepository>();
            services.AddScoped<IVenueService, VenueService>();
            services.AddScoped<IGradeSalaryRepository, GradeSalaryRepository>();
            services.AddScoped<IGradeSalaryService, GradeSalaryService>();
            services.AddScoped<IPaystructureRepository, PaystructureRepository>();
            services.AddScoped<IPaystructureService, PaystructureService>();
            services.AddScoped<IGradeRepository, GradeRepository>();
            services.AddScoped<IGradeWiseDocMapRepository, GradeWiseDocMapRepository>();
            services.AddScoped<IGradeWiseDocMapService, GradeWiseDocMapService>();
            #endregion
            #region::Mode Of joining
            //Mode Of joining
            services.AddScoped<IModeofJoiningRepository, ModeofJoiningRepository>();
            services.AddScoped<IModeofJoiningService, ModeofJoiningService>();
            #endregion
            
            #region::Preselection Module
            services.AddScoped<IRequisitionRepository, RequisitionRepository>();
            services.AddScoped<IRequisitionService, RequisitionService>();
            services.AddScoped<IResignationRepository, ResignationRepository>();
            services.AddScoped<IResignationService, ResignationService>();
            services.AddScoped<ISuccessionPlanRepository, SuccessionPlanRepository>();
            services.AddScoped<ISuccessionPlanService, SuccessionPlanService>();
            services.AddScoped<ITransferRepository, TransferRepository>();
            services.AddScoped<ITransferService, TransferService>();
            #endregion
            #region::Vendor Module
            services.AddScoped<IVendorRepository, VendorRepository>();
            services.AddScoped<IVendorService, VendorService>();
            services.AddScoped<IVendorJobRepository, VendorJobRepository>();
            services.AddScoped<IVendorJobService, VendorJobService>();
            #endregion
            #region::Employee Module
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            #endregion
            #region::Candidate Module
            services.AddScoped<ICandidateRepository, CandidateRepository>();
            services.AddScoped<ICandidateService, CandidateService>();
            services.AddScoped<ICandidateProfileRepository, CandidateProfileRepository>();
            services.AddScoped<ICandidateProfileService, CandidateProfileService>();
            #endregion
            #region::Selection Module
            services.AddScoped<ITestScheduleRepository, TestScheduleRepository>();
            services.AddScoped<ITestScheduleService, TestScheduleService>();
            services.AddScoped<IInterviewScheduleRepository, InterviewScheduleRepository>();
            services.AddScoped<IInterviewScheduleService, InterviewScheduleService>();
            services.AddScoped<IInterviewCalendarActionRepository, InterviewCalendarActionRepository>();
            services.AddScoped<IInterviewCalendarActionService, InterviewCalendarActionService>();
            services.AddScoped<ITravelReimbursementRepository, TravelReimbursementRepository>();
            services.AddScoped<ITravelReimbursementService, TravelReimbursementService>();
            #endregion
            #region::Offer Module
            services.AddScoped<IDocumentCollectionRepository, DocumentCollectionRepository>();
            services.AddScoped<IDocumentCollectionService, DocumentCollectionService>();
            services.AddScoped<ISalaryFitmentRepository, SalaryFitmentRepository>();
            services.AddScoped<ISalaryFitmentService, SalaryFitmentService>();
            services.AddScoped<IManagementApprovalRepository, ManagementApprovalRepository>();
            services.AddScoped<IManagementApprovalService, ManagementApprovalService>();
            services.AddScoped<IOfferLetterRepository, OfferLetterRepository>();
            services.AddScoped<IOfferLetterService, OfferLetterService>();
            #endregion

            #region::Prejioning Module
            services.AddScoped<IMedicalDocumentRepository, MedicalDocumetRepository> ();
            services.AddScoped<IMedicalDocumentService, MedicalDocumentService>();
            services.AddScoped<IPreJoiningDetailsRepository, PreJoiningDetailsRepository>();
            services.AddScoped<IPreJoiningDetailsService, PreJoiningDetailsService>();
            #endregion

            #region::Joining Module
            services.AddScoped<IJoininingDetailsRepository, JoiningDetailsRepository>();
            services.AddScoped<IJoiningDetailsService, JoiningDetailsService>();
            services.AddScoped<ICandidateEmployeeDetailsRepository, CandidateEmployeeDetailsRepository>();
            services.AddScoped<ICandidateEmployeeDetailsService, CandidateEmployeeDetailsService>();
            services.AddScoped<ICandidateReimbursemnetRepoitory, CandidateReimbursemnetRepsoitory>();
            services.AddScoped<ICandidateReimbursemnetService, CandidateReimbursemnetService>();
            services.AddScoped<IAssessmentRepository, AssessmentRepsoitory>();
            services.AddScoped<IAssessmentService, AssessmentService>();
            services.AddScoped<IFeedBackRepository, FeedBackRepsoitory>();
            services.AddScoped<IFeedBackService, FeedBackService>();
            #endregion

            #region::Report Module
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IReportService, ReportService>();

            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IDashboardService, DashboardService>();
            #endregion

            #region::MRFRport Module Module
            services.AddScoped<IMRFReportRepository, MRFReportRepository>();
            services.AddScoped<IMRFReports, MRFReports>();

            #endregion

            #region::Campus Module
            services.AddScoped<ICampusCommonRepository, CampusCommonRepository>();
            services.AddScoped<ICampusCommonService, CampusCommonService>();
            services.AddScoped<ICampusRequisitionRepository, CampusRequisitionRepository>();
            services.AddScoped<ICampusRequisitionService, CampusRequisitionService>();
            services.AddScoped<ICampusCandidateRegistrationRepository, CampusCandidateRegistrationRepository>();
            services.AddScoped<ICampusCandidateRegistrationService, CampusCandidateRegistrationService>();
            #endregion
            #region::Hand Holding
            services.AddScoped<IHandHoldingRepository, HandHoldingRepository>();
            services.AddScoped<IHandHoldingService, HandHoldingService>();
            #endregion
        }
    }
}
