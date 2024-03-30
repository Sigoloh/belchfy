from pytube import YouTube
from pytube import Search


def get_audio_streams(url: str) -> list:
    yt = YouTube(url)
    audio_streams = yt.streams.filter(only_audio=True)
    stream_info = yt.streaming_data
    parsed_streams = []
    for audio_stream in audio_streams:
        new_stream = {
            'expires_in_seconds': stream_info['expiresInSeconds'],
            'url': audio_stream.url,
            'title': audio_stream.title,
            'abr': audio_stream.abr,
            'mime_type': audio_stream.mime_type,
            'codec': audio_stream.parse_codecs()[1],
            'file_size': audio_stream.filesize_kb
        }

        parsed_streams.append(new_stream)
    return parsed_streams


def search_youtube(query: str) -> list:
    search = Search(query)

    results = search.results
    parsed_results = []
    for result in results:

        result.check_availability()

        try:
            new_result = {
                "title": result.title,
                "author": result.author,
                "channel_id": result.channel_id,
                "length": result.length,
                "thumbnail": result.thumbnail_url,
                "views": result.views,
                "video_id": result.video_id,
            }

            print(new_result)
            parsed_results.append(new_result)
        except Exception as e:
            print(f'Not inserted {result.video_id} because it is not available')
            print(e)


    return parsed_results
