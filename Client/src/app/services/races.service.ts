import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { OnlyUserId, ShareRequest } from "../models/common/common.model"
import { Race, RaceDeleteRequest, RaceDetail, RaceUpdateRequest } from "../models/races.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class RaceService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Race')
  }

  getAllRacesByUserId(userId: string): Promise<Race[]> {
    return this.get<Race[]>("GetAllRacesByUserId", { userId });
  }

  getRaceDetail(raceId: number): Promise<RaceDetail> {
    return this.get<RaceDetail>("GetRaceDetail", { raceId });
  }

  updateRace(request: RaceUpdateRequest): Promise<boolean> {
    return this.post<boolean>("UpdateRace", request);
  }

  insertRace(request: OnlyUserId): Promise<Race>{
    return this.post<Race>("InsertRace", request);
  }

  shareRace(request: ShareRequest): Promise<boolean>{
    return this.post<boolean>("ShareRace",request,true);
  }

  deleteRace(RaceId: number, UserId: string): Promise<boolean>{
    return this.delete<boolean>("DeleteRace",{RaceId:RaceId, UserId: UserId},true);
  }

}