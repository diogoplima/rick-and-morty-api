import { api } from '@/lib/api'
import { Location } from '@/types/location';

export const locationService = {
  async getLocation(id: number): Promise<Location> {
    const res = await api.get(`/location/${id}`)
    return res.data
  },
}
