import { http } from '@/api/http'
import { type TypeUserRideItem } from '@/stores/userRideStore'

// import { api_studyRide } from '@/api/user/apiUserRide'
export const api_studyRide = async (rideId: string) => {
  return await http.post<null>('/player/userRide/studyRide', { rideId })
}

// import { api_getUserRide } from '@/api/user/apiUserRide'
export const api_getUserRide = async () => {
  return await http.get<TypeUserRideItem[]>('/player/userRide/getUserRide')
}
