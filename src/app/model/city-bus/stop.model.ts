import { NameType, PointType } from "./index";

export interface Stop {
  StopUID: string,
  StopID: string,
  StopName: NameType,
  StopBoarding?: number,
  StopSequence: number,
  StopPosition: PointType,
  StationID?: string,
  StationGroupID: string,
  LocationCityCode: string,
  Status?: string,
  EstimatedTime?: number
  PlateNumb?: string
}