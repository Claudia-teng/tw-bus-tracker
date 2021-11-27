import { NameType, RouteOperator, Stop } from "./index"

export interface BusStopOfRoute {
  RouteUID: string,
  RouteID: string,
  RouteName: NameType,
  Operators?: Array<RouteOperator>,
  SubRouteUID: string,
  SubRouteID: string,
  SubRouteName: NameType,
  Direction?: number,
  City?: string,
  CityCode?: string,
  Stops: Array<Stop>,
  UpdateTime: string,
  VersionID: number
}

