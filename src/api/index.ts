import { TDX_API_BASE } from "@/constants";

/**
 * 確認是否請求超過上限
 */
const isReqLimit = (responseStatus: number): boolean => {
  if (responseStatus === 429) {
    // status 429:請求api次數過多
    return true;
  }
  return false;
};
export const getLiveBoardData = (stationId: string) => {
  return fetch(
    `${TDX_API_BASE}/v2/Rail/TRA/LiveBoard/Station/${stationId}?$top=1000&$format=JSON`
  )
    .then((res) => {
      if (isReqLimit(res.status)) {
        return null;
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDailyTrainTimetable = (
  date: string,
  from: string,
  to: string
) => {
  return fetch(
    `${TDX_API_BASE}/v3/Rail/TRA/DailyTrainTimetable/OD/${from}/to/${to}/${date}?$top=1000&$format=JSON`
  )
    .then((res) => {
      if (isReqLimit(res.status)) {
        return null;
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
