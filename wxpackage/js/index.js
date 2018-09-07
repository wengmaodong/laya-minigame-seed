
Laya.MiniAdpter.init(true, false);

import HomePage from './view/home_page';

class GameMain {
  constructor() {

    this.initStage();
    this.loadResource();
  }

  initStage() {
    let { width, height, userAgent } = Laya.Browser;
    // console.log(userAgent);
    let stageW = 750;
    let stageH = height / width * stageW;
    Laya.init(stageW, stageH, Laya.WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
    Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

    Laya.stage.bgColor = "#ffffff";
  }

  loadResource() {
    if (this.loadded) return;
    let uiResArry = [
      
    ];
    Laya.loader.load(uiResArry, Laya.Handler.create(this, this.onLoaded));
  }

  onLoaded() {
    this.loadded = true;
    Laya.stage.addChild(new HomePage());
  }
}

new GameMain();