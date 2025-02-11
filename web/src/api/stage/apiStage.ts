import { http } from '@/api/http'
import { type TypeUserBagItem } from '@/stores/userBagStore'
// import { api_getStageConfig,type StageConfigItem,type StageConfig} from '@/api/stage/apiStage'
export interface StageConfigItem {
  stageId: string
  stageName: string
  chest: string
  chestCount: number
  chestName: string
  npcId: string
  npcRace: string
  npcPower: number
}
export interface StageConfig {
  version: number
  races: string[]
  list: StageConfigItem[]
}
export const api_getStageConfig = async () => {
  return await http.get<StageConfig>('/player/stage/getStageConfig')
}

// import { api_stageBattle} from '@/api/stage/apiStage'
// import type { createUserPlayerDto } from '@/api/user/apiUserPlayer'
export interface stageBattleDto {
  res: boolean
  bagItem: TypeUserBagItem
  battleLog: string[]
  award: string
}
export const api_stageBattle = async (stageId: string) => {
  return await http.post<stageBattleDto>('/player/stage/stageBattle', { stageId })
}

// import { type startStageDto,api_startStage} from '@/api/stage/apiStage'
export interface startStageDto {
  res: boolean
  battleLog: string[]
}
export const api_startStage = async (stageId: string) => {
  return await http.get<stageBattleDto>('/player/stage/startStage?stageId=' + stageId)
}

// import { type endStageDto,api_endStage} from '@/api/stage/apiStage'
export interface endStageDto {
  chestCount: number
  chestItemName: string
}
export const api_endStage = async (stageId: string) => {
  return await http.get<endStageDto>('/player/stage/endStage?stageId=' + stageId)
}
