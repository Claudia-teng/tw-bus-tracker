import { NameType, PointType, RouteDetail } from "../index"

export interface BusStop {
  StopUID: string,
  StopID: string,
  AuthorityID: string,
  StopName: NameType,
  StopPosition: PointType,
  StopAddress?: string,
  Bearing?: string,
  StationID ?: string,
  StationGroupID: string,
  StopDescription?: string,
  City?: string,
  CityCode?: string,
  LocationCityCode?: string,
  UpdateTime: number,
  VersionID: number
  // new
  AllRoute?: string;
  Route?: Array<RouteDetail>
}

