using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IVenueRepository
    {
        Task<List<Venue>> GetAllVenue(SearchVenue search);
        Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam search);
        Task<List<InductionVenueWithExternal>> GetAllInductionVenueExternal(AllInductionVenueParam search);
        Task<ReturnMessage> InductionVenueInsertUpdate(InductionVenueInserUpdateParam Param);
        Task<List<AllReportingVenue>> GetAllReportingVenue(SearchReportingVenue search);
        Task<ReturnMessage> ReportingVenueInsertUpdate(ReportingVenueInsertUpdate Param);
        Task<List<AllExternalInductionVenue>> GetAllExternalInductionVenue(SearchExternalInductionVenue search);
        Task<ReturnMessage> ExternalInductionVenueInsertUpdate(ExternalInductionVenueInserUpdateParam Param);
        Task<List<AllLocationWiseTrainingInCharge>> GetAllLocationWiseTrainingInCharge(SearchLocationWiseTrainingInCharge search);
        Task<ReturnMessage> LocationWiseTrainingInChargeInsertUpdate(LocationWiseTrainingInChargeInsertUpdate Param);
        Task<List<AllInterviewVenue>> GetAllInterviewVenue(SearchInterviewVenue search);
        Task<List<AllTestVenue>> GetAllTestVenue(SearchTestVenue search);
        Task<ReturnMessage> InterviewVenueInsertUpdate(InterviewVenueInsertUpdate Param);
        Task<ReturnMessage> TestVenueInsertUpdate(TestVenueInsertUpdate Param);
        Task<List<FamilyRelationData>> GetFamilyRelation(SearchFamilyRelation Param);

    }
}
