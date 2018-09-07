
import Main from '../game/main.js';
export default class HomePage extends ui.pages.HomePageUI {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.initEvent();
		let main = new Main(this);
		main.init();
		main.startGame();
		// (new Main(this)).startGame();
	}

	initEvent() {
		this.start_game.on(Laya.Event.CLICK, this, this.startClassic);
		// this.friend_game.on(Laya.Event.CLICK, this, this.startFriendGame);
		// this.rank_game.on(Laya.Event.CLICK, this, this.startRankGame);
	}

	startClassic() {
		// Laya.stage.addChild(new ClassicGamePage());
		console.log('classic game');
	}

	startFriendGame() {
		// Laya.stage.addChild(new FriendGamePage());
		console.log('friend game');
	}

	startRankGame() {
		// Laya.stage.addChild(new RankGamePage());
		console.log('rank game');
	}
}
