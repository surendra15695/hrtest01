export interface IVenue {
    venueId: number;
    venueName: string;
    venueAddress: string;
    stateId: number;
    stateName: string;
    isActive: boolean;
}

export interface ISearchVenue {
    venueId: number;
    isActive: boolean;
}

export interface IInductionVenue {
    inductionVenueId: number;
    inductionVenueName: string;
    locationId: number;
    isActive: boolean;
}
export interface IInductionVenueWithExternal {
    inductionVenueId: number;
    inductionVenueName: string;
    locationId: number;
    isActive: boolean;
    isExternal:boolean;
}

export interface ISearchInductionVenue {
    InductionVenueId: number;
  isActive: boolean;
}
export interface IInterviewVenue {
  venueId: number;
  venueName: string;
  verticalIds: string;
  verticalNames: string;
  isActive: boolean;
}
export interface ISearchInterviewVenue {
  venueId: number;
  verticalId: number;
  isActive: boolean;
}
