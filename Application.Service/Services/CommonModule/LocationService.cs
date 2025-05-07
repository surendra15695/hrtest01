using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            this.locationRepository = locationRepository;
        }

        public async Task<List<Location>> GetAllLocation(SearchLocation search)
        {
            return await this.locationRepository.GetAllLocation(search);
        }

        public async Task<List<Location>> GetAllVerticalLocation(SearchVerticalLocation search)
        {
            return await this.locationRepository.GetAllVerticalLocation(search);
        }
        
            public async Task<List<FunctionwiseLocation>> GetAllFunctionWiseLocation(SearchFunctionLocation search)
        {
            return await this.locationRepository.GetAllFunctionWiseLocation(search);
        }
        public async Task<List<UnmappedLocations>> GetAllUnmappedLocations(SearchMappedLocation search)
        {
            return await this.locationRepository.GetAllUnmappedLocations(search);
        }

        public async Task<List<LocationWiseFunction>> GetAllLocationWiseFunction(SearchLocationWiseFunction search)
        {
            return await this.locationRepository.GetAllLocationWiseFunction(search);
        }

        public async Task<ReturnMessage> LocationWiseFunctionSave(LocationWiseFunctionSave formData)
        {
            return await this.locationRepository.LocationWiseFunctionSave(formData);
        }

        public async Task<ReturnMessage> LocationInsertUpdate(Location formData)
        {
            return await this.locationRepository.LocationInsertUpdate(formData);
        }
    }
}
