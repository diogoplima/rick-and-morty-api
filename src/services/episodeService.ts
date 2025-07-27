import { api } from '@/lib/api'
import { Episode } from '@/types/episode';

export const episodeService = {
  async getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
    const res = await api.get(`/episode/${ids.join(',')}`)
    return res.data
  }
}
