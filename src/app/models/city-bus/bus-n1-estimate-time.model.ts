import { NameType } from './index';

export interface BusN1EstimateTime {
  PlateNumb?: string,
  StopUID?: string,
  StopID?: string,
  StopName?: string,
  RouteUID ?: string,
  RouteID?: string,
  RouteName?: NameType,
  SubRouteUID ?: string,
  SubRouteID?: string,
  SubRouteName?: NameType,
  Direction: number,
  EstimateTime?: number,
  StopCountDown?: number,
  CurrentStop?: string,
  DestinationStop?: string,
  StopSequence?: string,
  StopStatus?: string,
  MessageType?: string,
  NextBusTime?: string,
  IsLastBus?: boolean,
  Estimates?: Array<Estimate>,
  DataTime?: string,
  TransTime?: string,
  SrcRecTime?: string,
  SrcTransTime?: string,
  SrcUpdateTime?: string,
  UpdateTime: string,
}

interface Estimate {
  PlateNumb?: string,
  EstimateTime?: number,
  IsLastBus?: boolean,
  VehicleStopStatus?: number
}