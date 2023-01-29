export type TStationLiveBoardData = {
  StationID: string;
  StationName: {
    Zh_tw: string;
    En: string;
  };
  TrainNo: string;
  Direction: number;
  TrainTypeID: string;
  TrainTypeCode: string;
  TrainTypeName: {
    Zh_tw: string;
    En: string;
  };
  TripLine: number;
  EndingStationID: string;
  EndingStationName: {
    Zh_tw: string;
    En: string;
  };
  ScheduledArrivalTime: string;
  ScheduledDepartureTime: string;
  DelayTime: number;
  SrcUpdateTime: string;
  UpdateTime: string;
};

export type TDateQueryTableData = {
  TrainInfo: {
    TrainNo: string;
    RouteID: string;
    Direction: number;
    TrainTypeID: string;
    TrainTypeCode: string;
    TrainTypeName: {
      Zh_tw: string;
      En: string;
    };
    TripHeadSign: string;
    StartingStationID: string;
    StartingStationName: {
      Zh_tw: string;
      En: string;
    };
    EndingStationID: string;
    EndingStationName: {
      Zh_tw: string;
      En: string;
    };
    OverNightStationID: string;
    TripLine: number;
    WheelChairFlag: number;
    PackageServiceFlag: number;
    DiningFlag: number;
    DiningFlagSections: [
      {
        StartSection: {
          StartStationID: string;
          EndStationID: string;
        };
        EndSection: {
          StartStationID: string;
          EndStationID: string;
        };
      }
    ];
    BreastFeedFlag: number;
    BikeFlag: number;
    CarFlag: number;
    DailyFlag: number;
    ExtraTrainFlag: number;
    SuspendedFlag: number;
    Note: string;
  };
  StopTimes: Array<{
    StopSequence: number;
    StationID: string;
    StationName: {
      Zh_tw: string;
      En: string;
    };
    ArrivalTime: string;
    DepartureTime: string;
    SuspendedFlag: number;
  }>;
};

export type TDateQueryData = {
  date: string | null;
  fromStationName: string | null;
  toStationName: string | null;
  tableData: Array<TDateQueryTableData> | null;
};
