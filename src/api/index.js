import fetcher from '@/api/fetcher';

export default {
  async getImages(page = 1, limit = 20) {
    return await fetcher.get('/images', {params: {page, limit}});
  }
}
