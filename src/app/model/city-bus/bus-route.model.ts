import { NameType, RouteOperator } from './index';

export interface BusRoute {
  RouteUID: string,
  RouteID: string,
  HasSubRoutes: boolean,
  Operators: Array<RouteOperator>,
  AuthorityID: string,
  ProviderID: string,
  SubRoutes?: Array<BusSubRoute> ,
  BusRouteType: number,
  RouteName: NameType,
  DepartureStopNameZh?: string,
  DepartureStopNameEn?: string,
  DestinationStopNameZh?: string,
  DestinationStopNameEn?: string,
  TicketPriceDescriptionZh?: string,
  TicketPriceDescriptionEn?: string,
  FareBufferZoneDescriptionZh?: string,
  FareBufferZoneDescriptionEn?: string,
  RouteMapImageUrl?: string,
  City?: string,
  CityCode?: string,
  UpdateTime: string,
  VersionID: number
}

interface BusSubRoute {
  SubRouteUID: string,
  SubRouteID: string,
  OperatorIDs: Array<string>,
  SubRouteName: NameType,
  Headsign?: string
  HeadsignEn?: string
  Direction: number,
  FirstBusTime?: string
  LastBusTime?: string
  HolidayFirstBusTime?: string
  HolidayLastBusTime?: string
}




