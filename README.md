# Belchfy [pt-Br](https://github.com/Sigoloh/belchfy/blob/main/pt-README.md)
## Because YouTube lost control over its ads

# Kick-start
As this project is in a very (VERY) early stage, I choose not to provide a built image yet. To see Belchfy with your very own eyes, build the Docker image and change the `compose.yml` file as needed to make it work for you.

# Overview
Belchfy is a thin layer around [Pytube](https://pytube.io/) acting as a client to consume YouTube audio streams without the annoying ads. It presents this in a frontend where you can create queues and listen to YouTube playlists without having to watch 20-second ads to consume 2-minute songs.

# How does it work?
The `pydub` [API](./belchfy-py) receives requests from the main API and collects stream data from YouTube pages. The main API then stores its content in SQLite to cache information that is not volatile, such as playlist ID, video ID, video name, and much more. Also, since stream URLs from YouTube have a validity of around 5 hours, the API does its best to prevent the `pydub` API from searching for a stream every time.

# What I want to add to Belchfy?
### Well, I have a dream
I want to make Belchfy as close to YouTube Music as possible. Here's my roadmap to achieve this:
- [ ] Routines to update stream URLs every time the cached one expires
- [ ] Recommendation algorithm using web scraping so YouTube can't cancel my API keys
- [ ] A better front-end
- [ ] A way to get the user's YouTube feed and present it on the front-end without much latency

Probably, if I have the energy to make this project happen, more ideas will come to make Belchfy an enjoyable tool for those who can't (or simply don't want to) pay for YouTube Music Premium.

# Help wanted!
I'm a junior software developer, and as you'll see if you read the code, my front-end skills are very limited. So if you have the time and will to build this with me, feel free to contact me via my email - augustoasigolo@gmail.com - or contribute by forking and merging here on GitHub.

# About licensing
Copyright (C) 2024 - Augusto Sigolo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

If you want to contact me, use my email provided above or any other means you find!
