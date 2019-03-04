import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [
				{
					title: "Mario Castle",
					id: "mario",
					author: "Bowser",
					url:
						"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
				},
				{
					title: "Zelda",
					id: "zelda",
					author: "Ganondorf",
					url:
						"https://assets.breatheco.de/apis/sound/files/videogame/fx_zelda_recorder.wav"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Magneto",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			]
		};
		this.player = null;
		this.pressPlay = null;
		this.pressPause = null;
		this.currentIndex = null;
	}

	playSong = index => {
		if (index === undefined && this.player.src === "") {
			this.player.src = this.state.songs[0].url;
			this.currentIndex = 0;
		} else if (index !== undefined) {
			this.player.src = this.state.songs[index].url;
			this.currentIndex = index;
		}
		this.player.play();
		this.pressPlay.style.display = "none";
		this.pressPause.style.display = "block";
	};

	pauseSong = () => {
		this.player.pause();
		this.pressPlay.style.display = "block";
		this.pressPause.style.display = "none";
	};

	playNextSong = () => {
		if (this.currentIndex === this.state.songs.length - 1) {
			this.player.src = this.state.songs[0].url;
			this.player.play();
			this.currentIndex = 0;
		} else {
			this.player.src = this.state.songs[this.currentIndex + 1].url;
			this.player.play();
			this.currentIndex++;
		}
	};

	playPrevSong = () => {
		if (this.currentIndex === 0) {
			this.player.src = this.state.songs[this.state.songs.length - 1].url;
			this.player.play();
			this.currentIndex = this.state.songs.length - 1;
		} else {
			this.player.src = this.state.songs[this.currentIndex - 1].url;
			this.player.play();
			this.currentIndex--;
		}
	};

	render() {
		return (
			<div className="container">
				<div className="songList">
					{this.state.songs.map((item, index) => {
						return (
							<div
								className="song"
								key={index}
								onClick={() => this.playSong(index)}>
								<div className="songNumber">{index + 1}</div>
								<div className="songTitle">
									<span className="title">
										{item.title} -
									</span>
								</div>
								<div className="songArtist">
									<span className="artist">
										{item.author}
									</span>
								</div>
							</div>
						);
					})}
					<audio ref={player => (this.player = player)} />
				</div>
				<div className="footBar">
					<div className="buttons">
						<i
							className="fas fa-step-backward"
							onClick={this.playPrevSong}
						/>
						<i
							className="fas fa-play"
							ref={x => (this.pressPlay = x)}
							onClick={() => this.playSong()}
						/>
						<i
							className="fas fa-pause"
							ref={x => (this.pressPause = x)}
							onClick={this.pauseSong}
						/>
						<i
							className="fas fa-step-forward"
							onClick={this.playNextSong}
						/>
					</div>
				</div>
			</div>
		);
	}
}
