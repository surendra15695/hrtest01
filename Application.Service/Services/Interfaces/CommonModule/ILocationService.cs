using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface ILocationService
    {
        Task<List<Location>> GetAllLocation(SearchLocation search);
        Task<List<Location>> GetAllVerticalLocation(SearchVerticalLocation search);
        Task<List<FunctionwiseLocation>> GetAllFunctionWiseLocation(SearchFunctionLocation search);
        Task<List<LocationWiseFunction>> GetAllLocationWiseFunction(SearchLocationWiseFunction search);
        Task<ReturnMessage> LocationWiseFunctionSave(LocationWiseFunctionSave formData);
        Task<List<UnmappedLocations>> GetAllUnmappedLocations(SearchMappedLocation search);
        Task<ReturnMessage> LocationInsertUpdate(Location formData);
    }
}
