using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class VenueService : IVenueService
    {
        private readonly IVenueRepository venueRepository;

        public VenueService(IVenueRepository venueRepository)
        {
            this.venueRepository = venueRepository;
        }

        public async Task<List<Venue>> GetAllVenue(SearchVenue search)
        {
            return await this.venueRepository.GetAllVenue(search);
        }

        public async Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam search)
        {
            return await this.venueRepository.GetAllInductionVenue(search);
        }
        public async Task<List<InductionVenueWithExternal>> GetAllInductionVenueExternal(AllInductionVenueParam search)
        {
            return await this.venueRepository.GetAllInductionVenueExternal(search);
        }
        public async Task<ReturnMessage> InductionVenueInsertUpdate(InductionVenueInserUpdateParam Param)
        {
            return await this.venueRepository.InductionVenueInsertUpdate(Param);
        }
        public async Task<List<AllReportingVenue>> GetAllReportingVenue(SearchReportingVenue search)
        {
            return await this.venueRepository.GetAllReportingVenue(search);
        }
        public async Task<ReturnMessage> ReportingVenueInsertUpdate(ReportingVenueInsertUpdate Param)
        {
            return await this.venueRepository.ReportingVenueInsertUpdate(Param);
        }

        public async Task<ReturnMessage> ExternalInductionVenueInsertUpdate(ExternalInductionVenueInserUpdateParam Param)
        {
            return await this.venueRepository.ExternalInductionVenueInsertUpdate(Param);
        }
        public async Task<List<AllExternalInductionVenue>> GetAllExternalInductionVenue(SearchExternalInductionVenue search)
        {
            return await this.venueRepository.GetAllExternalInductionVenue(search);
        }
        //arg

        public async Task<List<AllLocationWiseTrainingInCharge>> GetAllLocationWiseTrainingInCharge(SearchLocationWiseTrainingInCharge search)
        {
            return await this.venueRepository.GetAllLocationWiseTrainingInCharge(search);
        }
        public async Task<ReturnMessage> LocationWiseTrainingInChargeInsertUpdate(LocationWiseTrainingInChargeInsertUpdate Param)
        {
            return await this.venueRepository.LocationWiseTrainingInChargeInsertUpdate(Param);
        }
        public async Task<List<AllInterviewVenue>> GetAllInterviewVenue(SearchInterviewVenue search)
        {
            return await this.venueRepository.GetAllInterviewVenue(search);
        }
        public async Task<List<AllTestVenue>> GetAllTestVenue(SearchTestVenue search)
        {
            return await this.venueRepository.GetAllTestVenue(search);
        }
        public async Task<ReturnMessage> InterviewVenueInsertUpdate(InterviewVenueInsertUpdate Param)
        {
            return await this.venueRepository.InterviewVenueInsertUpdate(Param);
        }
        public async Task<ReturnMessage> TestVenueInsertUpdate(TestVenueInsertUpdate Param)
        {
            return await this.venueRepository.TestVenueInsertUpdate(Param);
        }
        public async Task<List<FamilyRelationData>> GetFamilyRelation(SearchFamilyRelation Param)
        {
            return await this.venueRepository.GetFamilyRelation(Param);
        }
    }
}
