import './weapp-adapter.js';
// import './laya.js';
import './laya.core.min.js';
import './laya.ui.min.js';
import './laya.wxmini.min.js';
import './layaUI.max.all.js';

// import './res/atlas/image/rank.png';
// import './res/atlas/image/rank.atlas';

import Rank from './rank.js';
Laya.MiniAdpter.init(true, true);

class Main {
  constructor() {

    this.init();
    this.onMessage();
  }
  init() {
    let { width, height } = Laya.Browser;
    let stageW = 750;
    let stageH = height / width * stageW;
    Laya.init(stageW, stageH);
    Laya.stage.bgColor = "#ffffff";
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    
    

    this.rank = new Rank();
    Laya.stage.addChild(this.rank);
    // this.onLoaded();
  }

  onMessage() {
    wx.onMessage((message) => {

      if (message['type'] == "resizeShared") {

        var tempMatrix = message.data.matrix;

        let sharedCanvas = wx.getSharedCanvas()
        let context = sharedCanvas.getContext('2d');
        console.log('open canvas width', sharedCanvas.width);

        var matrix = new Laya.Matrix();
        matrix.a = tempMatrix.a;
        matrix.b = tempMatrix.b;
        matrix.c = tempMatrix.c;
        matrix.d = tempMatrix.d;
        Laya.stage._canvasTransform = matrix;//

      } else if (message['type'] === "getFriendRank") {
        // Laya.stage.destroyChildren();
        // Laya.stage.addChild(new Rank());
        this.rank.getFriendRank();

      } else if (message['type'] === "uploadScore") {
        this.uploadScore(message.data);
      } 

    });
  }

  uploadScore(data) {
    // 获取自己的排行榜信息
    let self = this;
    wx.getUserCloudStorage({
      keyList: ['score'],
      success: (res) => {
        let myRankData = [];
        myRankData = res;
        // console.log('upload rank Data',  myRankData)

        // 如果不存在记录，更新排行榜信息
        // 如果本次分数大于历史分数，更新排行榜信息
        if (myRankData.KVDataList.length == 0 || +data.score > +myRankData.KVDataList[0].value) {

          let kvData = [{
            key: "score",
            value: data.score
          }];
          wx.setUserCloudStorage({
            KVDataList: kvData,
            success: function () {
              console.log("成功发送")
              self.rank.getFriendRank();
            },
            fail: function () {
              console.log("发送失败")
            }
          })
        }

      }
    });
  }
}

new Main();
