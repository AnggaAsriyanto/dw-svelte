import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params, cookies}) => {
     const imageCookie = cookies.get(`image-${params.code}`)
     return {
          test: imageCookie ?? []
     }
}