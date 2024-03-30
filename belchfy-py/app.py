from flask import Flask
from flask import Response
import json
from providers import Youtube_Provider

YOUTUBE_URL = 'https://www.youtube.com/watch?v='

app = Flask(__name__)


@app.route('/')
def ping():  # put application's code here
    return 'pong'


@app.route('/youtube/streams/<video_id>')
def streams(video_id):
    try:
        video_url = YOUTUBE_URL + video_id
        audio_streams = Youtube_Provider.get_audio_streams(video_url)
        return audio_streams
    except Exception as e:
        if 'is unavailable' in str(e):
           return Response(
               json.dumps({
                   "title": "Error retrieving stream",
                   "details": f"The video with id {video_id} is not available anymore",
                   "status": 404,
                   "instance": f"/youtube/streams/{video_id}"
               }),
               status=404,
               mimetype='application/json'
           )

@app.route('/youtube/search/<query>')
def search(query):
    return Youtube_Provider.search_youtube(query)


if __name__ == '__main__':
    app.run()
