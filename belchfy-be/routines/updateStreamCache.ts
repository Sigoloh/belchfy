import { database } from "../databases/sqlite"
import { getAudioStreamsByVideoId } from "../providers/PyProvider"
import { StreamCacheRepository } from "../repositories/StreamCacheRepository"

const streamCacheRepository = new StreamCacheRepository(database)

async function updateStreamCache(): Promise<void>{
    try {
        console.log('[UPDATE STREAM CACHE] Starting the routine to update stream cache')
        const outdatedStreams = await streamCacheRepository.getAllOutdatedStreamCache()

        if(!outdatedStreams){
            console.log('[UPDATE STREAM CACHE] No stream to update found')
            return
        }

        console.log(`[UPDATE STREAM CACHE] Found ${outdatedStreams.length} to update`)

        const outdatedVideoIds = outdatedStreams.map(element => {
            return {
                id: element.id || -1,
                videoId: element.videoId
            }
        })
        console.log(outdatedStreams)
        console.log(`[UPDATE STREAM CACHE] Starting to update streams`)
        for(const outdatedVideoId of outdatedVideoIds){
            console.log(`[UPDATE STREAM CACHE] Updating ${outdatedVideoId.videoId}`)
            const videoStream = await getAudioStreamsByVideoId(outdatedVideoId.videoId)
            console.log(`[UPDATE STREAM CACHE] Deleting old cache for ${outdatedVideoId.videoId}`)
            await streamCacheRepository.deleteCacheById(outdatedVideoId.id)
            await streamCacheRepository.createStreamCache(videoStream, outdatedVideoId.videoId, new Date(videoStream[0].expiresAt))
            console.log(`[UPDATE STREAM CACHE] Stream ${outdatedVideoId.videoId} updated`)
        }


        console.log(`[UPDATE STREAM CACHE] Updated all streams cache`)
    } catch (error) {
        console.log(`[UPDATE STREAM CACHE] Error updating streams`)
        // console.log(error)
        throw error
    }
}

updateStreamCache()